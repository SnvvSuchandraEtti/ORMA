'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if first visit
    const visited = localStorage.getItem('orma_visited')
    if (!visited) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('orma_visited', 'true')
    setIsOpen(false)
  }

  const handleRent = () => {
    handleClose()
    router.push('/')
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('orma:focus-search'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 220)
  }

  const handleList = () => {
    handleClose()
    router.push('/list-your-item')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/48 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-[#1C1C1E] w-full sm:max-w-md rounded-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] p-6 sm:p-8 z-10 overflow-hidden"
          >
            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-2">
                Welcome to ORMA
              </h2>
              <p className="text-[#6E6E73] dark:text-[#98989D] font-normal text-[17px]">
                Rent Anything. From Anyone. Anywhere.
              </p>
            </div>

            <div className="space-y-4 relative z-10 mb-8">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-white text-center mb-4 uppercase tracking-wider">
                What brings you here?
              </p>
              
              <button
                onClick={handleRent}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-[#D2D2D7] dark:border-[#38383A] bg-white dark:bg-[#2C2C2E] hover:border-[#0071E3] hover:bg-[#F5F9FF] dark:hover:bg-[#38383A] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#0071E3]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Search size={20} className="text-[#0071E3]" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-[#1D1D1F] dark:text-white">I want to RENT something</span>
                  <span className="text-xs text-[#6E6E73] dark:text-[#98989D]">Browse categories and find items</span>
                </div>
              </button>

              <button
                onClick={handleList}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-[#D2D2D7] dark:border-[#38383A] bg-white dark:bg-[#2C2C2E] hover:border-[#0071E3] hover:bg-[#F5F9FF] dark:hover:bg-[#38383A] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#28CD41]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-xl">💰</span>
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-[#1D1D1F] dark:text-white">I want to LIST items</span>
                  <span className="text-xs text-[#6E6E73] dark:text-[#98989D]">Earn money from idle items</span>
                </div>
              </button>

              <button
                onClick={handleClose}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-[#D2D2D7] dark:border-[#38383A] bg-white dark:bg-[#2C2C2E] hover:border-[#6E6E73] hover:bg-[#F5F5F7] dark:hover:bg-[#38383A] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#86868B]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Eye size={20} className="text-[#86868B]" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-[#1D1D1F] dark:text-white">Just browsing</span>
                  <span className="text-xs text-[#6E6E73] dark:text-[#98989D]">Explore without a specific goal</span>
                </div>
              </button>
            </div>

            <div className="border-t border-[#E8E8ED] dark:border-[#38383A] pt-4 text-center">
              <p className="text-[12px] text-[#86868B]">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
