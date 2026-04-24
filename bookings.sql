-- ================================================================
-- ORMA Bookings System Schema (COMPREHENSIVE)
-- Run this in your Supabase SQL editor
-- ================================================================

-- 1. Create bookings table (if not exists)
CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid primary key default gen_random_uuid(),
    listing_id uuid references public.listings(id) on delete cascade not null,
    renter_id uuid references public.profiles(id) on delete cascade not null,
    owner_id uuid references public.profiles(id) on delete cascade not null,
    start_date date not null,
    end_date date not null,
    total_days integer not null,
    price_per_day numeric,
    security_deposit numeric,
    subtotal numeric,
    platform_fee numeric default 0,
    total_amount numeric,
    status text check (status in ('pending', 'approved', 'rejected', 'cancelled', 'completed')) default 'pending',
    renter_message text,
    owner_response text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. Create availability blocks helper table
CREATE TABLE IF NOT EXISTS public.listing_availability_blocks (
    id uuid primary key default gen_random_uuid(),
    listing_id uuid references public.listings(id) on delete cascade not null,
    booking_id uuid references public.bookings(id) on delete cascade,
    blocked_from date not null,
    blocked_to date not null,
    reason text default 'booking',
    created_at timestamptz default now()
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS bookings_listing_id_idx ON public.bookings(listing_id);
CREATE INDEX IF NOT EXISTS bookings_renter_id_idx ON public.bookings(renter_id);
CREATE INDEX IF NOT EXISTS bookings_owner_id_idx ON public.bookings(owner_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings(status);
CREATE INDEX IF NOT EXISTS availability_blocks_listing_id_idx ON public.listing_availability_blocks(listing_id);

-- 4. Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_availability_blocks ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Bookings
DO $$ BEGIN
    CREATE POLICY "Renters can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = renter_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Owners can view bookings for their listings" ON public.bookings FOR SELECT USING (auth.uid() = owner_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Renters can insert own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = renter_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = owner_id OR auth.uid() = renter_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 6. RLS Policies for Availability Blocks
DO $$ BEGIN
    CREATE POLICY "Everyone can view availability blocks" ON public.listing_availability_blocks FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 7. Trigger: Update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Trigger: Sync Availability Blocks
CREATE OR REPLACE FUNCTION sync_booking_availability()
RETURNS TRIGGER AS $$
BEGIN
    -- When a booking is approved, create a block
    IF (NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved')) THEN
        INSERT INTO public.listing_availability_blocks (listing_id, booking_id, blocked_from, blocked_to, reason)
        VALUES (NEW.listing_id, NEW.id, NEW.start_date, NEW.end_date, 'booking');
    END IF;

    -- When a booking is no longer approved (cancelled/rejected/completed), remove the block
    IF (NEW.status != 'approved' AND (OLD.status = 'approved')) THEN
        DELETE FROM public.listing_availability_blocks WHERE booking_id = NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sync_booking_availability_trigger ON public.bookings;
CREATE TRIGGER sync_booking_availability_trigger AFTER UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION sync_booking_availability();

-- 9. Trigger: Notifications
CREATE OR REPLACE FUNCTION notify_booking_event()
RETURNS TRIGGER AS $$
DECLARE
    v_listing_title text;
BEGIN
    SELECT title INTO v_listing_title FROM public.listings WHERE id = NEW.listing_id;

    -- New Booking Request (Notify Owner)
    IF (TG_OP = 'INSERT' AND NEW.status = 'pending') THEN
        INSERT INTO public.notifications (user_id, type, title, message, link)
        VALUES (
            NEW.owner_id, 
            'booking_request', 
            'New Booking Request', 
            'You have a new request for "' || v_listing_title || '"', 
            '/bookings'
        );
    END IF;

    -- Status Update (Notify Renter)
    IF (TG_OP = 'UPDATE' AND NEW.status != OLD.status) THEN
        INSERT INTO public.notifications (user_id, type, title, message, link)
        VALUES (
            NEW.renter_id, 
            'booking_update', 
            'Booking Update: ' || initcap(NEW.status), 
            'Your booking for "' || v_listing_title || '" has been ' || NEW.status, 
            '/bookings'
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notify_booking_event_trigger ON public.bookings;
CREATE TRIGGER notify_booking_event_trigger AFTER INSERT OR UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION notify_booking_event();
