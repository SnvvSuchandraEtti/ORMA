'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Calendar as CalendarIcon, Users } from 'lucide-react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
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
    params.set('guests', guests.toString())
    onClose()
    router.push(`/search?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-2xl rounded-full shadow-[0_16px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] flex items-center h-16 mt-2 z-50 border-none"
    >
      {/* Location */}
      <div 
        onClick={() => setActiveTab('location')}
        className={cn(
          "flex-1 flex flex-col justify-center px-8 h-full rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 relative",
          activeTab === 'location' && "bg-white dark:bg-[#2D2D2D] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white dark:hover:bg-[#2D2D2D]"
        )}
      >
        <span className="text-[10px] font-bold text-[#222222] dark:text-white/70 tracking-wider">WHERE</span>
        <input 
          type="text" 
          placeholder="Search destinations" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-[#222222] dark:text-white placeholder-[#717171] dark:placeholder-[#A0A0A0] truncate w-full"
        />
        {activeTab === 'location' && (
          <div className="absolute top-20 left-0 w-[400px] bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-2xl rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] p-6 z-50 border border-black/5 dark:border-white/10">
            <h3 className="text-xs font-bold mb-4 text-[#222222] dark:text-white uppercase tracking-wider">Popular locations</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Goa', 'Mumbai', 'Bangalore', 'Delhi'].map(city => (
                <button
                  key={city}
                  onClick={() => { setLocation(city); setActiveTab('checkin') }}
                  className="flex items-center gap-3 p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-left transition-colors"
                >
                  <MapPin size={20} className="text-[#717171] dark:text-[#A0A0A0]" />
                  <span className="text-sm font-medium text-[#222222] dark:text-white">{city}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-[1px] h-8 bg-black/5 dark:bg-white/10" />

      {/* Check in */}
      <div
        onClick={() => setActiveTab('checkin')}
        className={cn(
          "flex-1 flex flex-col justify-center px-6 h-full rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 relative",
          activeTab === 'checkin' && "bg-white dark:bg-[#2D2D2D] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white dark:hover:bg-[#2D2D2D]"
        )}
      >
        <span className="text-[10px] font-bold text-[#222222] dark:text-white/70 tracking-wider">CHECK IN</span>
        <span className="text-sm font-bold text-[#222222] dark:text-white truncate">
          {dateRange?.from ? format(dateRange.from, 'MMM d') : 'Add dates'}
        </span>
        
        {/* Calendar Dropdown */}
        {(activeTab === 'checkin' || activeTab === 'checkout') && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-2xl rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] p-6 z-50 border border-black/5 dark:border-white/10">
            <style jsx global>{`
              .rdp { --rdp-cell-size: 48px; --rdp-accent-color: #FF385C; }
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: #FF385C; color: white; }
              .dark .rdp-day { color: white; }
              .dark .rdp-day_disabled { color: #3D3D3D; }
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

      <div className="w-[1px] h-8 bg-black/5 dark:bg-white/10" />

      {/* Check out */}
      <div
        onClick={() => setActiveTab('checkout')}
        className={cn(
          "flex-1 flex flex-col justify-center px-6 h-full rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 relative",
          activeTab === 'checkout' && "bg-white dark:bg-[#2D2D2D] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white dark:hover:bg-[#2D2D2D]"
        )}
      >
        <span className="text-[10px] font-bold text-[#222222] dark:text-white/70 tracking-wider">CHECK OUT</span>
        <span className="text-sm font-bold text-[#222222] dark:text-white truncate">
          {dateRange?.to ? format(dateRange.to, 'MMM d') : 'Add dates'}
        </span>
      </div>

      <div className="w-[1px] h-8 bg-black/5 dark:bg-white/10" />

      {/* Guests */}
      <div
        onClick={() => setActiveTab('guests')}
        className={cn(
          "flex-[1.2] flex items-center justify-between pl-6 pr-2 h-full rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 relative",
          activeTab === 'guests' && "bg-white dark:bg-[#2D2D2D] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white dark:hover:bg-[#2D2D2D]"
        )}
      >
        <div className="flex flex-col justify-center truncate">
          <span className="text-[10px] font-bold text-[#222222] dark:text-white/70 tracking-wider">WHO</span>
          <span className="text-sm font-bold text-[#222222] dark:text-white truncate">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </span>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleSearch(); }}
          className="h-12 px-6 bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-full text-white font-bold flex items-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all ml-2"
        >
          <Search size={16} className="stroke-[3]" />
          <span>Search</span>
        </button>

        {activeTab === 'guests' && (
          <div className="absolute top-20 right-0 w-[350px] bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-2xl rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)] p-6 z-50 border border-black/5 dark:border-white/10">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3 className="font-bold text-[#222222] dark:text-white">Adults & Children</h3>
                <p className="text-xs font-medium text-[#717171] dark:text-[#A0A0A0]">Ages 2 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)) }}
                  className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[#717171] dark:text-[#A0A0A0] hover:border-[#FF385C] hover:text-[#FF385C] transition-colors"
                >
                  -
                </button>
                <span className="w-4 text-center font-bold text-[#222222] dark:text-white">{guests}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuests(guests + 1) }}
                  className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[#717171] dark:text-[#A0A0A0] hover:border-[#FF385C] hover:text-[#FF385C] transition-colors"
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
