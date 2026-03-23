'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PackageOpen, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import ListingCard from '@/components/ListingCard'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useAuth } from '@/hooks/useAuth'

function HomeContent() {
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')
  const { user } = useAuth()
  const supabase = createClient()

  const fetchListings = useCallback(async () => {
    setIsLoading(true)
    try {
      let query = supabase
        .from('listings')
        .select(`
          *,
          owner:profiles(*),
          category:categories(*)
        `)
        .eq('status', 'active')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(40)

      if (categorySlug) {
        // Get category id first
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single()
        if (catData) {
          query = query.eq('category_id', catData.id)
        }
      }

      const { data, error } = await query
      if (error) throw error
      setListings((data as ListingWithDetails[]) || [])
    } catch (err) {
      console.error('Error fetching listings:', err)
    } finally {
      setIsLoading(false)
    }
  }, [categorySlug, supabase])

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
    }
  }, [user, supabase])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  useEffect(() => {
    fetchWishlists()
  }, [fetchWishlists])

  const handleWishlistToggle = (listingId: string) => {
    setWishlistedIds(prev => {
      const next = new Set(prev)
      if (next.has(listingId)) next.delete(listingId)
      else next.add(listingId)
      return next
    })
  }

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10 xl:px-20 py-6">
      {isLoading ? (
        <SkeletonGrid count={8} />
      ) : listings.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageOpen size={64} className="text-[#B0B0B0] mb-4" />
          <h2 className="text-2xl font-semibold text-[#222222] mb-2">
            No items available yet
          </h2>
          <p className="text-[#717171] mb-6 max-w-sm">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isWishlisted={wishlistedIds.has(listing.id)}
              onWishlistToggle={handleWishlistToggle}
              onOpenAuth={() => setAuthOpen(true)}
            />
          ))}
        </div>
      )}

      {/* Auth modal trigger */}
      {authOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setAuthOpen(false)}
        />
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
