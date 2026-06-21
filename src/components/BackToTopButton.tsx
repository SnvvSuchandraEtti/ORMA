'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button if page is scrolled down 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-[80px] md:bottom-8 right-4 md:right-8 z-50"
        >
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#0071E3] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-[#0055B3] hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-[#0071E3] focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
