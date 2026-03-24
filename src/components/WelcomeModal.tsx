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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-[#1E1E1E] w-full sm:max-w-md rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Aesthetic highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FF385C]/10 to-transparent rounded-full blur-[60px] pointer-events-none" />

            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 bg-[#FF385C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#222222] dark:text-white mb-2">
                Welcome to ORMA
              </h2>
              <p className="text-[#717171] dark:text-[#A0A0A0] font-medium">
                Rent Anything. From Anyone. Anywhere.
              </p>
            </div>

            <div className="space-y-4 relative z-10 mb-8">
              <p className="text-sm font-bold text-[#222222] dark:text-white text-center mb-4 uppercase tracking-wider">
                What brings you here?
              </p>
              
              <button
                onClick={handleRent}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-white dark:hover:bg-[#2A2A2A] hover:border-[#FF385C]/30 hover:shadow-[0_8px_24px_rgba(255,56,92,0.12)] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Search size={20} className="text-blue-500" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-[#222222] dark:text-white">I want to RENT something</span>
                  <span className="text-xs text-[#717171] dark:text-gray-400">Browse categories and find items</span>
                </div>
              </button>

              <button
                onClick={handleList}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-white dark:hover:bg-[#2A2A2A] hover:border-[#E31C5F]/30 hover:shadow-[0_8px_24px_rgba(227,28,95,0.12)] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-xl">💰</span>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-[#222222] dark:text-white">I want to LIST items</span>
                  <span className="text-xs text-[#717171] dark:text-gray-400">Earn money from idle items</span>
                </div>
              </button>

              <button
                onClick={handleClose}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-white dark:hover:bg-[#2A2A2A] hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gray-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Eye size={20} className="text-gray-500" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-[#222222] dark:text-white">Just browsing</span>
                  <span className="text-xs text-[#717171] dark:text-gray-400">Explore without a specific goal</span>
                </div>
              </button>
            </div>

            <div className="border-t border-black/5 dark:border-white/5 pt-4 text-center">
              <p className="text-[10px] text-[#717171] dark:text-gray-500 font-bold uppercase tracking-widest">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
