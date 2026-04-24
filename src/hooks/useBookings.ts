import { createClient } from '@/lib/supabase/client'
import { addDays, eachDayOfInterval, parseISO } from 'date-fns'
import type { Booking, BookingStatus, CreateBookingPayload, AvailabilityBlock } from '@/types'

// ================================================================
// ORMA — Booking Data Access Layer
// ================================================================

/**
 * Fetch all bookings where the user is the listing owner.
 * Includes listing details and renter profile.
 */
export async function fetchBookingsForOwner(userId: string): Promise<Booking[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*, listing:listings(*, owner:profiles(*), category:categories(*)), renter:profiles!bookings_renter_id_fkey(*)')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('fetchBookingsForOwner error:', error)
    throw error
  }

  return (data || []) as Booking[]
}

/**
 * Fetch all bookings where the user is the renter.
 * Includes listing details and owner profile.
 */
export async function fetchBookingsForRenter(userId: string): Promise<Booking[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*, listing:listings(*, owner:profiles(*), category:categories(*)), owner:profiles!bookings_owner_id_fkey(*)')
    .eq('renter_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('fetchBookingsForRenter error:', error)
    throw error
  }

  return (data || []) as Booking[]
}

/**
 * Fetch blocked/unavailable dates for a listing.
 * Returns a flat array of Date objects for easy DayPicker consumption.
 * Includes dates from:
 * - listing_availability_blocks (approved bookings)
 * - pending bookings (soft-blocked so renters see them)
 */
export async function fetchBlockedDatesForListing(listingId: string): Promise<Date[]> {
  const supabase = createClient()

  try {
    // 1. Get explicit availability blocks (from approved bookings)
    const { data: blocks, error: blocksError } = await supabase
      .from('listing_availability_blocks')
      .select('blocked_from, blocked_to')
      .eq('listing_id', listingId)

    if (blocksError && blocksError.message.includes('not found')) {
      // Table doesn't exist yet - likely SQL not run
      console.warn('listing_availability_blocks table not found. Please run booking_schema.sql')
    }

    // 2. Also get pending bookings (soft-block these dates)
    const { data: pendingBookings } = await supabase
      .from('bookings')
      .select('start_date, end_date')
      .eq('listing_id', listingId)
      .in('status', ['pending', 'approved'])

    const allDates: Date[] = []
    const seen = new Set<string>()

    const addRange = (from: string, to: string) => {
      try {
        const start = parseISO(from)
        const end = parseISO(to)
        // end_date is exclusive in our model (user returns on end_date)
        // but we block through end_date - 1 day for the calendar
        const days = eachDayOfInterval({ start, end: addDays(end, -1) })
        for (const day of days) {
          const key = day.toISOString().split('T')[0]
          if (!seen.has(key)) {
            seen.add(key)
            allDates.push(day)
          }
        }
      } catch {
        // Skip invalid date ranges
      }
    }

    if (blocks) {
      for (const block of blocks) {
        addRange(block.blocked_from, block.blocked_to)
      }
    }

    if (pendingBookings) {
      for (const booking of pendingBookings) {
        addRange(booking.start_date, booking.end_date)
      }
    }

    return allDates
  } catch (err) {
    console.error('Error fetching blocked dates:', err)
    return []
  }
}

/**
 * Create a new booking request with status 'pending'.
 */
export async function createBookingRequest(payload: CreateBookingPayload): Promise<Booking> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      listing_id: payload.listing_id,
      renter_id: payload.renter_id,
      owner_id: payload.owner_id,
      start_date: payload.start_date,
      end_date: payload.end_date,
      total_days: payload.total_days,
      price_per_day: payload.price_per_day,
      security_deposit: payload.security_deposit,
      subtotal: payload.subtotal,
      platform_fee: payload.platform_fee,
      total_amount: payload.total_amount,
      status: 'pending',
      renter_message: payload.renter_message || null,
    })
    .select()
    .single()

  if (error) {
    console.error('createBookingRequest error:', error)
    throw error
  }

  return data as Booking
}

/**
 * Update booking status (owner action: approve/reject/complete).
 */
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  ownerResponse?: string
): Promise<void> {
  const supabase = createClient()

  const updates: Record<string, unknown> = { status }
  if (ownerResponse !== undefined) {
    updates.owner_response = ownerResponse
  }

  const { error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)

  if (error) {
    console.error('updateBookingStatus error:', error)
    throw error
  }
}

/**
 * Cancel a booking (renter action — only for pending bookings).
 */
export async function cancelBooking(bookingId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)

  if (error) {
    console.error('cancelBooking error:', error)
    throw error
  }
}
