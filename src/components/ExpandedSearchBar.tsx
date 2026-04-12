'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ExpandedSearchBar({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'location' | 'checkin' | 'checkout' | 'guests'>('location')
  const [location, setLocation] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState(1)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('q', location)
    if (dateRange?.from) params.set('startDate', dateRange.from.toISOString())
    if (dateRange?.to) params.set('endDate', dateRange.to.toISOString())
    if (guests > 1) params.set('guests', guests.toString())
    onClose()
    router.push(`/search?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] bg-white dark:bg-[#1C1C1E] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex items-center h-16 mt-2 z-50 border border-[#D2D2D7] dark:border-[#38383A]"
    >
      {/* Location */}
      <div 
        onClick={() => setActiveTab('location')}
        className={cn(
          "flex-1 flex flex-col justify-center px-8 h-full rounded-full cursor-pointer hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all duration-200 relative",
          activeTab === 'location' && "bg-white dark:bg-[#2C2C2E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-white dark:hover:bg-[#2C2C2E]"
        )}
      >
        <span className="text-[10px] font-semibold text-[#86868B] tracking-wider">WHERE</span>
        <input 
          type="text" 
          placeholder="Search destinations" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-[#1D1D1F] dark:text-white placeholder-[#86868B] truncate w-full"
        />
        {activeTab === 'location' && (
          <div className="absolute top-20 left-0 w-[400px] bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-6 z-50 border border-[#E8E8ED] dark:border-[#38383A]">
            <h3 className="text-xs font-semibold mb-4 text-[#86868B] uppercase tracking-wider">Popular locations</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Goa', 'Mumbai', 'Bangalore', 'Delhi'].map(city => (
                <button
                  key={city}
                  onClick={() => { setLocation(city); setActiveTab('checkin') }}
                  className="flex items-center gap-3 p-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl text-left transition-colors"
                >
                  <MapPin size={20} className="text-[#86868B]" />
                  <span className="text-sm font-medium text-[#1D1D1F] dark:text-white">{city}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-[1px] h-8 bg-[#D2D2D7] dark:bg-[#38383A]" />

      {/* Check in */}
      <div
        onClick={() => setActiveTab('checkin')}
        className={cn(
          "flex-1 flex flex-col justify-center px-6 h-full rounded-full cursor-pointer hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all duration-200 relative",
          activeTab === 'checkin' && "bg-white dark:bg-[#2C2C2E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-white dark:hover:bg-[#2C2C2E]"
        )}
      >
        <span className="text-[10px] font-semibold text-[#86868B] tracking-wider">CHECK IN</span>
        <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white truncate">
          {dateRange?.from ? format(dateRange.from, 'MMM d') : 'Add dates'}
        </span>
        
        {/* Calendar Dropdown */}
        {(activeTab === 'checkin' || activeTab === 'checkout') && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-6 z-50 border border-[#E8E8ED] dark:border-[#38383A]">
            <style jsx global>{`
              .rdp { --rdp-cell-size: 48px; --rdp-accent-color: #0071E3; }
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: #0071E3; color: white; }
              .dark .rdp-day { color: white; }
              .dark .rdp-day_disabled { color: #38383A; }
            `}</style>
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range)
                if (range?.from && range?.to) setActiveTab('guests')
                else if (range?.from) setActiveTab('checkout')
              }}
              disabled={{ before: new Date() }}
              numberOfMonths={2}
            />
          </div>
        )}
      </div>

      <div className="w-[1px] h-8 bg-[#D2D2D7] dark:bg-[#38383A]" />

      {/* Check out */}
      <div
        onClick={() => setActiveTab('checkout')}
        className={cn(
          "flex-1 flex flex-col justify-center px-6 h-full rounded-full cursor-pointer hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all duration-200 relative",
          activeTab === 'checkout' && "bg-white dark:bg-[#2C2C2E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-white dark:hover:bg-[#2C2C2E]"
        )}
      >
        <span className="text-[10px] font-semibold text-[#86868B] tracking-wider">CHECK OUT</span>
        <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white truncate">
          {dateRange?.to ? format(dateRange.to, 'MMM d') : 'Add dates'}
        </span>
      </div>

      <div className="w-[1px] h-8 bg-[#D2D2D7] dark:bg-[#38383A]" />

      {/* Guests */}
      <div
        onClick={() => setActiveTab('guests')}
        className={cn(
          "flex-[1.2] flex items-center justify-between pl-6 pr-2 h-full rounded-full cursor-pointer hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all duration-200 relative",
          activeTab === 'guests' && "bg-white dark:bg-[#2C2C2E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-white dark:hover:bg-[#2C2C2E]"
        )}
      >
        <div className="flex flex-col justify-center truncate">
          <span className="text-[10px] font-semibold text-[#86868B] tracking-wider">WHO</span>
          <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white truncate">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </span>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleSearch(); }}
          className="h-12 px-6 bg-[#0071E3] hover:bg-[#0077ED] rounded-full text-white font-semibold flex items-center gap-2 hover:shadow-sm active:scale-[0.98] transition-all ml-2"
        >
          <Search size={16} className="stroke-[2.5]" />
          <span>Search</span>
        </button>

        {activeTab === 'guests' && (
          <div className="absolute top-20 right-0 w-[350px] bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-6 z-50 border border-[#E8E8ED] dark:border-[#38383A]">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3 className="font-semibold text-[#1D1D1F] dark:text-white">Adults & Children</h3>
                <p className="text-xs font-normal text-[#86868B]">Ages 2 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)) }}
                  className="w-8 h-8 rounded-full border border-[#D2D2D7] dark:border-[#38383A] flex items-center justify-center text-[#86868B] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
                >
                  -
                </button>
                <span className="w-4 text-center font-semibold text-[#1D1D1F] dark:text-white">{guests}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuests(guests + 1) }}
                  className="w-8 h-8 rounded-full border border-[#D2D2D7] dark:border-[#38383A] flex items-center justify-center text-[#86868B] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
