'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, MessageCircle, CheckCircle, Lock } from 'lucide-react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { differenceInDays, format, addDays } from 'date-fns'
import Link from 'next/link'
import type { ListingWithDetails } from '@/types'
import { formatPrice, cn } from '@/lib/utils'
import { createBookingRequest, fetchBlockedDatesForListing } from '@/hooks/useBookings'
import toast from '@/lib/toast'

interface BookingWidgetProps {
  listing: ListingWithDetails
  onContact: () => void
  onMessageOwner?: () => void
  isOwner?: boolean
  isAuthenticated?: boolean
  onOpenAuth?: () => void
  userId?: string
}

export default function BookingWidget({
  listing,
  onMessageOwner,
  isOwner = false,
  isAuthenticated = false,
  onOpenAuth,
  userId,
}: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [showCalendar, setShowCalendar] = useState(false)
  const [renterMessage, setRenterMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [blockedDates, setBlockedDates] = useState<Date[]>([])

  // Fetch blocked dates
  const loadBlockedDates = useCallback(async () => {
    try {
      const dates = await fetchBlockedDatesForListing(listing.id)
      setBlockedDates(dates)
    } catch {
      // Silently fail
    }
  }, [listing.id])

  useEffect(() => {
    loadBlockedDates()
  }, [loadBlockedDates])

  // Calculate pricing
  const { days, pricePerDay, subtotal, platformFee, deposit, total } = useMemo(() => {
    let n = 0
    if (dateRange?.from && dateRange?.to) {
      n = differenceInDays(dateRange.to, dateRange.from)
    }
    
    // Simple duration based pricing logic
    let currentPrice = listing.price_per_day
    if (n >= 30) currentPrice = listing.price_per_month || currentPrice
    else if (n >= 7) currentPrice = listing.price_per_week || currentPrice

    const sub = n * currentPrice
    const fee = sub * 0.05 // 5% platform fee
    const dep = listing.security_deposit || 0

    return {
      days: n,
      pricePerDay: currentPrice,
      subtotal: sub,
      platformFee: fee,
      deposit: dep,
      total: sub + fee + dep
    }
  }, [dateRange, listing])

  const disabledDays = useMemo(() => {
    return [{ before: new Date() }, ...blockedDates]
  }, [blockedDates])

  const hasOverlap = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return false
    const start = dateRange.from
    const end = dateRange.to
    return blockedDates.some(d => d >= start && d < end)
  }, [dateRange, blockedDates])

  const canSubmit = days > 0 && !hasOverlap && isAuthenticated && !isOwner && !isSubmitting && !bookingSuccess

  const getCtaConfig = () => {
    if (isOwner) {
      return { label: 'You own this listing', disabled: true, icon: <Lock size={18} /> }
    }
    if (!isAuthenticated) {
      return { label: 'Log in to Book', disabled: false, icon: null, action: onOpenAuth }
    }
    if (hasOverlap) {
      return { label: 'Dates unavailable', disabled: true, icon: null }
    }
    if (days === 0) {
      return { label: 'Select dates', disabled: true, icon: null }
    }
    return { label: 'Reserve Now', disabled: false, icon: null }
  }

  const cta = getCtaConfig()

  const handleSubmit = async () => {
    if (!canSubmit || !userId || !dateRange?.from || !dateRange?.to) return

    setIsSubmitting(true)
    try {
      await createBookingRequest({
        listing_id: listing.id,
        renter_id: userId,
        owner_id: listing.owner_id,
        start_date: format(dateRange.from, 'yyyy-MM-dd'),
        end_date: format(dateRange.to, 'yyyy-MM-dd'),
        total_days: days,
        price_per_day: pricePerDay,
        security_deposit: deposit,
        subtotal,
        platform_fee: platformFee,
        total_amount: total,
        renter_message: renterMessage.trim() || undefined,
      })

      setBookingSuccess(true)
      toast.success('Booking request sent!', 'The owner will review your request')
    } catch (err) {
      toast.error('Failed to send request', err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-3xl border border-[#D2D2D7] dark:border-[#38383A] rounded-[2.5rem] p-8 shadow-[0_24px_50px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.05)] sticky top-[100px]">
      <AnimatePresence mode="wait">
        {!bookingSuccess ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-baseline mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                  {formatPrice(pricePerDay)}
                </span>
                <span className="text-[17px] font-normal text-[#6E6E73] dark:text-[#98989D]">/ day</span>
              </div>
              {blockedDates.length > 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  Partially booked
                </p>
              )}
            </div>

            {/* Booking Date Selector */}
            <div className="border border-[#D2D2D7] dark:border-[#38383A] rounded-xl overflow-hidden mb-6 relative z-10 bg-[#F5F5F7] dark:bg-[#2C2C2E]">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/60 dark:hover:bg-[#38383A] transition-colors text-left"
              >
                <div className="grid grid-cols-2 w-full divide-x divide-[#D2D2D7] dark:divide-[#38383A]">
                  <div className="px-2">
                    <span className="block text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">RENT FROM</span>
                    <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white truncate">
                      {dateRange?.from ? format(dateRange.from, 'MMM d, yyyy') : 'Select date'}
                    </span>
                  </div>
                  <div className="px-5">
                    <span className="block text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">UNTIL</span>
                    <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white truncate">
                      {dateRange?.to ? format(dateRange.to, 'MMM d, yyyy') : 'Select date'}
                    </span>
                  </div>
                </div>
                <div className="ml-2 text-[#86868B]">
                  {showCalendar ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
                </div>
              </button>

              <AnimatePresence>
                {showCalendar && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 border-t border-[#D2D2D7] dark:border-[#38383A] bg-white dark:bg-[#2C2C2E] max-h-[420px] overflow-auto"
                  >
                    <style jsx global>{`
                      .rdp { --rdp-cell-size: 44px; --rdp-accent-color: #0071E3; --rdp-background-color: #F5F5F7; margin: 0; }
                      .rdp-day_selected, .rdp-day_selected:hover { background-color: #0071E3 !important; color: white !important; font-weight: 600; }
                      .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_disabled) { background-color: rgba(0, 113, 227, 0.1); color: #0071E3; }
                      .rdp-button { border-radius: 12px; }
                      .rdp-day_disabled { opacity: 0.35; text-decoration: line-through; }
                    `}</style>
                    <DayPicker
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                         setDateRange(range)
                         if (range?.from && range?.to) setShowCalendar(false)
                      }}
                      disabled={disabledDays}
                      initialFocus
                      fromMonth={new Date()}
                      numberOfMonths={1}
                      className="rdp-booking"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Note/Message to Owner */}
            {isAuthenticated && !isOwner && (
              <div className="mb-6">
                <label className="block text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-2 ml-1">
                  MESSAGE TO OWNER (OPTIONAL)
                </label>
                <textarea
                  value={renterMessage}
                  onChange={(e) => setRenterMessage(e.target.value)}
                  placeholder="Hi! I'd like to rent this for my upcoming trip..."
                  className="w-full p-4 border border-[#D2D2D7] dark:border-[#38383A] rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] text-sm text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all resize-none h-[100px]"
                />
              </div>
            )}

            {/* Main CTA */}
            <button
              onClick={cta.action || handleSubmit}
              disabled={cta.disabled || isSubmitting}
              className={cn(
                "w-full h-[58px] flex items-center justify-center gap-2 rounded-full font-bold text-[17px] transition-all shadow-sm active:scale-[0.98]",
                cta.disabled 
                  ? "bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B] cursor-not-allowed" 
                  : "bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-[0_8px_20px_rgba(0,113,227,0.25)]"
              )}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {cta.icon}
                  {cta.label}
                </>
              )}
            </button>

            {/* Overlap Warning */}
            {hasOverlap && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-3 text-center font-medium">
                Your selected dates overlap with existing bookings.
              </p>
            )}

            {/* Message Owner Secondary */}
            {onMessageOwner && !isOwner && !bookingSuccess && (
              <button
                type="button"
                onClick={onMessageOwner}
                className="w-full mt-4 flex items-center justify-center gap-2 h-[52px] border border-[#D2D2D7] dark:border-[#38383A] text-[#1D1D1F] dark:text-white font-semibold rounded-full hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all text-sm"
              >
                <MessageCircle size={16} />
                Message Owner
              </button>
            )}

            <p className="text-center text-[11px] text-[#86868B] mt-6 leading-relaxed">
              You won&apos;t be charged — this is a rental request. Payment is handled once the owner approves.
            </p>

            {/* Dynamic Price Calculation */}
            {days > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4 pt-8 border-t border-[#E8E8ED] dark:border-[#38383A]"
              >
                <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73] dark:text-[#A0A0A0]">
                  <span>{formatPrice(pricePerDay)} × {days} {days === 1 ? 'day' : 'days'}</span>
                  <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                {deposit > 0 && (
                  <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73] dark:text-[#A0A0A0]">
                    <span>Security deposit <span className="text-[10px] text-green-600 dark:text-green-400 font-bold ml-1">(REFUNDABLE)</span></span>
                    <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(deposit)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73] dark:text-[#A0A0A0]">
                  <span>ORMA service fee</span>
                  <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(platformFee)}</span>
                </div>

                <div className="flex justify-between items-center font-bold text-[#1D1D1F] dark:text-white pt-4 text-[21px] tracking-tight border-t border-[#E8E8ED] dark:border-[#38383A]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-20 h-20 bg-[#0071E3]/10 dark:bg-[#0071E3]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0071E3]">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-white mb-3">Request Sent!</h3>
            <p className="text-[#6E6E73] dark:text-[#A0A0A0] text-sm leading-relaxed mb-8">
              The owner has been notified. You can track your request and message the owner in your dashboard.
            </p>
            <div className="space-y-3">
              <Link
                href="/bookings"
                className="flex items-center justify-center w-full h-[58px] bg-[#0071E3] text-white font-bold rounded-full hover:bg-[#0077ED] transition-all shadow-lg shadow-[#0071E3]/20"
              >
                Go to My Bookings
              </Link>
              <button
                onClick={() => setBookingSuccess(false)}
                className="w-full h-[52px] text-sm font-semibold text-[#0071E3] hover:underline"
              >
                Book another trip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
