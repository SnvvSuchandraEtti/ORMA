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
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] bg-white rounded-full shadow-[0_16px_32px_rgba(0,0,0,0.1)] border border-[#DDDDDD] flex items-center h-16 mt-2 z-50"
    >
      {/* Location */}
      <div 
        onClick={() => setActiveTab('location')}
        className={cn(
          "flex-1 flex flex-col justify-center px-8 h-full rounded-full cursor-pointer hover:bg-gray-100 transition-colors relative",
          activeTab === 'location' && "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-white"
        )}
      >
        <span className="text-[10px] font-bold text-[#222222] tracking-wider">WHERE</span>
        <input 
          type="text" 
          placeholder="Search destinations" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-[#222222] placeholder-[#717171] truncate w-full"
        />
        {activeTab === 'location' && (
          <div className="absolute top-20 left-0 w-[400px] bg-white rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] p-6 z-50">
            <h3 className="text-sm font-bold mb-4">Popular locations</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Goa', 'Mumbai', 'Bangalore', 'Delhi'].map(city => (
                <button
                  key={city}
                  onClick={() => { setLocation(city); setActiveTab('checkin') }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left"
                >
                  <MapPin size={20} className="text-[#DDDDDD]" />
                  <span className="text-sm">{city}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-[1px] h-8 bg-[#DDDDDD]" />

      {/* Check in */}
      <div
        onClick={() => setActiveTab('checkin')}
        className={cn(
          "flex-1 flex flex-col justify-center px-6 h-full rounded-full cursor-pointer hover:bg-gray-100 transition-colors relative",
          activeTab === 'checkin' && "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-white"
        )}
      >
        <span className="text-[10px] font-bold text-[#222222] tracking-wider">CHECK IN</span>
        <span className="text-sm text-[#717171] truncate">
          {dateRange?.from ? format(dateRange.from, 'MMM d') : 'Add dates'}
        </span>
        
        {/* Calendar Dropdown */}
        {(activeTab === 'checkin' || activeTab === 'checkout') && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] p-6 z-50">
            <style jsx global>{`
              .rdp { --rdp-cell-size: 48px; --rdp-accent-color: #222222; }
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: #222222; color: white; }
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

      <div className="w-[1px] h-8 bg-[#DDDDDD]" />

      {/* Check out */}
      <div
        onClick={() => setActiveTab('checkout')}
        className={cn(
          "flex-1 flex flex-col justify-center px-6 h-full rounded-full cursor-pointer hover:bg-gray-100 transition-colors relative",
          activeTab === 'checkout' && "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-white"
        )}
      >
        <span className="text-[10px] font-bold text-[#222222] tracking-wider">CHECK OUT</span>
        <span className="text-sm text-[#717171] truncate">
          {dateRange?.to ? format(dateRange.to, 'MMM d') : 'Add dates'}
        </span>
      </div>

      <div className="w-[1px] h-8 bg-[#DDDDDD]" />

      {/* Guests */}
      <div
        onClick={() => setActiveTab('guests')}
        className={cn(
          "flex-[1.2] flex items-center justify-between pl-6 pr-2 h-full rounded-full cursor-pointer hover:bg-gray-100 transition-colors relative",
          activeTab === 'guests' && "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-white"
        )}
      >
        <div className="flex flex-col justify-center truncate">
          <span className="text-[10px] font-bold text-[#222222] tracking-wider">WHO</span>
          <span className="text-sm text-[#717171] truncate">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </span>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleSearch(); }}
          className="h-12 px-6 bg-[#FF385C] rounded-full text-white font-semibold flex items-center gap-2 hover:bg-[#E31C5F] transition-colors ml-2"
        >
          <Search size={16} className="stroke-[3]" />
          <span>Search</span>
        </button>

        {activeTab === 'guests' && (
          <div className="absolute top-20 right-0 w-[350px] bg-white rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] p-6 z-50">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3 className="font-semibold text-[#222222]">Adults & Children</h3>
                <p className="text-sm text-[#717171]">Ages 2 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)) }}
                  className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222]"
                >
                  -
                </button>
                <span className="w-4 text-center">{guests}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuests(guests + 1) }}
                  className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222]"
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
