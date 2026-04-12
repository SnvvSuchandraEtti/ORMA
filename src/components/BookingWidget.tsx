'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ChevronDown, ChevronUp } from 'lucide-react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { differenceInDays, format } from 'date-fns'
import type { ListingWithDetails } from '@/types'
import { formatPrice } from '@/lib/utils'

interface BookingWidgetProps {
  listing: ListingWithDetails
  onContact: () => void
  onMessageOwner?: () => void
}

export default function BookingWidget({ listing, onContact, onMessageOwner }: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [showCalendar, setShowCalendar] = useState(false)

  // Calculate pricing
  const { nights, pricePerNight, totalRent, cleaningFee, serviceFee, total } = useMemo(() => {
    let n = 0
    if (dateRange?.from && dateRange?.to) {
      n = differenceInDays(dateRange.to, dateRange.from)
    }
    
    // Minimum 1 night if selected even a single day
    if (n === 0 && dateRange?.from) n = 1

    const ppn = listing.price_per_day
    const rent = ppn * n

    // Mock fees: 10% service fee, and flat ₹500 cleaning fee if applicable
    const cleaning = n > 0 ? 500 : 0
    const service = n > 0 ? Math.round(rent * 0.1) : 0
    const tot = rent + cleaning + service + (listing.security_deposit || 0)

    return {
      nights: n,
      pricePerNight: ppn,
      totalRent: rent,
      cleaningFee: cleaning,
      serviceFee: service,
      total: tot
    }
  }, [dateRange, listing.price_per_day, listing.security_deposit])

  return (
    <div className="sticky top-[175px] rounded-2xl p-8 bg-white dark:bg-[#1C1C1E] border border-[#E8E8ED] dark:border-[#38383A] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Price Header */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[28px] font-bold text-[#1D1D1F] dark:text-white tracking-tight">
            {formatPrice(listing.price_per_day)}
          </span>
          <span className="text-[17px] font-normal text-[#6E6E73] dark:text-[#98989D]">/ day</span>
        </div>
      </div>

      {/* Booking Date Selector Wrapper */}
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
                .rdp-day:hover:not(.rdp-day_selected) { background-color: rgba(0, 113, 227, 0.1); color: #0071E3; }
                .rdp-button { border-radius: 12px; }
              `}</style>
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range)
                  if (range?.from && range?.to) setShowCalendar(false)
                }}
                disabled={{ before: new Date() }}
                className="w-full flex justify-center"
              />
              <button
                onClick={() => { setDateRange(undefined); setShowCalendar(false) }}
                className="w-full py-3 mt-4 text-xs font-semibold uppercase tracking-wider text-[#0071E3] hover:underline"
              >
                Clear selection
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <button
        onClick={onContact}
        className="w-full flex items-center justify-center gap-3 h-[52px] bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0055B3] text-white font-semibold rounded-full transition-all text-[17px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <Phone size={20} fill="currentColor" />
        {nights > 0 ? 'Reserve Now' : 'Contact Owner'}
      </button>

      {onMessageOwner && (
        <button
          type="button"
          onClick={onMessageOwner}
          className="w-full mt-3 flex items-center justify-center gap-2 h-[44px] border border-[#D2D2D7] dark:border-[#38383A] text-[#1D1D1F] dark:text-white font-semibold rounded-full hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all text-sm"
        >
          Message Owner
        </button>
      )}

      <p className="text-center text-[12px] text-[#86868B] mt-6">
        Secure rental experience
      </p>

      {/* Dynamic Price Calculation */}
      <AnimatePresence>
        {nights > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 space-y-4 pt-8 border-t border-[#E8E8ED] dark:border-[#38383A]"
          >
            <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73]">
              <span>{formatPrice(pricePerNight)} × {nights} {nights === 1 ? 'day' : 'days'}</span>
              <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(totalRent)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73]">
              <span>Cleaning fee</span>
              <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(cleaningFee)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73]">
              <span>Security deposit</span>
              <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(listing.security_deposit || 0)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-normal text-[#6E6E73]">
              <span>ORMA service fee</span>
              <span className="font-semibold text-[#1D1D1F] dark:text-white">{formatPrice(serviceFee)}</span>
            </div>
            
            <div className="flex justify-between items-center font-bold text-[#1D1D1F] dark:text-white pt-4 text-[21px] tracking-tight border-t border-[#E8E8ED] dark:border-[#38383A]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
