-- ================================================================
-- ORMA — Booking & Reservation System Schema
-- Run this in Supabase SQL Editor AFTER the main schema
-- ================================================================

-- ----------------------------------------------------------------
-- 1. BOOKINGS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id        UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  renter_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  start_date        DATE NOT NULL,
  end_date          DATE NOT NULL,
  total_days        INTEGER NOT NULL,
  price_per_day     NUMERIC(10,2) NOT NULL DEFAULT 0,
  security_deposit  NUMERIC(10,2) NOT NULL DEFAULT 0,
  subtotal          NUMERIC(10,2) NOT NULL DEFAULT 0,
  platform_fee      NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount      NUMERIC(10,2) NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','approved','rejected','cancelled','completed')),
  renter_message    TEXT,
  owner_response    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure end_date is after start_date
  CONSTRAINT bookings_date_check CHECK (end_date > start_date),
  -- Prevent renter from booking their own listing (extra safety)
  CONSTRAINT bookings_not_self CHECK (renter_id != owner_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_listing_id ON public.bookings(listing_id);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_id  ON public.bookings(renter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_owner_id   ON public.bookings(owner_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status     ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates      ON public.bookings(listing_id, start_date, end_date);

-- ----------------------------------------------------------------
-- 2. LISTING AVAILABILITY BLOCKS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.listing_availability_blocks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  booking_id    UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  blocked_from  DATE NOT NULL,
  blocked_to    DATE NOT NULL,
  reason        TEXT NOT NULL DEFAULT 'booking',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT blocks_date_check CHECK (blocked_to >= blocked_from)
);

CREATE INDEX IF NOT EXISTS idx_availability_listing ON public.listing_availability_blocks(listing_id);
CREATE INDEX IF NOT EXISTS idx_availability_dates   ON public.listing_availability_blocks(listing_id, blocked_from, blocked_to);
CREATE INDEX IF NOT EXISTS idx_availability_booking ON public.listing_availability_blocks(booking_id);

-- ================================================================
-- RLS POLICIES
-- ================================================================
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_availability_blocks ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------
-- Bookings RLS
-- ----------------------------------------------------------------

-- Renters can view their own bookings
CREATE POLICY "bookings_renter_select"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = renter_id);

-- Owners can view bookings for their listings
CREATE POLICY "bookings_owner_select"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

-- Renters can create bookings (only as themselves)
CREATE POLICY "bookings_renter_insert"
  ON public.bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = renter_id);

-- Owners can update bookings on their listings (approve/reject/complete)
CREATE POLICY "bookings_owner_update"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Renters can update their own bookings (cancel)
CREATE POLICY "bookings_renter_update"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = renter_id);

-- ----------------------------------------------------------------
-- Availability Blocks RLS
-- ----------------------------------------------------------------

-- Anyone can read blocked dates (needed for calendar display)
CREATE POLICY "availability_public_read"
  ON public.listing_availability_blocks FOR SELECT
  USING (true);

-- Only system (via triggers) should insert/delete, but allow owners too
CREATE POLICY "availability_owner_insert"
  ON public.listing_availability_blocks FOR INSERT
  TO authenticated
  WITH CHECK (
    listing_id IN (
      SELECT id FROM public.listings WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "availability_owner_delete"
  ON public.listing_availability_blocks FOR DELETE
  TO authenticated
  USING (
    listing_id IN (
      SELECT id FROM public.listings WHERE owner_id = auth.uid()
    )
  );

-- ================================================================
-- FUNCTIONS & TRIGGERS
-- ================================================================

-- ----------------------------------------------------------------
-- Auto-update updated_at on bookings
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_booking_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_booking_updated_at ON public.bookings;
CREATE TRIGGER trg_booking_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_booking_updated_at();

-- ----------------------------------------------------------------
-- Prevent overlapping approved bookings for the same listing
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_overlapping_bookings()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Only check on INSERT or when status is being set to 'approved'
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.status = 'approved') THEN
    IF EXISTS (
      SELECT 1 FROM public.bookings
      WHERE listing_id = NEW.listing_id
        AND id != NEW.id
        AND status = 'approved'
        AND start_date < NEW.end_date
        AND end_date > NEW.start_date
    ) THEN
      RAISE EXCEPTION 'Dates overlap with an existing approved booking for this listing';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_overlap ON public.bookings;
CREATE TRIGGER trg_prevent_overlap
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_overlapping_bookings();

-- ----------------------------------------------------------------
-- Manage availability blocks when booking status changes
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.manage_availability_blocks()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- When booking becomes approved, create availability block
  IF NEW.status = 'approved' AND (OLD IS NULL OR OLD.status != 'approved') THEN
    INSERT INTO public.listing_availability_blocks (listing_id, booking_id, blocked_from, blocked_to, reason)
    VALUES (NEW.listing_id, NEW.id, NEW.start_date, NEW.end_date, 'booking')
    ON CONFLICT DO NOTHING;
  END IF;

  -- When booking is cancelled, rejected, or completed — remove the block
  IF NEW.status IN ('cancelled', 'rejected') AND OLD.status = 'approved' THEN
    DELETE FROM public.listing_availability_blocks
    WHERE booking_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_manage_availability ON public.bookings;
CREATE TRIGGER trg_manage_availability
  AFTER INSERT OR UPDATE OF status ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.manage_availability_blocks();

-- ----------------------------------------------------------------
-- Expand notification types to support booking notifications
-- ----------------------------------------------------------------
DO $$
BEGIN
  -- Drop and recreate the CHECK constraint on notifications.type
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'notifications' AND constraint_type = 'CHECK'
  ) THEN
    ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS notifications_type_check;
  END IF;

  ALTER TABLE public.notifications
    ADD CONSTRAINT notifications_type_check
    CHECK (type IN ('inquiry', 'review', 'system', 'milestone', 'welcome', 'booking_request', 'booking_update'));
END $$;

-- ----------------------------------------------------------------
-- Notify on booking events
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.notify_on_booking_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  listing_title TEXT;
  renter_name TEXT;
BEGIN
  -- Get listing title
  SELECT title INTO listing_title FROM public.listings WHERE id = NEW.listing_id;
  -- Get renter name
  SELECT full_name INTO renter_name FROM public.profiles WHERE id = NEW.renter_id;

  -- New booking request → notify owner
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      NEW.owner_id,
      'booking_request',
      'New booking request 📋',
      COALESCE(renter_name, 'Someone') || ' wants to rent "' || COALESCE(listing_title, 'your item') || '" from ' || NEW.start_date::TEXT || ' to ' || NEW.end_date::TEXT,
      '/bookings'
    );
  END IF;

  -- Status changed → notify renter
  IF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      NEW.renter_id,
      'booking_update',
      CASE NEW.status
        WHEN 'approved' THEN 'Booking approved! ✅'
        WHEN 'rejected' THEN 'Booking declined ❌'
        WHEN 'cancelled' THEN 'Booking cancelled'
        WHEN 'completed' THEN 'Rental completed! 🎉'
        ELSE 'Booking updated'
      END,
      'Your booking for "' || COALESCE(listing_title, 'an item') || '" has been ' || NEW.status,
      '/bookings'
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_booking ON public.bookings;
CREATE TRIGGER trg_notify_booking
  AFTER INSERT OR UPDATE OF status ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_booking_change();

-- ----------------------------------------------------------------
-- Add bookings to realtime publication
-- ----------------------------------------------------------------
DO $$
BEGIN
  -- Recreate the publication to include bookings
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE messages, conversations, bookings, notifications;
END $$;
