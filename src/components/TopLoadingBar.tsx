'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function TopLoadingBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Every time the URL changes, we trigger the loading bar animation
    setIsVisible(true)
    setKey(prev => prev + 1)

    // Auto-hide the bar after the animation completes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 600) // matches the duration of the animation

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={key}
          initial={{ x: '-100%', opacity: 1 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-[#0071E3] z-[100] origin-left"
        >
          {/* Subtle glow effect at the leading edge */}
          <div className="absolute right-0 top-0 h-full w-[100px] bg-white opacity-40 blur-[2px]" />
          <div className="absolute right-0 top-0 h-full w-4 bg-white opacity-60 blur-[1px]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
