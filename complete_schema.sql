-- ================================================================
-- ORMA â€” Supabase Schema
-- Run this in Supabase SQL Editor BEFORE starting the app
-- ================================================================

-- ----------------------------------------------------------------
-- 1. PROFILES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name               TEXT,
  email                   TEXT,
  avatar_url              TEXT,
  phone                   TEXT,
  city                    TEXT,
  state                   TEXT,
  bio                     TEXT NOT NULL DEFAULT '',
  is_verified             BOOLEAN NOT NULL DEFAULT FALSE,
  is_owner                BOOLEAN NOT NULL DEFAULT FALSE,
  total_listings          INT NOT NULL DEFAULT 0,
  total_reviews_received  INT NOT NULL DEFAULT 0,
  average_rating          NUMERIC(3,2) NOT NULL DEFAULT 0,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id             SERIAL PRIMARY KEY,
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  icon_name      TEXT NOT NULL DEFAULT 'Package',
  description    TEXT NOT NULL DEFAULT '',
  display_order  INT NOT NULL DEFAULT 0,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- 3. LISTINGS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.listings (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id              UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id           INT NOT NULL REFERENCES public.categories(id),

  -- Basic Info
  title                 TEXT NOT NULL,
  description           TEXT NOT NULL DEFAULT '',
  condition             TEXT NOT NULL CHECK (condition IN ('excellent', 'good', 'fair')) DEFAULT 'good',
  brand                 TEXT NOT NULL DEFAULT '',
  model                 TEXT NOT NULL DEFAULT '',

  -- Images
  images                TEXT[] NOT NULL DEFAULT '{}',

  -- Pricing
  price_per_hour        NUMERIC(10,2),
  price_per_day         NUMERIC(10,2) NOT NULL DEFAULT 0,
  price_per_week        NUMERIC(10,2),
  price_per_month       NUMERIC(10,2),
  security_deposit      NUMERIC(10,2) NOT NULL DEFAULT 0,

  -- Location
  city                  TEXT NOT NULL DEFAULT '',
  area                  TEXT NOT NULL DEFAULT '',
  state                 TEXT NOT NULL DEFAULT '',
  pincode               TEXT NOT NULL DEFAULT '',
  full_address          TEXT NOT NULL DEFAULT '',
  latitude              NUMERIC(9,6),
  longitude             NUMERIC(9,6),

  -- Contact
  contact_phone         TEXT NOT NULL DEFAULT '',
  contact_whatsapp      TEXT NOT NULL DEFAULT '',
  contact_email         TEXT NOT NULL DEFAULT '',
  preferred_contact     TEXT NOT NULL CHECK (preferred_contact IN ('phone', 'whatsapp', 'email', 'all')) DEFAULT 'phone',

  -- Terms
  terms_and_conditions  TEXT NOT NULL DEFAULT '',
  id_proof_required     BOOLEAN NOT NULL DEFAULT TRUE,
  delivery_available    BOOLEAN NOT NULL DEFAULT FALSE,
  minimum_rental_period TEXT NOT NULL DEFAULT '1 day',
  maximum_rental_period TEXT NOT NULL DEFAULT '',

  -- Status
  status                TEXT NOT NULL CHECK (status IN ('active', 'rented', 'inactive', 'pending', 'rejected')) DEFAULT 'active',
  is_available          BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured           BOOLEAN NOT NULL DEFAULT FALSE,
  views_count           INT NOT NULL DEFAULT 0,
  inquiries_count       INT NOT NULL DEFAULT 0,

  -- Ratings (denormalized)
  average_rating        NUMERIC(3,2) NOT NULL DEFAULT 0,
  total_reviews         INT NOT NULL DEFAULT 0,

  -- Timestamps
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  available_from        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  available_until       TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_listings_owner_id ON public.listings(owner_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON public.listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_city ON public.listings(city);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_price_per_day ON public.listings(price_per_day);

-- Full text search
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS search_vector TSVECTOR 
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(brand, '') || ' ' || coalesce(city, ''))
  ) STORED;
