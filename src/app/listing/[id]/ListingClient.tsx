'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Star, MapPin, Shield, Truck, Calendar, Phone, Heart,
  Share2, Flag, CheckCircle, XCircle, ArrowLeft, Badge
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails, Review } from '@/types'
import { formatPrice, formatDate, timeAgo, getInitials, getConditionBadgeColor } from '@/lib/utils'
import ImageGallery from '@/components/ImageGallery'
import ContactModal from '@/components/ContactModal'
import ReviewModal from '@/components/ReviewModal'
import BookingWidget from '@/components/BookingWidget'
import ListingCard from '@/components/ListingCard'
import ShareModal from '@/components/ShareModal'
import ReportModal from '@/components/ReportModal'
import { useAuth } from '@/hooks/useAuth'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import toast from '@/lib/toast'
import { handleSupabaseError } from '@/lib/handleError'
import DetailPageSkeleton from '@/components/DetailPageSkeleton'

export default function ListingClient() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const supabase = createClient()
  const { user, isAuthenticated } = useAuth()
  const { addToRecentlyViewed } = useRecentlyViewed()

  const [listing, setListing] = useState<ListingWithDetails | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [similarListings, setSimilarListings] = useState<ListingWithDetails[]>([])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showDescription, setShowDescription] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const fetchListing = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('id', id)
        .single()

      if (error || !data) {
        router.push('/')
        return
      }

      setListing(data as ListingWithDetails)
      addToRecentlyViewed(id)

      // Increment views
      await supabase.rpc('increment_views', { listing_uuid: id })

      // Fetch reviews
      const { data: revData } = await supabase
        .from('reviews')
        .select('*, reviewer:profiles(*)')
        .eq('listing_id', id)
        .order('created_at', { ascending: false })
        .limit(6)
      if (revData) setReviews(revData as Review[])

      // Fetch similar items
      const { data: simData } = await supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('category_id', data.category_id)
        .eq('status', 'active')
        .eq('is_available', true)
        .neq('id', id)
        .limit(6)
      if (simData) setSimilarListings(simData as ListingWithDetails[])

      // Check wishlist
      if (user) {
        const { data: wData } = await supabase
          .from('wishlists')
          .select('id')
          .eq('listing_id', id)
          .eq('user_id', user.id)
          .single()
        setIsWishlisted(!!wData)
      }
    } catch (err) {
      handleSupabaseError(err, 'fetchListing')
    } finally {
      setIsLoading(false)
    }
  }, [id, user, supabase, router, addToRecentlyViewed])

  useEffect(() => {
    fetchListing()
  }, [fetchListing])

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    const prev = isWishlisted
    setIsWishlisted(!prev)
    try {
      if (prev) {
        await supabase.from('wishlists').delete().eq('listing_id', id).eq('user_id', user!.id)
        toast.success('Removed from wishlist')
      } else {
        await supabase.from('wishlists').insert({ listing_id: id, user_id: user!.id })
        toast.success('Saved to wishlist ❤️')
      }
    } catch {
      setIsWishlisted(prev)
      toast.error('Something went wrong')
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: listing?.title || 'ORMA Rental', url })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setShowShareModal(true)
        }
      }
    } else {
      setShowShareModal(true)
    }
  }

  const handleContact = async () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    setShowContactModal(true)
    // Increment inquiries
    await supabase.rpc('increment_inquiries', { listing_uuid: id })
  }

  const handleReport = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    setShowReportModal(true)
  }

  if (isLoading) {
    return <DetailPageSkeleton />
  }

  if (!listing) return null

  const owner = listing.owner
  const category = listing.category
  const allImages = listing.images?.length ? listing.images : ['/placeholder.jpg']
  const isOwner = user?.id === listing.owner_id
  const descriptionLong = listing.description.length > 300

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-6 pb-24 md:pb-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-[#717171] dark:text-[#A0A0A0] hover:text-[#222222] dark:text-white mb-4 -ml-1"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Title (mobile) */}
        <div className="md:hidden flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl font-semibold text-[#222222] dark:text-white">{listing.title}</h1>
          {isOwner && (
            <Link
              href={`/edit-listing/${listing.id}`}
              className="px-3 py-1.5 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg text-xs font-semibold text-[#222222] dark:text-white hover:bg-gray-50 dark:bg-[#1A1A1A] hover:border-[#222222] dark:border-[#6B6B6B] transition-colors flex-shrink-0"
            >
              Edit
            </Link>
          )}
        </div>

        {/* Image Gallery */}
        <ImageGallery images={allImages} title={listing.title} />

        {/* Two-column layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* LEFT: Main Content */}
          <div className="min-w-0">
            {/* Title (desktop) */}
            <div className="hidden md:flex items-center justify-between mb-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#222222] dark:text-white">{listing.title}</h1>
              {isOwner && (
                <Link
                  href={`/edit-listing/${listing.id}`}
                  className="px-4 py-2 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg text-sm font-semibold text-[#222222] dark:text-white hover:bg-gray-50 dark:bg-[#1A1A1A] hover:border-[#222222] dark:border-[#6B6B6B] transition-colors flex-shrink-0"
                >
                  Edit Listing
                </Link>
              )}
            </div>

            {/* Location & Meta */}
            <div className="flex flex-wrap items-center gap-2 text-[#717171] dark:text-[#A0A0A0] text-sm mb-1">
              <MapPin size={14} />
              <span>{[listing.area, listing.city, listing.state].filter(Boolean).join(', ')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#717171] dark:text-[#A0A0A0] mb-4">
              <span>{category?.name}</span>
              <span>·</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getConditionBadgeColor(listing.condition)}`}>
                {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
              </span>
              <span>·</span>
              <span>{timeAgo(listing.created_at)}</span>
            </div>

            {/* Owner Info */}
            <div className="h-10" />
            <div className="flex items-center gap-4 py-2">
              <Link href={`/user/${owner?.id}`} className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#717171] flex items-center justify-center text-white font-semibold overflow-hidden">
                  {owner?.avatar_url ? (
                    <Image src={owner.avatar_url} alt={owner.full_name || 'Owner'} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                  ) : (
                    <span>{getInitials(owner?.full_name)}</span>
                  )}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">Listed by</p>
                <Link href={`/user/${owner?.id}`} className="font-semibold text-[#222222] dark:text-white hover:underline">
                  {owner?.full_name || 'Anonymous'}
                </Link>
                <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">
                  Member since {owner?.created_at ? formatDate(owner.created_at) : 'N/A'}
                  {owner?.is_verified && ' · ✓ Verified'}
                  {(owner?.average_rating || 0) > 0 && ` · ★ ${owner.average_rating?.toFixed(1)} avg`}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="h-10" />
            <div className="space-y-4 mb-5">
              {owner?.is_verified && (
                <div className="flex gap-4">
                  <Shield size={22} className="text-[#222222] dark:text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#222222] dark:text-white text-sm">Verified owner</p>
                    <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">This owner has been verified by ORMA</p>
                  </div>
                </div>
              )}
              {listing.id_proof_required && (
                <div className="flex gap-4">
                  <Badge size={22} className="text-[#222222] dark:text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#222222] dark:text-white text-sm">ID proof required</p>
                    <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">You&apos;ll need to show a valid ID before renting</p>
                  </div>
                </div>
              )}
              {listing.delivery_available && (
                <div className="flex gap-4">
                  <Truck size={22} className="text-[#222222] dark:text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#222222] dark:text-white text-sm">Delivery available</p>
                    <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">Owner can deliver to your location</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="h-10" />
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#222222] dark:text-white mb-3">About this item</h2>
              <p className={`text-[#717171] dark:text-[#A0A0A0] text-sm leading-relaxed ${!showDescription && descriptionLong ? 'line-clamp-3' : ''}`}>
                {listing.description}
              </p>
              {descriptionLong && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="mt-2 text-sm font-semibold text-[#222222] dark:text-white underline hover:no-underline"
                >
                  {showDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="h-10" />
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#222222] dark:text-white mb-3">Rental Terms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  {listing.id_proof_required ? <CheckCircle size={16} className="text-[#222222] dark:text-white" /> : <XCircle size={16} className="text-red-400" />}
                  <span className="text-[#717171] dark:text-[#A0A0A0]">ID proof {listing.id_proof_required ? 'required' : 'not required'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {listing.delivery_available ? <CheckCircle size={16} className="text-[#222222] dark:text-white" /> : <XCircle size={16} className="text-red-400" />}
                  <span className="text-[#717171] dark:text-[#A0A0A0]">Delivery {listing.delivery_available ? 'available' : 'not available'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-[#717171] dark:text-[#A0A0A0]" />
                  <span className="text-[#717171] dark:text-[#A0A0A0]">Min rental: {listing.minimum_rental_period || '1 day'}</span>
                </div>
                {listing.security_deposit > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield size={16} className="text-[#717171] dark:text-[#A0A0A0]" />
                    <span className="text-[#717171] dark:text-[#A0A0A0]">Security deposit: {formatPrice(listing.security_deposit)}</span>
                  </div>
                )}
              </div>
              {listing.terms_and_conditions && (
                <p className="mt-3 text-sm text-[#717171] dark:text-[#A0A0A0] leading-relaxed">{listing.terms_and_conditions}</p>
              )}
            </div>

            {/* Safety Banner */}
            <div className="h-10" />
            <div className="bg-[#F7F7F7] dark:bg-[#1A1A1A] rounded-2xl p-6 mb-5 border border-[#EBEBEB] dark:border-[#3D3D3D]">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={24} className="text-[#222222] dark:text-white fill-[#222222] dark:fill-white" />
                <h2 className="text-lg font-semibold text-[#222222] dark:text-white">Stay Safe on ORMA</h2>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Always meet in a public place",
                  "Verify the owner's identity",
                  "Inspect the item before paying",
                  "Never share bank OTP or passwords",
                  "Take photos of the item's condition",
                  "Get a receipt or written agreement"
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#222222] mt-2 flex-shrink-0" />
                    <span className="text-sm text-[#222222] dark:text-white">{tip}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleReport}
                className="text-sm font-semibold text-[#222222] dark:text-white underline hover:no-underline flex items-center gap-1"
              >
                Report suspicious activity <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>

            {/* Reviews */}
            <div className="h-10" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#222222] dark:text-white flex items-center gap-2">
                  <Star size={20} className="fill-[#222222] dark:fill-white stroke-[#222222] dark:stroke-white" />
                  {listing.total_reviews > 0
                    ? `${listing.average_rating.toFixed(1)} · ${listing.total_reviews} reviews`
                    : 'No reviews yet'
                  }
                </h2>
                {!isOwner && isAuthenticated && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="text-sm font-semibold underline hover:no-underline text-[#222222] dark:text-white"
                  >
                    Write a review
                  </button>
                )}
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {reviews.map(review => (
                    <div key={review.id}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#717171] flex items-center justify-center text-white text-sm font-semibold overflow-hidden flex-shrink-0">
                          {review.reviewer?.avatar_url ? (
                            <Image src={review.reviewer.avatar_url} alt={review.reviewer.full_name || 'Reviewer'} width={40} height={40} className="object-cover" unoptimized />
                          ) : (
                            <span>{getInitials(review.reviewer?.full_name)}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#222222] dark:text-white">{review.reviewer?.full_name || 'Anonymous'}</p>
                          <p className="text-xs text-[#717171] dark:text-[#A0A0A0]">{formatDate(review.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? 'fill-[#222222] dark:fill-white stroke-[#222222] dark:stroke-white' : 'fill-none stroke-[#DDDDDD]'} />
                        ))}
                      </div>
                      {review.title && <p className="text-sm font-semibold text-[#222222] dark:text-white mb-0.5">{review.title}</p>}
                      <p className="text-sm text-[#717171] dark:text-[#A0A0A0] leading-relaxed line-clamp-3">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#717171] dark:text-[#A0A0A0] text-sm">
                  No reviews yet. Be the first to review after renting this item!
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: Sticky Price Card (Desktop) */}
          <div className="hidden lg:block relative z-20">
            <BookingWidget listing={listing} onContact={handleContact} />
            
            <div className="sticky top-[750px] mt-6 px-6">
              <div className="flex items-center justify-around pb-4">
                <button
                  onClick={handleWishlist}
                  className="flex items-center gap-2 text-sm font-semibold text-[#222222] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2D2D2D] px-4 py-2 rounded-lg transition-colors"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-[#FF385C] stroke-[#FF385C]' : ''} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm font-semibold text-[#222222] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2D2D2D] px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 size={18} />
                  Share
                </button>
                <button
                  onClick={handleReport}
                  className="flex items-center gap-2 text-sm font-semibold text-[#222222] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2D2D2D] px-4 py-2 rounded-lg transition-colors"
                >
                  <Flag size={18} />
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="h-10" />
        {similarListings.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-5">More items you might like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarListings.slice(0, 4).map(l => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#1E1E1E] border-t border-[#DDDDDD] dark:border-[#3D3D3D] p-4 flex items-center gap-4 lg:hidden">
        <div className="flex-1">
          <p className="font-semibold text-[#222222] dark:text-white">{formatPrice(listing.price_per_day)}<span className="font-normal text-[#717171] dark:text-[#A0A0A0] text-sm">/day</span></p>
          {listing.total_reviews > 0 && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#222222] dark:fill-white stroke-[#222222] dark:stroke-white" />
              <span className="text-xs text-[#222222] dark:text-white">{listing.average_rating.toFixed(1)}</span>
              <span className="text-xs text-[#717171] dark:text-[#A0A0A0]">({listing.total_reviews})</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReport}
            className="p-3 text-[#717171] dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#2D2D2D] rounded-xl transition-colors"
            aria-label="Report listing"
          >
            <Flag size={20} />
          </button>
          <button
            onClick={handleContact}
            className="px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-xl hover:bg-[#E31C5F] hover:shadow-md transition-all whitespace-nowrap"
          >
            Message Owner
          </button>
        </div>
      </div>

      {/* Modals */}
      {showContactModal && listing && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          owner={listing.owner}
          listing={{
            id: listing.id,
            title: listing.title,
            contact_phone: listing.contact_phone,
            contact_whatsapp: listing.contact_whatsapp,
            contact_email: listing.contact_email,
            preferred_contact: listing.preferred_contact,
          }}
        />
      )}
      {showReviewModal && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          listingId={listing.id}
          ownerId={listing.owner_id}
          onReviewSubmitted={fetchListing}
        />
      )}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          url={typeof window !== 'undefined' ? window.location.href : `https://orma.app/listing/${id}`}
          title={listing.title}
        />
      )}
      {showReportModal && user && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          listingId={listing.id}
          reporterId={user.id}
        />
      )}
      
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setAuthModalOpen(false)}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-xl w-[90%] max-w-sm">
            <h2 className="text-2xl font-bold mb-2">Log in required</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to perform this action.</p>
            <Link href="/login" className="block text-center w-full bg-[#FF385C] text-white font-bold py-3 rounded-xl">
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
