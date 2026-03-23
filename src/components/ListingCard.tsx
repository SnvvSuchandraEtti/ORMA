'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import type { ListingWithDetails } from '@/types'
import { getRentalPriceDisplay, getInitials } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface ListingCardProps {
  listing: ListingWithDetails
  isWishlisted?: boolean
  onWishlistToggle?: (listingId: string) => void
  onOpenAuth?: () => void
}

export default function ListingCard({
  listing,
  isWishlisted = false,
  onWishlistToggle,
  onOpenAuth,
}: ListingCardProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [showArrows, setShowArrows] = useState(false)
  const [wishlisted, setWishlisted] = useState(isWishlisted)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const { isAuthenticated } = useAuth()
  const supabase = createClient()

  const images = listing.images?.length ? listing.images : ['/placeholder.jpg']

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIdx(i => (i + 1) % images.length)
  }

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIdx(i => (i - 1 + images.length) % images.length)
  }

  const handleWishlist = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      onOpenAuth?.()
      return
    }

    // Optimistic update
    const prev = wishlisted
    setWishlisted(!prev)
    setWishlistLoading(true)

    try {
      if (prev) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('listing_id', listing.id)
        if (error) throw error
        toast.success('Removed from wishlist')
      } else {
        // Add to wishlist
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')
        const { error } = await supabase
          .from('wishlists')
          .insert({ listing_id: listing.id, user_id: user.id })
        if (error) throw error
        toast.success('Saved to wishlist ❤️')
      }
      onWishlistToggle?.(listing.id)
    } catch {
      // Revert on error
      setWishlisted(prev)
      toast.error('Something went wrong')
    } finally {
      setWishlistLoading(false)
    }
  }, [isAuthenticated, wishlisted, listing.id, onOpenAuth, onWishlistToggle, supabase])

  return (
    <Link href={`/listing/${listing.id}`} className="group block cursor-pointer">
      {/* Image Container */}
      <div
        className="relative overflow-hidden rounded-xl aspect-card bg-gray-100"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <Image
          src={images[currentImageIdx]}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className="absolute top-3 right-3 z-10 p-1.5 hover:scale-110 transition-transform"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={22}
            className={`drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors ${
              wishlisted
                ? 'fill-[#FF385C] stroke-[#FF385C]'
                : 'fill-black/20 stroke-white'
            }`}
          />
        </button>

        {/* Verified Badge */}
        {listing.owner?.is_verified && (
          <div className="absolute bottom-3 left-3 z-10 bg-white text-[#222222] text-[10px] font-bold px-2 py-0.5 rounded-full">
            VERIFIED
          </div>
        )}

        {/* Image Navigation (only show if multiple images) */}
        {images.length > 1 && (
          <>
            {/* Arrows */}
            {showArrows && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Next image"
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.preventDefault(); setCurrentImageIdx(idx) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIdx ? 'bg-white scale-110' : 'bg-white/60'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Text */}
      <div className="mt-2.5 space-y-0.5">
        {/* Location */}
        <p className="font-semibold text-[15px] text-[#222222] line-clamp-1">
          {[listing.city, listing.state].filter(Boolean).join(', ')}
        </p>
        {/* Title */}
        <p className="text-[14px] text-[#717171] line-clamp-1">{listing.title}</p>
        {/* Category */}
        <p className="text-[13px] text-[#B0B0B0]">{listing.category?.name}</p>
        {/* Price & Rating */}
        <div className="flex items-center justify-between pt-0.5">
          <p className="font-semibold text-[15px] text-[#222222]">
            {getRentalPriceDisplay(listing)}
          </p>
          {listing.total_reviews > 0 && (
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-[#222222] stroke-[#222222]" />
              <span className="text-[13px] text-[#222222]">
                {listing.average_rating.toFixed(1)}
              </span>
              <span className="text-[13px] text-[#717171]">
                ({listing.total_reviews})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Owner hint for accessibility */}
      <span className="sr-only">
        Listed by {listing.owner?.full_name || getInitials(listing.owner?.full_name)}
      </span>
    </Link>
  )
}