CREATE INDEX IF NOT EXISTS idx_listings_search ON public.listings USING GIN(search_vector);

-- ----------------------------------------------------------------
-- 4. REVIEWS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id          UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  reviewer_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id            UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating              INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title               TEXT NOT NULL DEFAULT '',
  comment             TEXT NOT NULL DEFAULT '',
  is_verified_rental  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(listing_id, reviewer_id)
);

-- ----------------------------------------------------------------
-- 5. WISHLISTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id  UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- ----------------------------------------------------------------
-- 6. INQUIRIES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id  UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message     TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL CHECK (status IN ('sent', 'read', 'replied')) DEFAULT 'sent',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================================
-- RLS POLICIES
-- ================================================================
ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories  ENABLE ROW LEVEL SECURITY;

-- Categories: public read
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT USING (true);

-- Profiles: public read, owner write
CREATE POLICY "profiles_public_read"   ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_owner_update"  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_owner_insert"  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Listings: public read, owner write
CREATE POLICY "listings_public_read"   ON public.listings FOR SELECT USING (true);
CREATE POLICY "listings_auth_insert"   ON public.listings FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "listings_owner_update"  ON public.listings FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "listings_owner_delete"  ON public.listings FOR DELETE USING (auth.uid() = owner_id);

-- Reviews: public read, auth insert, reviewer delete
CREATE POLICY "reviews_public_read"   ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_auth_insert"   ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "reviews_reviewer_delete" ON public.reviews FOR DELETE USING (auth.uid() = reviewer_id);

-- Wishlists: private to user
CREATE POLICY "wishlists_user_select" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wishlists_user_insert" ON public.wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wishlists_user_delete" ON public.wishlists FOR DELETE USING (auth.uid() = user_id);

-- Inquiries: owner/sender read, auth insert
CREATE POLICY "inquiries_select" ON public.inquiries FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = owner_id);
CREATE POLICY "inquiries_insert" ON public.inquiries FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ================================================================
-- FUNCTIONS & TRIGGERS
-- ================================================================

-- Auto-create profile on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Increment views
CREATE OR REPLACE FUNCTION public.increment_views(listing_uuid UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.listings SET views_count = views_count + 1 WHERE id = listing_uuid;
END;
$$;

-- Increment inquiries
CREATE OR REPLACE FUNCTION public.increment_inquiries(listing_uuid UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.listings SET inquiries_count = inquiries_count + 1 WHERE id = listing_uuid;
END;
$$;

-- Update listing rating when review inserted/deleted
CREATE OR REPLACE FUNCTION public.update_listing_rating()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.listings
  SET
    average_rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE listing_id = COALESCE(NEW.listing_id, OLD.listing_id)),
    total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE listing_id = COALESCE(NEW.listing_id, OLD.listing_id))
  WHERE id = COALESCE(NEW.listing_id, OLD.listing_id);
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
CREATE TRIGGER on_review_change
  AFTER INSERT OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_listing_rating();

-- Update profile listing count
CREATE OR REPLACE FUNCTION public.update_profile_listing_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.profiles
  SET total_listings = (SELECT COUNT(*) FROM public.listings WHERE owner_id = COALESCE(NEW.owner_id, OLD.owner_id) AND status = 'active')
  WHERE id = COALESCE(NEW.owner_id, OLD.owner_id);
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS on_listing_change ON public.listings;
CREATE TRIGGER on_listing_change
  AFTER INSERT OR DELETE OR UPDATE OF status ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_listing_count();

