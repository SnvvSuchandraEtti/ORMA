'use client'

import { useEffect, useState, useCallback } from 'react'
import { Heart, PackageOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import ListingCard from '@/components/ListingCard'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'
import toast from 'react-hot-toast'
import Link from 'next/link'

function WishlistContent() {
  const [wishlisted, setWishlisted] = useState<ListingWithDetails[]>([])
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
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
      console.error(err)
      toast.error('Failed to load wishlist')
    } finally {
      setIsLoading(false)
    }
  }, [user, supabase])

  useEffect(() => { fetchWishlist() }, [fetchWishlist])

  const handleWishlistToggle = (listingId: string) => {
    setWishlisted(prev => prev.filter(l => l.id !== listingId))
    setWishlistedIds(prev => { const next = new Set(prev); next.delete(listingId); return next })
  }

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10 xl:px-20 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Heart size={24} className="text-[#FF385C] fill-[#FF385C]" />
        <h1 className="text-2xl font-semibold text-[#222222]">Your Wishlist</h1>
        {wishlisted.length > 0 && (
          <span className="text-[#717171] text-sm">({wishlisted.length} items)</span>
        )}
      </div>

      {isLoading ? (
        <SkeletonGrid count={4} />
      ) : wishlisted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageOpen size={56} className="text-[#B0B0B0] mb-4" />
          <h2 className="text-xl font-semibold text-[#222222] mb-2">No saved items</h2>
          <p className="text-[#717171] mb-6 max-w-sm">
            Hit the ❤️ on any listing to save it here. Find your perfect rental first!
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-xl hover:bg-[#E31C5F] transition-colors"
          >
            Explore Listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlisted.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isWishlisted={wishlistedIds.has(listing.id)}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
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
