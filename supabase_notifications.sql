-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('inquiry', 'review', 'system', 'milestone', 'welcome')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT DEFAULT '',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(user_id, is_read);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can view their notifications'
  ) THEN
    CREATE POLICY "Users can view their notifications"
    ON notifications FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can update their notifications'
  ) THEN
    CREATE POLICY "Users can update their notifications"
    ON notifications FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Seed welcome notifications for existing users (idempotent)
INSERT INTO notifications (user_id, type, title, message, link)
SELECT
  p.id,
  'welcome',
  'Welcome to ORMA! 🎉',
  'Complete your profile to get started',
  '/profile'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1
  FROM notifications n
  WHERE n.user_id = p.id AND n.type = 'welcome'
);

INSERT INTO notifications (user_id, type, title, message, link)
SELECT p.id, 'system', 'Your listing is trending! 🔥', '"MacBook Pro M3" reached 500 views', '/dashboard'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM notifications n
  WHERE n.user_id = p.id AND n.type = 'system' AND n.title = 'Your listing is trending! 🔥'
);

INSERT INTO notifications (user_id, type, title, message, link)
SELECT p.id, 'review', 'New review received ⭐⭐⭐⭐⭐', 'Priya left a 5-star review', '/dashboard'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM notifications n
  WHERE n.user_id = p.id AND n.type = 'review' AND n.title = 'New review received ⭐⭐⭐⭐⭐'
);

-- Trigger: Review added -> notify listing owner
CREATE OR REPLACE FUNCTION notify_owner_on_review()
RETURNS TRIGGER AS $$
DECLARE
  listing_title TEXT;
BEGIN
  SELECT title INTO listing_title
  FROM listings
  WHERE id = NEW.listing_id;

  INSERT INTO notifications (user_id, type, title, message, link)
  VALUES (
    NEW.owner_id,
    'review',
    'New review received ⭐⭐⭐⭐⭐',
    COALESCE('You received a ' || NEW.rating::TEXT || '-star review on "' || listing_title || '"', 'You received a new review'),
    '/listing/' || NEW.listing_id::TEXT
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_owner_on_review ON reviews;
CREATE TRIGGER trg_notify_owner_on_review
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION notify_owner_on_review();

-- Trigger: Listing view milestones -> notify owner
CREATE OR REPLACE FUNCTION notify_owner_on_view_milestone()
RETURNS TRIGGER AS $$
DECLARE
  milestone INTEGER;
BEGIN
  IF NEW.views_count IN (100, 500, 1000) THEN
    milestone := NEW.views_count;

    INSERT INTO notifications (user_id, type, title, message, link)
    VALUES (
      NEW.owner_id,
      'milestone',
      'Your listing is trending! 🔥',
      '"' || NEW.title || '" reached ' || milestone::TEXT || ' views',
      '/listing/' || NEW.id::TEXT
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_owner_on_view_milestone ON listings;
CREATE TRIGGER trg_notify_owner_on_view_milestone
AFTER UPDATE OF views_count ON listings
FOR EACH ROW
WHEN (OLD.views_count IS DISTINCT FROM NEW.views_count)
EXECUTE FUNCTION notify_owner_on_view_milestone();

-- Trigger: New user profile -> welcome notification
CREATE OR REPLACE FUNCTION notify_user_on_profile_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, link)
  VALUES (
    NEW.id,
    'welcome',
    'Welcome to ORMA! 🎉',
    'Complete your profile to get started',
    '/profile'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_user_on_profile_created ON profiles;
CREATE TRIGGER trg_notify_user_on_profile_created
AFTER INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION notify_user_on_profile_created();
