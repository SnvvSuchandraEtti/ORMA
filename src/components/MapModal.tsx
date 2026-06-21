'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Navigation, Filter, MapPin, Search } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MapModal({ isOpen, onClose }: MapModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const mapPins = [
    { id: 1, label: '₹1.5k', top: '35%', left: '42%', active: false },
    { id: 2, label: '₹800', top: '48%', left: '55%', active: true },
    { id: 3, label: '₹2.1k', top: '25%', left: '62%', active: false },
    { id: 4, label: '₹400', top: '65%', left: '38%', active: false },
    { id: 5, label: '₹1.2k', top: '58%', left: '72%', active: false },
    { id: 6, label: '₹3.5k', top: '75%', left: '52%', active: false },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:max-w-6xl md:h-[85vh] md:rounded-[2.5rem] bg-[#F7F7F7] dark:bg-[#121212] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header overlay for mobile/desktop */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6 pointer-events-none">
              <div className="flex gap-2 pointer-events-auto">
                <button 
                  onClick={onClose}
                  className="w-12 h-12 rounded-full bg-white dark:bg-[#1A1A1A] flex items-center justify-center shadow-lg border border-black/5 dark:border-white/5 hover:scale-105 transition-transform"
                >
                  <X size={20} className="text-[#222222] dark:text-white" />
                </button>
              </div>
              <div className="flex gap-2 pointer-events-auto shadow-lg bg-white dark:bg-[#1A1A1A] rounded-full p-1.5 border border-black/5 dark:border-white/5">
                 <div className="flex items-center gap-2 px-4 h-9">
                   <Search size={16} className="text-[#717171]" />
                   <span className="text-sm font-semibold text-[#222222] dark:text-white">Search map area</span>
                 </div>
                 <button className="w-9 h-9 rounded-full bg-[#F7F7F7] dark:bg-[#2D2D2D] flex items-center justify-center">
                   <Filter size={16} className="text-[#222222] dark:text-white" />
                 </button>
              </div>
            </div>

            {/* Mocked Map Canvas */}
            <div className="flex-1 relative w-full h-full bg-[#EBEBEB] dark:bg-[#1A1A1A]">
              {/* Abstract Map Lines Background */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle cx="50%" cy="50%" r="30%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                <circle cx="50%" cy="50%" r="60%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                <path d="M0,500 C300,400 600,600 1000,200" fill="none" stroke="currentColor" strokeWidth="15" className="opacity-20" />
                <path d="M0,200 C400,300 800,100 1200,400" fill="none" stroke="currentColor" strokeWidth="8" className="opacity-10" />
              </svg>

              {/* Map Pins */}
              {mapPins.map((pin) => (
                <div 
                  key={pin.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className={`px-4 py-2.5 rounded-[1.25rem] font-bold text-sm shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all ${
                    pin.active 
                      ? 'bg-black dark:bg-white text-white dark:text-black scale-110 z-20' 
                      : 'bg-white dark:bg-[#2A2A2A] text-[#222222] dark:text-white hover:scale-105 hover:z-10'
                  }`}>
                    {pin.label}
                  </div>
                  {/* Pin Point */}
                  <div className={`w-3 h-3 absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 ${
                    pin.active ? 'bg-black dark:bg-white' : 'bg-white dark:bg-[#2A2A2A]'
                  }`} />
                </div>
              ))}

              {/* User Location Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute" />
                <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-[#1A1A1A] relative z-10 shadow-lg" />
              </div>
            </div>

            {/* Bottom Actions overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
              <button 
                onClick={onClose}
                className="pointer-events-auto flex items-center gap-2 px-6 py-3.5 bg-[#222222] dark:bg-white text-white dark:text-[#222222] rounded-full font-semibold shadow-xl hover:scale-105 transition-all"
              >
                <span>Search in this area</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
