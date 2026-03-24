'use client'

import { useState, useCallback, useEffect, useRef, useMemo, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import type { ListingWithDetails } from '@/types'
import { getRentalPriceDisplay, getInitials } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import toast from '@/lib/toast'

interface ListingCardProps {
  listing: ListingWithDetails
  isWishlisted?: boolean
  onWishlistToggle?: (id: string) => void
  priority?: boolean
  onOpenAuth?: () => void
  index?: number // For staggered animations
}

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4='

const ListingCard = memo(function ListingCard({
  listing,
  isWishlisted: initialWishlisted,
  onWishlistToggle,
  onOpenAuth,
  priority = false,
  index = 0,
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

  const images = useMemo(
    () => (listing.images?.length ? listing.images : ['/placeholder.jpg']),
    [listing.images]
  )

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
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'orma_pending_action',
            JSON.stringify({ type: 'wishlist', listingId: listing.id })
          )
          localStorage.setItem(
            'orma_post_login_redirect',
            `${window.location.pathname}${window.location.search}`
          )
        }
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
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      aria-label={`${listing.title} - rental listing`}
      className="h-full"
    >
      <Link href={`/listing/${listing.id}`} className="group block h-full cursor-pointer">
        {/* Image Container */}
        <div
          className="relative overflow-hidden rounded-[1.75rem] aspect-[20/19] bg-[#EBEBEB] dark:bg-[#1A1A1A] shadow-sm group-hover:shadow-xl transition-all duration-500"
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
              transition: isDragging.current ? 'none' : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
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
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Image counter badge */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-black text-white tabular-nums backdrop-blur-xl border border-white/20 shadow-lg tracking-widest">
              {currentImageIdx + 1} / {images.length}
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:scale-110 active:scale-95 transition-all shadow-lg"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                wishlisted
                  ? 'fill-[#FF385C] stroke-[#FF385C]'
                  : 'fill-transparent stroke-white stroke-[2.5]'
              }`}
            />
          </button>

          {/* Badges Container (Top-Left) */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
            {/* NEW Badge: Created within last 7 days */}
            {new Date(listing.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
              <div className="rounded-full bg-[#FF385C] px-3 py-1.5 text-[10px] font-black text-white tracking-widest shadow-lg self-start">
                NEW
              </div>
            )}
            {/* POPULAR Badge: Views > 500 */}
            {listing.views_count > 500 && (
              <div className="rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-black text-white tracking-widest shadow-lg self-start">
                POPULAR 🔥
              </div>
            )}
          </div>

          {/* Quick Response Badge (Replacing VERIFIED text) */}
          {listing.owner?.is_verified && (
            <div className="absolute bottom-4 left-4 z-10 rounded-full bg-green-500/90 backdrop-blur-xl border border-white/20 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg pointer-events-none">
              Quick Response
            </div>
          )}

          {/* Image Navigation Arrows */}
          {images.length > 1 && showArrows && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 dark:bg-black/95 text-black dark:text-white rounded-full shadow-2xl border border-black/5 dark:border-white/10 flex items-center justify-center hover:scale-110 active:scale-90 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} strokeWidth={3} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 dark:bg-black/95 text-black dark:text-white rounded-full shadow-2xl border border-black/5 dark:border-white/10 flex items-center justify-center hover:scale-110 active:scale-90 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentImageIdx(idx)
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                    idx === currentImageIdx ? 'bg-white w-4' : 'bg-white/40 group-hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Text */}
        <div className="flex flex-col mt-4 px-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-black text-black dark:text-white tracking-tight leading-none truncate pr-4">
              {listing.city || 'Anywhere'}
            </h3>
            {listing.average_rating > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={12} className="fill-black dark:fill-white text-black dark:text-white" />
                <span className="text-sm font-black text-black dark:text-white tabular-nums">
                  {listing.average_rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <p className="text-sm font-bold text-[#717171] dark:text-gray-400 truncate leading-relaxed">
            {listing.title}
          </p>
          <p className="mt-0.5 text-xs text-[#717171] dark:text-[#A0A0A0]">
            by {listing.owner?.full_name || 'Owner'}
          </p>
          <p className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-0.5">
            Listed {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
          </p>
          {listing.owner?.updated_at && (
            <div className="mt-1">
              {new Date(listing.owner.updated_at) > new Date(Date.now() - 24 * 60 * 60 * 1000) ? (
                <span className="text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Active today
                </span>
              ) : new Date(listing.owner.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? (
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Active this week
                </span>
              ) : null}
            </div>
          )}
          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-base font-black text-black dark:text-white tracking-tight">
              {getRentalPriceDisplay(listing)}
            </span>
            <span className="text-xs font-bold text-[#717171] dark:text-gray-500 uppercase tracking-widest">/ day</span>
          </div>
        </div>

        {/* Owner hint for accessibility */}
        <span className="sr-only">
          Listed by {listing.owner?.full_name || getInitials(listing.owner?.full_name)}
        </span>
      </Link>
    </motion.article>
  )
})

export default ListingCard