-- ================================================================
-- SEED â€” CATEGORIES (16 categories)
-- ================================================================
INSERT INTO public.categories (name, slug, icon_name, description, display_order) VALUES
  ('Cars',               'cars',             'Car',          'Rent cars for trips and daily use',               1),
  ('Bikes',              'bikes',            'Bike',         'Bicycles and motorcycles',                         2),
  ('Cameras',            'cameras',          'Camera',       'DSLRs, mirrorless, and video cameras',             3),
  ('Laptops',            'laptops',          'Laptop',       'MacBooks, gaming laptops, ultrabooks',             4),
  ('Smartphones',        'smartphones',      'Smartphone',   'iPhones, Android phones, tablets',                 5),
  ('Furniture',          'furniture',        'Armchair',     'Sofas, tables, beds, and office furniture',        6),
  ('Appliances',         'appliances',       'WashingMachine','Washing machines, ACs, refrigerators',            7),
  ('Gaming',             'gaming',           'Gamepad2',     'Consoles, VR headsets, gaming accessories',        8),
  ('Tools',              'tools',            'Wrench',       'Power tools, hand tools, construction equipment',  9),
  ('Sports',             'sports',           'Dumbbell',     'Sports and fitness equipment',                    10),
  ('Musical Instruments','musical-instruments','Music',      'Guitars, keyboards, drums, and more',             11),
  ('Events',             'events',           'PartyPopper',  'Event supplies, decorations, party items',        12),
  ('Books',              'books',            'BookOpen',     'Textbooks, novels, educational material',         13),
  ('Travel',             'travel',           'Plane',        'Luggage, camping gear, travel accessories',       14),
  ('Clothing',           'clothing',         'Shirt',        'Traditional wear, costumes, formal attire',       15),
  ('Others',             'others',           'Package',      'Everything else',                                 16)
ON CONFLICT (slug) DO NOTHING;
-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  participant_1 UUID REFERENCES profiles(id) ON DELETE CASCADE,
  participant_2 UUID REFERENCES profiles(id) ON DELETE CASCADE,
  last_message_text TEXT DEFAULT '',
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, participant_1, participant_2)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Conversations
-- Users can only see conversations they're part of
CREATE POLICY "Users can view their own conversations" 
ON conversations FOR SELECT 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- Users can insert conversations if they are participant_1 or participant_2
CREATE POLICY "Users can create conversations" 
ON conversations FOR INSERT 
WITH CHECK (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- Users can update their own conversations (e.g., last_message_text/at)
CREATE POLICY "Users can update their own conversations" 
ON conversations FOR UPDATE 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- RLS Policies for Messages
-- Users can only see messages in their conversations
CREATE POLICY "Users can view messages in their conversations" 
ON messages FOR SELECT 
USING (
  conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Users can insert messages to conversations they're part of
CREATE POLICY "Users can send messages to their conversations" 
ON messages FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Users can update messages in their conversations (e.g., mark as read)
CREATE POLICY "Users can update messages in their conversations" 
ON messages FOR UPDATE 
USING (
  conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_1, participant_2);
CREATE INDEX IF NOT EXISTS idx_conversations_listing ON conversations(listing_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- Setup realtime for messaging
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE messages, conversations;
COMMIT;
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
  'Welcome to ORMA! ðŸŽ‰',
  'Complete your profile to get started',
  '/profile'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1
  FROM notifications n
  WHERE n.user_id = p.id AND n.type = 'welcome'
);

INSERT INTO notifications (user_id, type, title, message, link)
SELECT p.id, 'system', 'Your listing is trending! ðŸ”¥', '"MacBook Pro M3" reached 500 views', '/dashboard'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM notifications n
  WHERE n.user_id = p.id AND n.type = 'system' AND n.title = 'Your listing is trending! ðŸ”¥'
);

INSERT INTO notifications (user_id, type, title, message, link)
SELECT p.id, 'review', 'New review received â­â­â­â­â­', 'Priya left a 5-star review', '/dashboard'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM notifications n
  WHERE n.user_id = p.id AND n.type = 'review' AND n.title = 'New review received â­â­â­â­â­'
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
    'New review received â­â­â­â­â­',
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
      'Your listing is trending! ðŸ”¥',
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
    'Welcome to ORMA! ðŸŽ‰',
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
-- Create Reports Table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, reporter_id)
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert reports"
ON reports FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can view their own reports"
ON reports FOR SELECT
TO authenticated
USING (auth.uid() = reporter_id);
