'use client'

import { useState, useCallback, useEffect, useRef, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import type { ListingWithDetails } from '@/types'
import { getRentalPriceDisplay, getInitials } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import toast from '@/lib/toast'

interface ListingCardProps {
  listing: ListingWithDetails
  isWishlisted?: boolean
  onWishlistToggle?: (id: string) => void
  priority?: boolean
  onOpenAuth?: () => void
}

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4='

const ListingCard = memo(function ListingCard({
  listing,
  isWishlisted: initialWishlisted,
  onWishlistToggle,
  onOpenAuth,
  priority = false,
}: ListingCardProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [showArrows, setShowArrows] = useState(false)
  const [wishlisted, setWishlisted] = useState(initialWishlisted)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef<number>(0)
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)
  const { isAuthenticated } = useAuth()
  const supabase = createClient()

  const images = listing.images?.length ? listing.images : ['/placeholder.jpg']

  /* Preload next & previous images */
  useEffect(() => {
    if (images.length < 2) return
    const nextIndex = (currentImageIdx + 1) % images.length
    const prevIndex = (currentImageIdx - 1 + images.length) % images.length
    ;[images[nextIndex], images[prevIndex]].forEach((url) => {
      const img = new window.Image()
      img.src = url
    })
  }, [currentImageIdx, images])

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIdx((i) => (i + 1) % images.length)
  }

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIdx((i) => (i - 1 + images.length) % images.length)
  }

  /* Touch-swipe support */
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX
    touchDeltaX.current = 0
    isDragging.current = true
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const delta = event.targetTouches[0].clientX - touchStartX.current
    touchDeltaX.current = delta
    setDragOffset(delta)
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = false
    setDragOffset(0)

    if (images.length < 2 || touchStartX.current === null) return

    const distance = touchDeltaX.current
    const minSwipeDistance = 45

    if (Math.abs(distance) < minSwipeDistance) return

    event.preventDefault()
    if (distance < 0) {
      setCurrentImageIdx((i) => (i + 1) % images.length)
    } else {
      setCurrentImageIdx((i) => (i - 1 + images.length) % images.length)
    }
  }

  const handleWishlist = useCallback(
    async (e: React.MouseEvent) => {
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
          const { error } = await supabase.from('wishlists').delete().eq('listing_id', listing.id)
          if (error) throw error
          toast.success('Removed from wishlist')
        } else {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (!user) throw new Error('Not authenticated')
          const { error } = await supabase
            .from('wishlists')
            .insert({ listing_id: listing.id, user_id: user.id })
          if (error) throw error
          toast.success('Saved to wishlist ❤️')
        }
        onWishlistToggle?.(listing.id)
      } catch {
        setWishlisted(prev)
        toast.error('Something went wrong')
      } finally {
        setWishlistLoading(false)
      }
    },
    [isAuthenticated, wishlisted, listing.id, onOpenAuth, onWishlistToggle, supabase]
  )

  return (
    <article aria-label={`${listing.title} - rental listing`}>
    <Link href={`/listing/${listing.id}`} className="group block cursor-pointer">
      {/* Image Container */}
      <div
        className="relative overflow-hidden rounded-xl aspect-[20/19] bg-[#EBEBEB] dark:bg-[#2D2D2D]"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding image track */}
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(calc(-${currentImageIdx * 100}% + ${isDragging.current ? dragOffset : 0}px))`,
            transition: isDragging.current ? 'none' : 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {images.map((img, idx) => (
            <div key={img + idx} className="relative h-full w-full flex-shrink-0">
              <Image
                src={img}
                alt={`${listing.title} - rental listing photo ${idx + 1}`}
                fill
                priority={priority && idx === 0}
                loading={idx === 0 ? undefined : 'lazy'}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />

        {/* Image counter badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white tabular-nums backdrop-blur-sm">
            {currentImageIdx + 1}/{images.length}
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className="absolute top-3 right-3 z-10 p-1.5 hover:scale-110 transition-transform"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={24}
            className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-colors ${
              wishlisted
                ? 'fill-[#FF385C] stroke-[#xFF385C]'
                : 'fill-black/50 stroke-white stroke-[1.5]'
            }`}
          />
        </button>

        {/* Verified Badge */}
        {listing.owner?.is_verified && (
          <div className="absolute bottom-3 right-3 z-10 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#222222] dark:bg-[#1E1E1E] dark:text-white">
            VERIFIED
          </div>
        )}

        {/* Image Navigation Arrows */}
        {images.length > 1 && showArrows && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white dark:bg-[#121212] text-[#222222] dark:text-white rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Previous image"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white dark:bg-[#121212] text-[#222222] dark:text-white rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Next image"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImageIdx(idx)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  idx === currentImageIdx ? 'bg-white scale-125' : 'bg-white/60'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Text */}
      <div className="flex flex-col mt-3">
        <div className="flex justify-between items-start">
          <h3 className="text-[15px] font-medium text-[#222222] dark:text-white leading-tight truncate pr-4">
            {listing.city || 'Anywhere'}
          </h3>
          {listing.average_rating > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star size={12} className="fill-[#222222] dark:fill-white text-[#222222] dark:text-white" />
              <span className="text-[14px] text-[#222222] dark:text-white">
                {listing.average_rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <p className="text-[15px] text-[#717171] dark:text-[#A0A0A0] truncate mt-0.5">
          {listing.title}
        </p>
        <p className="text-[15px] text-[#717171] dark:text-[#A0A0A0]">
          {listing.category?.name || 'Item'}
        </p>

        <div className="mt-1.5 flex items-center gap-1">
          <span className="text-[15px] font-semibold text-[#222222] dark:text-white">
            {getRentalPriceDisplay(listing)}
          </span>
          <span className="text-[15px] text-[#222222] dark:text-white">/ day</span>
        </div>
      </div>

      {/* Owner hint for accessibility */}
      <span className="sr-only">
        Listed by {listing.owner?.full_name || getInitials(listing.owner?.full_name)}
      </span>
    </Link>
    </article>
  )
})

export default ListingCard
