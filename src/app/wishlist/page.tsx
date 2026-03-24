'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, PackageOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import ListingCard from '@/components/ListingCard'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'
import toast from '@/lib/toast'
import { handleSupabaseError } from '@/lib/handleError'
import Link from 'next/link'

function WishlistContent() {
  const [wishlisted, setWishlisted] = useState<ListingWithDetails[]>([])
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchWishlist = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('listing_id, listing:listings(*, owner:profiles(*), category:categories(*))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      const listings = (data as unknown as Array<{ listing: ListingWithDetails }>)
        .map((w) => w.listing)
        .filter(Boolean) as ListingWithDetails[]
      setWishlisted(listings)
      setWishlistedIds(new Set(listings.map(l => l.id)))
    } catch (err) {
      handleSupabaseError(err, 'fetchWishlist')
    } finally {
      setIsLoading(false)
    }
  }, [user, supabase])

  useEffect(() => { fetchWishlist() }, [fetchWishlist])

  const handleWishlistToggle = (listingId: string) => {
    setWishlisted(prev => prev.filter(l => l.id !== listingId))
    setWishlistedIds(prev => { const next = new Set(prev); next.delete(listingId); return next })
  }

  const handleOpenAuth = () => setAuthOpen(true)

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10 xl:px-20 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#222222] dark:bg-white flex items-center justify-center shadow-lg shadow-black/5">
              <Heart size={20} className="text-white dark:text-black fill-current" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#222222] dark:text-white tracking-tight">Your Wishlist</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {wishlisted.length > 0 
              ? `You have saved ${wishlisted.length} ${wishlisted.length === 1 ? 'item' : 'items'} for later.`
              : 'Keep track of items you\'re interested in renting.'}
          </p>
        </div>
        
        {wishlisted.length > 0 && (
          <div className="flex items-center gap-2 p-1 bg-gray-100/50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 w-fit">
            <div className="px-4 py-2 font-bold text-[#222222] dark:text-white text-sm">
              {wishlisted.length} SAVED
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <SkeletonGrid count={8} />
      ) : wishlisted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50/50 dark:bg-white/[0.02] rounded-3xl border border-black/[0.03] dark:border-white/[0.03] px-6">
          <div className="w-20 h-20 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl shadow-black/5 flex items-center justify-center mb-6 border border-black/[0.05] dark:border-white/[0.05]">
            <PackageOpen size={40} className="text-[#FF385C]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3 tracking-tight">Your wishlist is empty</h2>
          <p className="text-[#717171] dark:text-[#A0A0A0] mb-8 max-w-sm leading-relaxed">
            Hit the ❤️ on any listing to save it here. Start exploring and build your collection!
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(227,28,95,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-[#FF385C]/20"
          >
            Explore Listings
          </Link>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
        >
          {wishlisted.map((listing, idx) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <ListingCard
                listing={listing}
                isWishlisted={wishlistedIds.has(listing.id)}
                onWishlistToggle={handleWishlistToggle}
                onOpenAuth={handleOpenAuth}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <WishlistContent />
    </ProtectedRoute>
  )
}
