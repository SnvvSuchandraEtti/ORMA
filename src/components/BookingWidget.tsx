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
}

export default function BookingWidget({ listing, onContact }: BookingWidgetProps) {
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
    <div className="sticky top-[175px] rounded-[2.5rem] p-8 bg-white/80 dark:bg-black/40 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.05] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Aesthetic Highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF385C]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Price Header */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-[#222222] dark:text-white-pure tracking-tight">
            {formatPrice(listing.price_per_day)}
          </span>
          <span className="text-sm font-bold text-[#717171] dark:text-gray-400 uppercase tracking-widest">/ day</span>
        </div>
      </div>

      {/* Booking Date Selector Wrapper */}
      <div className="border border-black/[0.1] dark:border-white/[0.1] rounded-[2rem] overflow-hidden mb-6 relative z-10 bg-white/40 dark:bg-black/20">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full flex items-center justify-between p-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors text-left"
        >
          <div className="grid grid-cols-2 w-full divide-x divide-black/[0.05] dark:divide-white/[0.05]">
            <div className="px-2">
              <span className="block text-[10px] font-black text-[#222222] dark:text-gray-400 uppercase tracking-widest mb-1">RENT FROM</span>
              <span className="text-sm font-bold text-black dark:text-white truncate">
                {dateRange?.from ? format(dateRange.from, 'MMM d, yyyy') : 'Select date'}
              </span>
            </div>
            <div className="px-5">
              <span className="block text-[10px] font-black text-[#222222] dark:text-gray-400 uppercase tracking-widest mb-1">UNTIL</span>
              <span className="text-sm font-bold text-black dark:text-white truncate">
                {dateRange?.to ? format(dateRange.to, 'MMM d, yyyy') : 'Select date'}
              </span>
            </div>
          </div>
          <div className="ml-2 text-[#717171] dark:text-gray-400">
            {showCalendar ? <ChevronUp size={18} strokeWidth={3} /> : <ChevronDown size={18} strokeWidth={3} />}
          </div>
        </button>

        <AnimatePresence>
          {showCalendar && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-t border-black/[0.05] dark:border-white/[0.05] bg-white/40 dark:bg-black/20 backdrop-blur-xl max-h-[420px] overflow-auto"
            >
              <style jsx global>{`
                .rdp { --rdp-cell-size: 44px; --rdp-accent-color: #FF385C; --rdp-background-color: #F7F7F7; margin: 0; }
                .rdp-day_selected, .rdp-day_selected:hover { background-color: #FF385C !important; color: white !important; font-weight: bold; }
                .rdp-day:hover:not(.rdp-day_selected) { background-color: rgba(255, 56, 92, 0.1); color: #FF385C; }
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
                className="w-full py-3 mt-4 text-xs font-black uppercase tracking-widest text-[#FF385C] hover:underline"
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
        className="w-full flex items-center justify-center gap-3 py-5 bg-gradient-to-br from-[#FF385C] to-[#E31C5F] text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-lg shadow-xl shadow-[#FF385C]/20"
      >
        <Phone size={20} fill="currentColor" />
        {nights > 0 ? 'Reserve Now' : 'Contact Owner'}
      </button>

      <p className="text-center text-[11px] font-bold text-[#717171] uppercase tracking-widest mt-6 opacity-60">
        Secure rental experience
      </p>

      {/* Dynamic Price Calculation */}
      <AnimatePresence>
        {nights > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 space-y-4 pt-8 border-t border-black/[0.05] dark:border-white/[0.05]"
          >
            <div className="flex justify-between items-center text-sm font-medium text-[#717171] dark:text-gray-400">
              <span>{formatPrice(pricePerNight)} × {nights} {nights === 1 ? 'day' : 'days'}</span>
              <span className="font-bold text-black dark:text-white">{formatPrice(totalRent)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-[#717171] dark:text-gray-400">
              <span>Cleaning fee</span>
              <span className="font-bold text-black dark:text-white">{formatPrice(cleaningFee)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-[#717171] dark:text-gray-400">
              <span>Security deposit</span>
              <span className="font-bold text-black dark:text-white">{formatPrice(listing.security_deposit || 0)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-[#717171] dark:text-gray-400">
              <span>ORMA service fee</span>
              <span className="font-bold text-black dark:text-white">{formatPrice(serviceFee)}</span>
            </div>
            
            <div className="flex justify-between items-center font-black text-black dark:text-white pt-4 text-xl tracking-tight border-t border-black/[0.05] dark:border-white/[0.05]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
