ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS total_days INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS security_deposit NUMERIC(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS renter_message TEXT,
  ADD COLUMN IF NOT EXISTS owner_response TEXT;

ALTER TABLE public.bookings RENAME COLUMN total_price TO total_amount;

-- Also reload postgrest schema cache
NOTIFY pgrst, 'reload schema';
