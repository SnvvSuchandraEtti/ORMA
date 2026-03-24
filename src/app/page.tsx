'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PackageOpen, Plus, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import ListingCard from '@/components/ListingCard'
import EngagementBanner from '@/components/EngagementBanner'
import FloatingMapButton from '@/components/FloatingMapButton'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useAuth } from '@/hooks/useAuth'
import { useInfiniteListings } from '@/hooks/useInfiniteListings'
import { useUserLocation } from '@/hooks/useUserLocation'
import { handleSupabaseError } from '@/lib/handleError'
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger'
import BackToTopButton from '@/components/BackToTopButton'
import RecentlyViewedSection from '@/components/home-sections/RecentlyViewedSection'
import PopularSection from '@/components/home-sections/PopularSection'
import CategoryGridSection from '@/components/home-sections/CategoryGridSection'
import HowItWorksSection from '@/components/home-sections/HowItWorksSection'
import CtaBannerSection from '@/components/home-sections/CtaBannerSection'
import StatsCounterSection from '@/components/home-sections/StatsCounterSection'
import AuthModal from '@/components/AuthModal'

function HomeContent() {
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set())
  const [authOpen, setAuthOpen] = useState(false)
  const [showSignupTooltip, setShowSignupTooltip] = useState(false)
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')
  const { user } = useAuth()
  const supabase = createClient()
  const { city, loading: locationLoading, permissionDenied, requestLocation, setManualCity } = useUserLocation()

  const { listings, isLoading, isLoadingMore, hasMore, loadMore } = useInfiniteListings({
    category: categorySlug || undefined,
    city: city || undefined,
  })

  const fetchWishlists = useCallback(async () => {
    if (!user) return
    try {
      const { data } = await supabase
        .from('wishlists')
        .select('listing_id')
        .eq('user_id', user.id)
      if (data) {
        setWishlistedIds(new Set(data.map((w: { listing_id: string }) => w.listing_id)))
      }
    } catch (err) {
      console.error('Error fetching wishlists:', err)
      handleSupabaseError(err, 'fetchWishlists')
    }
  }, [user, supabase])



  useEffect(() => {
    fetchWishlists()
  }, [fetchWishlists])

  // Check for new signup tooltip
  useEffect(() => {
    const isNewSignup = localStorage.getItem('orma_new_signup')
    if (isNewSignup) {
      setShowSignupTooltip(true)
      localStorage.removeItem('orma_new_signup') // Only show once
      
      const timer = setTimeout(() => {
        setShowSignupTooltip(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleWishlistToggle = useCallback((listingId: string) => {
    setWishlistedIds(prev => {
      const next = new Set(prev)
      if (next.has(listingId)) next.delete(listingId)
      else next.add(listingId)
      return next
    })
  }, [])

  const handleOpenAuth = useCallback(() => setAuthOpen(true), [])

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10 xl:px-20 py-6">
      
      {/* Location Header */}
      {!isLoading && !categorySlug && (
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 relative">
          
          <AnimatePresence>
            {showSignupTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute -top-14 left-0 z-20 bg-black text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 border border-white/10"
              >
                <span>💡 Tip: Click the <Heart size={14} className="inline-block mx-0.5 text-[#FF385C]" fill="currentColor" /> icon on any listing to save it to your wishlist!</span>
                <button 
                  onClick={() => setShowSignupTooltip(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors ml-2"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#222222] dark:text-white tracking-tight">
              {city ? `Rentals in ${city}` : 'Rentals Near You'}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-[#717171] dark:text-[#A0A0A0]">
                {city ? 'Showing local listings' : 'Discover items around you'}
              </span>
              {city && (
                <button
                  onClick={() => setManualCity('')} // Temp clear to show dropdown
                  className="text-sm font-bold text-[#FF385C] hover:underline"
                >
                  Change Location
                </button>
              )}
              {!city && !locationLoading && !permissionDenied && (
                <button
                  onClick={requestLocation}
                  className="text-sm font-bold text-[#FF385C] hover:underline"
                >
                  Use my location
                </button>
              )}
            </div>
          </div>
          
          {(permissionDenied || (!city && !locationLoading && !permissionDenied)) && (
            <div className="relative">
              <select
                className="appearance-none bg-white dark:bg-[#1E1E1E] border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-[#222222] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                onChange={(e) => {
                  if (e.target.value) setManualCity(e.target.value)
                }}
                value={city || ''}
              >
                <option value="" disabled>Select your city...</option>
                {['Hyderabad', 'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Delhi', 'Kolkata', 'Jaipur', 'Kochi', 'Ahmedabad'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#717171]"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Engagement Banner Area */}
      <EngagementBanner />

      {isLoading ? (
        <SkeletonGrid count={8} />
      ) : listings.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50/50 dark:bg-white/[0.02] rounded-3xl border border-black/[0.03] dark:border-white/[0.03] px-6">
          <div className="w-20 h-20 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl shadow-black/5 flex items-center justify-center mb-6 border border-black/[0.05] dark:border-white/[0.05]">
            <PackageOpen size={40} className="text-[#FF385C]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3">
            {categorySlug ? 'Taking a short break' : 'No items found yet'}
          </h2>
          <p className="text-[#717171] dark:text-[#A0A0A0] mb-8 max-w-sm leading-relaxed text-base">
            {categorySlug
              ? "We couldn't find any items in this category right now. Try exploring something else or check back later!"
              : "Be the first to list an item on ORMA and start reaching your community today."}
          </p>
          <Link
            href="/list-your-item"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(227,28,95,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-[#FF385C]/20"
          >
            <Plus size={20} />
            List Your Item
          </Link>
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
        >
          {listings.map((listing, idx) => (
            <motion.div
              key={listing.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
              }}
            >
              <ListingCard
                listing={listing}
                priority={idx < 4}
                isWishlisted={wishlistedIds.has(listing.id)}
                onWishlistToggle={handleWishlistToggle}
                onOpenAuth={handleOpenAuth}
              />
            </motion.div>
          ))}
          </motion.div>
          <InfiniteScrollTrigger
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={loadMore}
          />
        </>
      )}

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <FloatingMapButton />
      <BackToTopButton />
      
      {/* Dynamic Sections */}
      {!isLoading && listings.length > 0 && (
        <div className="mt-20">
          <RecentlyViewedSection />
          <PopularSection />
          <CategoryGridSection />
          <HowItWorksSection />
          <CtaBannerSection />
          <StatsCounterSection />
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="max-w-[1760px] mx-auto px-4 md:px-6 py-6"><SkeletonGrid count={8} /></div>}>
      <HomeContent />
    </Suspense>
  )
}
