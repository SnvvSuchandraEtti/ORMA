'use client'

import { useState, useMemo } from 'react'
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
    const tot = rent + cleaning + service + listing.security_deposit

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
    <div className="sticky top-[175px] border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.12)] p-6 bg-white dark:bg-[#1E1E1E]">
      {/* Price Header */}
      <div className="mb-6">
        <p className="text-2xl font-semibold text-[#222222] dark:text-white">
          {formatPrice(listing.price_per_day)}
          <span className="text-base font-normal text-[#717171] dark:text-[#A0A0A0]"> / day</span>
        </p>
      </div>

      {/* Booking Date Selector Wrapper */}
      <div className="border border-[#B0B0B0] rounded-xl overflow-hidden mb-4 relative z-10">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#1E1E1E] hover:bg-gray-50 dark:bg-[#1A1A1A] transition-colors text-left"
        >
          <div className="grid grid-cols-2 w-full divide-x divide-[#DDDDDD]">
            <div className="px-1">
              <span className="block text-[10px] font-bold text-[#222222] dark:text-white uppercase">CHECK-IN</span>
              <span className="text-sm text-[#717171] dark:text-[#A0A0A0]">
                {dateRange?.from ? format(dateRange.from, 'MMM d, yyyy') : 'Add date'}
              </span>
            </div>
            <div className="px-3">
              <span className="block text-[10px] font-bold text-[#222222] dark:text-white uppercase">CHECKOUT</span>
              <span className="text-sm text-[#717171] dark:text-[#A0A0A0]">
                {dateRange?.to ? format(dateRange.to, 'MMM d, yyyy') : 'Add date'}
              </span>
            </div>
          </div>
          {showCalendar ? <ChevronUp size={20} className="text-[#717171] dark:text-[#A0A0A0] absolute right-4" /> : <ChevronDown size={20} className="text-[#717171] dark:text-[#A0A0A0] absolute right-4" />}
        </button>

        {showCalendar && (
          <div className="p-4 border-t border-[#DDDDDD] dark:border-[#3D3D3D] bg-white dark:bg-[#1E1E1E] absolute top-full left-0 right-0 shadow-lg rounded-b-xl max-h-[400px] overflow-auto z-20">
            <style jsx global>{`
              .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #222222; --rdp-background-color: #F7F7F7; margin: 0; }
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: #222222; color: white; }
              .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #F7F7F7; }
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
              className="w-full py-2 mt-4 text-sm font-semibold underline text-[#222222] dark:text-white"
            >
              Clear dates
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onContact}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF385C] text-white font-semibold rounded-lg hover:bg-[#E31C5F] hover:shadow-md transition-all text-base"
      >
        <Phone size={18} />
        {nights > 0 ? 'Reserve / Message' : 'Message Owner'}
      </button>

      <p className="text-center text-xs text-[#717171] dark:text-[#A0A0A0] mt-3">
        You won&apos;t be charged yet. ORMA does not process payments.
      </p>

      {/* Dynamic Price Calculation */}
      {nights > 0 && (
        <div className="mt-6 space-y-3 pb-4 border-b border-[#DDDDDD] dark:border-[#3D3D3D]">
          <div className="flex justify-between text-[#222222] dark:text-white">
            <span className="underline">{formatPrice(pricePerNight)} x {nights} days</span>
            <span>{formatPrice(totalRent)}</span>
          </div>
          <div className="flex justify-between text-[#222222] dark:text-white">
            <span className="underline">Cleaning fee</span>
            <span>{formatPrice(cleaningFee)}</span>
          </div>
          <div className="flex justify-between text-[#222222] dark:text-white">
            <span className="underline">ORMA service fee</span>
            <span>{formatPrice(serviceFee)}</span>
          </div>
          {listing.security_deposit > 0 && (
            <div className="flex justify-between text-[#222222] dark:text-white">
              <span className="underline">Security deposit</span>
              <span>{formatPrice(listing.security_deposit)}</span>
            </div>
          )}
        </div>
      )}

      {/* Total Display */}
      {nights > 0 && (
        <div className="flex justify-between font-semibold text-[#222222] dark:text-white pt-4 text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      )}
    </div>
  )
}
