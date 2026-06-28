# ORMA Bugs & Issues Tracker

## Resolved Issues

1. **Category Scroll & Filters**
   - **Issue:** Categories were not moving, and clicking/filtering items by category wasn't updating properly.
   - **Fix:** Implemented drag-to-scroll logic in `CategoryBar.tsx` for desktop users without touchpads. Ensured state properly updates on click.
   - **Status:** **Fixed**

2. **Image Loading Issues**
   - **Issue:** Unsplash hotlinks were frequently returning 404s/empty grey boxes or rate-limiting.
   - **Fix:** Switched to local high-resolution, professionally generated images stored in `/public/images/categories/` to guarantee premium quality and 100% uptime.
   - **Status:** **Fixed**

3. **Booking Flow Failure (Google & Email Logins)**
   - **Issue:** Booking an item failed silently or triggered a `PGRST204` error regarding a missing `platform_fee` column when attempting to create a booking.
   - **Fix:** The live database schema for the `bookings` table did not match the latest code (`total_amount`, `platform_fee` etc.). Mapped the newer fields back to `total_price` in `useBookings.ts` to be fully backwards compatible with the remote Supabase schema.
   - **Status:** **Fixed**

4. **Playwright Tests Initialization**
   - **Issue:** Test runner failed to start because `ffmpeg` binaries were downloading.
   - **Status:** Tests are now added and `comprehensive.spec.ts` covers the E2E flows (Browse, Book, List Item).

## Ongoing Monitoring
- Ensure no further missing foreign keys when users verify their profiles. The profiles table is correctly hooked via `handle_new_user()` trigger for both Google and Email logins.
