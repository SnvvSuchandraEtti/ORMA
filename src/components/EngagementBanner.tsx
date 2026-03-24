'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, User, X } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'

type BannerType = 'wishlist' | 'list_items' | 'complete_profile' | null

export default function EngagementBanner() {
  const [activeBanner, setActiveBanner] = useState<BannerType>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { user, profile } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    // Check dismissal status
    const checkBanners = async () => {
      const dismissedUntil = localStorage.getItem('orma_banner_dismissed_until')
      if (dismissedUntil && new Date().getTime() < parseInt(dismissedUntil)) {
        return // Hidden for 24 hours
      }

      // Priority 1: Complete Profile (Logged in, missing bio or avatar)
      if (user && profile && (!profile.bio || !profile.avatar_url)) {
        setActiveBanner('complete_profile')
        setIsVisible(true)
        return
      }

      // Priority 2: Create Listing (Logged in, 0 listings)
      if (user) {
        const { count, error } = await supabase
          .from('listings')
          .select('*', { count: 'exact', head: true })
          .eq('owner_id', user.id)
        
        if (!error && count === 0) {
          setActiveBanner('list_items')
          setIsVisible(true)
          return
        }
      }

      // Priority 3: Wishlist Prompt (Viewed >= 5 listings without saving)
      const views = parseInt(localStorage.getItem('orma_listings_viewed') || '0')
      let hasWishlist = false
      if (user) {
        const { count } = await supabase
          .from('wishlists')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
        hasWishlist = (count || 0) > 0
      } else {
        // For anon users, maybe we don't have local wishlist, assume false
      }

      if (views >= 5 && !hasWishlist) {
        setActiveBanner('wishlist')
        setIsVisible(true)
        return
      }
    }

    checkBanners()
  }, [user, profile, supabase])

  const handleDismiss = () => {
    setIsVisible(false)
    // Hide for 24 hours
    const hideUntil = new Date().getTime() + 24 * 60 * 60 * 1000
    localStorage.setItem('orma_banner_dismissed_until', hideUntil.toString())
  }

  if (!activeBanner) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="mb-6 overflow-hidden"
        >
          <div className="bg-[#F8F9FA] dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#333333] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
            
            {activeBanner === 'wishlist' && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF385C]/10 flex items-center justify-center flex-shrink-0">
                  <Heart size={18} className="text-[#FF385C]" fill="currentColor" />
                </div>
                <p className="text-sm text-[#222222] dark:text-white font-medium">
                  Found something you like? Save it to your wishlist so you don't lose it!
                </p>
              </div>
            )}

            {activeBanner === 'list_items' && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💰</span>
                </div>
                <p className="text-sm text-[#222222] dark:text-white font-medium">
                  Have items sitting idle? List them on ORMA and start earning today!
                </p>
              </div>
            )}

            {activeBanner === 'complete_profile' && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-blue-500" />
                </div>
                <p className="text-sm text-[#222222] dark:text-white font-medium">
                  Complete your profile to build trust with renters and owners.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 w-full sm:w-auto relative z-10">
              {activeBanner === 'list_items' && (
                <Link
                  href="/list-your-item"
                  className="px-4 py-2 bg-[#FF385C] text-white text-xs font-bold rounded-lg hover:bg-[#D90B38] transition-colors whitespace-nowrap"
                >
                  List Now
                </Link>
              )}
              {activeBanner === 'complete_profile' && (
                <Link
                  href="/profile"
                  className="px-4 py-2 bg-[#222222] dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  Complete Profile
                </Link>
              )}
              
              <button
                onClick={handleDismiss}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#717171] dark:text-[#A0A0A0] hover:text-[#222222] dark:hover:text-white transition-colors"
              >
                {activeBanner === 'list_items' ? 'Later' : 'Dismiss'}
                {activeBanner !== 'list_items' && <X size={14} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
