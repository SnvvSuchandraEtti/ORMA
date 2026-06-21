'use client'

import { Map } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import MapModal from '@/components/MapModal'

export default function FloatingMapButton() {
  // Temporarily disabled based on request
  return null

  /*
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [showMap, setShowMap] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    // Only hide if we scroll past ~200px and are scrolling down
    const previous = scrollY.getPrevious() || 0
    if (current > 200 && current > previous) {
      if (!showMap) setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  })

  return (
    <>
      <div className="fixed bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-30">
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => setShowMap(true)}
          className="flex items-center gap-2 px-5 py-3.5 bg-[#222222] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-105 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all font-semibold text-sm"
        >
          <span>Show map</span>
          <Map size={18} className="text-white" />
        </motion.button>
      </div>

      <MapModal isOpen={showMap} onClose={() => setShowMap(false)} />
    </>
  )
  */
}
