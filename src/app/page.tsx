'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PackageOpen, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import ListingCard from '@/components/ListingCard'
import FloatingMapButton from '@/components/FloatingMapButton'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useAuth } from '@/hooks/useAuth'
import { useInfiniteListings } from '@/hooks/useInfiniteListings'
import { handleSupabaseError } from '@/lib/handleError'
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger'
import BackToTopButton from '@/components/BackToTopButton'
import RecentlyViewedSection from '@/components/home-sections/RecentlyViewedSection'
import PopularSection from '@/components/home-sections/PopularSection'
import CategoryGridSection from '@/components/home-sections/CategoryGridSection'
import HowItWorksSection from '@/components/home-sections/HowItWorksSection'
import CtaBannerSection from '@/components/home-sections/CtaBannerSection'

function HomeContent() {
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set())
  const [authOpen, setAuthOpen] = useState(false)
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')
  const { user } = useAuth()
  const supabase = createClient()

  const { listings, isLoading, isLoadingMore, hasMore, loadMore } = useInfiniteListings({
    category: categorySlug || undefined,
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
      {isLoading ? (
        <SkeletonGrid count={8} />
      ) : listings.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageOpen size={64} className="text-[#B0B0B0] mb-4" />
          <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-2">
            No items available yet
          </h2>
          <p className="text-[#717171] dark:text-[#A0A0A0] mb-6 max-w-sm">
            {categorySlug
              ? 'No items in this category right now. Check back soon or explore other categories!'
              : 'Be the first to list an item on ORMA!'}
          </p>
          <Link
            href="/list-your-item"
            className="flex items-center gap-2 px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors"
          >
            <Plus size={18} />
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

      {/* Auth modal trigger */}
      {authOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setAuthOpen(false)}
        />
      )}
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
