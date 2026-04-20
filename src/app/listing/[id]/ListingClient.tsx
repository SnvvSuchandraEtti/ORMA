'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Star, MapPin, Shield, Truck, Calendar, Heart,
  Share2, Flag, CheckCircle, XCircle, ArrowLeft, Badge, ChevronDown
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
import LiveViewerCount from '@/components/LiveViewerCount'
import TrustScore from '@/components/TrustScore'
import { useAuth } from '@/hooks/useAuth'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import toast from '@/lib/toast'
import { handleSupabaseError } from '@/lib/handleError'
import DetailPageSkeleton from '@/components/DetailPageSkeleton'
import AuthModal from '@/components/AuthModal'
import Breadcrumb from '@/components/Breadcrumb'

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
  const [ownerMoreListings, setOwnerMoreListings] = useState<ListingWithDetails[]>([])
  const [citySimilarListings, setCitySimilarListings] = useState<ListingWithDetails[]>([])
  const [youMightLikeListings, setYouMightLikeListings] = useState<ListingWithDetails[]>([])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showDescription, setShowDescription] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [recentInquiries, setRecentInquiries] = useState(0)
  const [responseRate, setResponseRate] = useState(95)
  const [isSafetyExpanded, setIsSafetyExpanded] = useState(false)
  const [safetyChecks, setSafetyChecks] = useState<Record<string, boolean>>({})

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

      // Track local views for Engagement Banner
      const currentViews = parseInt(localStorage.getItem('orma_listings_viewed') || '0')
      localStorage.setItem('orma_listings_viewed', (currentViews + 1).toString())

      // Fetch reviews
      const { data: revData } = await supabase
        .from('reviews')
        .select('*, reviewer:profiles(*)')
        .eq('listing_id', id)
        .order('created_at', { ascending: false })
        .limit(6)
      if (revData) setReviews(revData as Review[])

      const { count: inquiryCount } = await supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('listing_id', id)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      setRecentInquiries(inquiryCount || 0)

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

      const [{ data: ownerMore }, { data: citySimilar }, { data: alsoLike }] = await Promise.all([
        supabase
          .from('listings')
          .select('*, owner:profiles(*), category:categories(*)')
          .eq('owner_id', data.owner_id)
          .eq('status', 'active')
          .eq('is_available', true)
          .neq('id', id)
          .limit(12),
        supabase
          .from('listings')
          .select('*, owner:profiles(*), category:categories(*)')
          .eq('category_id', data.category_id)
          .eq('city', data.city)
          .eq('status', 'active')
          .eq('is_available', true)
          .neq('id', id)
          .limit(12),
        supabase
          .from('listings')
          .select('*, owner:profiles(*), category:categories(*)')
          .eq('category_id', data.category_id)
          .neq('city', data.city)
          .eq('status', 'active')
          .eq('is_available', true)
          .neq('id', id)
          .limit(12),
      ])
      setOwnerMoreListings((ownerMore || []) as ListingWithDetails[])
      setCitySimilarListings((citySimilar || []) as ListingWithDetails[])
      setYouMightLikeListings((alsoLike || []) as ListingWithDetails[])

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

      if (typeof window !== 'undefined') {
        const responseRateKey = `orma_response_rate_${data.owner_id}`
        const stored = window.sessionStorage.getItem(responseRateKey)
        const generated = stored ? Number(stored) : Math.floor(Math.random() * 16) + 85
        const safeRate = Number.isNaN(generated) ? 95 : generated
        setResponseRate(safeRate)
        window.sessionStorage.setItem(responseRateKey, String(safeRate))
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

  useEffect(() => {
    if (!id || typeof window === 'undefined') return
    const raw = localStorage.getItem(`orma_safety_checks_${id}`)
    if (!raw) return
    try {
      setSafetyChecks(JSON.parse(raw) as Record<string, boolean>)
    } catch {
      // ignore malformed local storage
    }
  }, [id])

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'orma_pending_action',
          JSON.stringify({ type: 'wishlist', listingId: id })
        )
        localStorage.setItem(
          'orma_post_login_redirect',
          `${window.location.pathname}${window.location.search}`
        )
      }
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
        if (err instanceof Error && err.name === 'AbortError') return
        setShowShareModal(true)
      }
    } else {
      setShowShareModal(true)
    }
  }

  const handleContact = async () => {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'orma_post_login_redirect',
          `${window.location.pathname}${window.location.search}`
        )
      }
      setAuthModalOpen(true)
      return
    }
    setShowContactModal(true)
    // Increment inquiries
    await supabase.rpc('increment_inquiries', { listing_uuid: id })
  }

  const handleMessageOwner = () => {
    if (!listing || user?.id === listing.owner_id) return
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('orma_post_login_redirect', `/messages?listing=${id}`)
      }
      setAuthModalOpen(true)
      return
    }
    router.push(`/messages?listing=${id}`)
  }

  const handleReport = () => {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'orma_post_login_redirect',
          `${window.location.pathname}${window.location.search}`
        )
      }
      setAuthModalOpen(true)
      return
    }
    setShowReportModal(true)
  }

  // Calculate pricing data before early returns
  const priceRows = useMemo(() => {
    if (!listing) return []
    return [
      { label: 'Per Hour', value: listing.price_per_hour || 0, hours: 1 },
      { label: 'Per Day', value: listing.price_per_day || 0, hours: 24 },
      { label: 'Per Week', value: listing.price_per_week || 0, hours: 24 * 7 },
      { label: 'Per Month', value: listing.price_per_month || 0, hours: 24 * 30 },
    ].filter((row) => row.value > 0)
  }, [listing])

  const hourlyBase = useMemo(() => {
    if (!listing) return 0
    return listing.price_per_hour || (listing.price_per_day > 0 ? listing.price_per_day / 24 : 0)
  }, [listing])

  const pricedWithSavings = useMemo(() => {
    if (!listing || !priceRows.length) return []
    return priceRows.map((row) => {
      if (!hourlyBase || row.hours <= 1) return { ...row, savings: 0 }
      const baseline = hourlyBase * row.hours
      const savings = baseline > row.value ? Math.round(((baseline - row.value) / baseline) * 100) : 0
      return { ...row, savings }
    })
  }, [listing, priceRows, hourlyBase])

  const bestValue = useMemo(() => {
    if (!pricedWithSavings.length) return { label: '', value: 0, hours: 0, savings: 0 }
    return pricedWithSavings.reduce(
      (best, row) => (row.savings > best.savings ? row : best),
      { label: '', value: 0, hours: 0, savings: 0 }
    )
  }, [pricedWithSavings])

  if (isLoading) {
    return <DetailPageSkeleton />
  }

  if (!listing) return null

  const owner = listing.owner
  const category = listing.category
  const categorySearchHref = category?.slug ? `/search?category=${category.slug}` : '/search'
  const allImages = listing.images?.length ? listing.images : ['/placeholder.jpg']
  const isOwner = user?.id === listing.owner_id
  const descriptionLong = listing.description.length > 300
  const shortItemId = `#OR${listing.id.replace(/-/g, '').slice(0, 6).toUpperCase()}`
  const safetyItems = [
    'Verify owner identity',
    'Inspect item condition',
    'Agree on return date and terms',
    'Take photos before pickup',
    'Get a receipt (including WhatsApp confirmation)',
    "Save owner's contact information",
    'Return item on agreed date',
    'Return in same condition',
    'Get deposit refund confirmation',
    'Leave a review to help others',
  ]
  const specs = [
    { label: 'Brand', value: listing.brand },
    { label: 'Model', value: listing.model },
    { label: 'Condition', value: listing.condition ? listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1) : '' },
    { label: 'Category', value: category?.name || '' },
    { label: 'Listed', value: timeAgo(listing.created_at) },
    { label: 'Item ID', value: shortItemId },
    { label: 'Views', value: listing.views_count.toLocaleString() },
    { label: 'Inquiries', value: listing.inquiries_count.toLocaleString() },
  ].filter((row) => row.value)
  const toggleSafety = (item: string) => {
    setSafetyChecks((prev) => {
      const next = { ...prev, [item]: !prev[item] }
      localStorage.setItem(`orma_safety_checks_${id}`, JSON.stringify(next))
      return next
    })
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-6 pb-24 md:pb-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: category?.name || 'Category', href: categorySearchHref },
            { label: listing.title },
          ]}
        />
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-[#717171] dark:text-[#A0A0A0] hover:text-[#222222] dark:text-white mb-4 -ml-1"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Title and Mobile Actions */}
        <div className="md:hidden flex flex-col gap-3 mb-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold text-[#222222] dark:text-white leading-tight">{listing.title}</h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2 rounded-full border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors shadow-sm"
                aria-label="Share listing"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={handleWishlist}
                className="p-2 rounded-full border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors shadow-sm"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={18} className={isWishlisted ? 'fill-[#FF385C] stroke-[#FF385C]' : ''} />
              </button>
            </div>
          </div>
          {isOwner && (
            <Link
              href={`/edit-listing/${listing.id}`}
              className="px-3 py-1.5 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg text-xs font-semibold text-[#222222] dark:text-white hover:bg-gray-50 dark:bg-[#1A1A1A] w-fit"
            >
              Edit Listing
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
            
            {/* Live Viewers & Inquiries */}
            <LiveViewerCount listingId={listing.id} inquiriesCount={recentInquiries} />
            
            {/* Social Proof metrics */}
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-[#717171] dark:text-[#A0A0A0]">
                <span>👁</span>
                <span>{listing.views_count.toLocaleString()} people viewed this</span>
              </div>
              {listing.views_count > 100 && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-500">
                  <span>🔥</span>
                  <span>Trending — {Math.floor(listing.views_count * 0.4)} people viewed this in the last week</span>
                </div>
              )}
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
                <div className="flex items-center gap-2">
                  <Link href={`/user/${owner?.id}`} className="font-semibold text-[#222222] dark:text-white hover:underline">
                    {owner?.full_name || 'Anonymous'}
                  </Link>
                  {owner?.updated_at && new Date(owner.updated_at) > new Date(Date.now() - 24 * 60 * 60 * 1000) ? (
                    <span className="text-[10px] font-bold text-green-700 dark:text-green-300 flex items-center gap-1 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Active today
                    </span>
                  ) : owner?.updated_at && new Date(owner.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Active this week
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-[#717171] dark:text-[#A0A0A0] mb-2">
                  Member since {owner?.created_at ? formatDate(owner.created_at) : 'N/A'}
                  {owner?.is_verified && ' · ✓ Verified'}
                  {(owner?.average_rating || 0) > 0 && ` · ★ ${owner.average_rating?.toFixed(1)} avg`}
                </p>
                <div className="space-y-0.5 mt-2">
                  <p className="text-sm text-[#222222] dark:text-white font-medium">
                    {owner?.is_verified ? 'Typically responds within 1 hour' : 'Typically responds within 24 hours'}
                  </p>
                  <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">
                    Response rate: {responseRate}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-5 mt-4">
              <TrustScore profile={owner} listingsCount={owner?.total_listings} reviewsCount={owner?.total_reviews_received} />
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

            <div className="rounded-2xl border border-[#EBEBEB] bg-white dark:border-[#3D3D3D] dark:bg-[#1A1A1A] mb-5">
              <div className="border-b border-[#EBEBEB] px-5 py-3 dark:border-[#3D3D3D]">
                <h2 className="text-lg font-semibold text-[#222222] dark:text-white">Item Details</h2>
              </div>
              <div className="divide-y divide-[#EBEBEB] dark:divide-[#3D3D3D]">
                {specs.map((row, idx) => (
                  <div key={row.label} className={`grid grid-cols-2 px-5 py-2.5 text-sm ${idx % 2 ? 'bg-[#FAFAFA] dark:bg-[#121212]' : ''}`}>
                    <span className="text-[#717171] dark:text-[#A0A0A0]">{row.label}</span>
                    <span className="font-medium text-[#222222] dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 dark:border-[#3D3D3D] dark:bg-[#1A1A1A] mb-5">
              <h2 className="text-lg font-semibold text-[#222222] dark:text-white mb-4">Rental Pricing</h2>
              <div className="overflow-x-auto rounded-xl border border-[#EBEBEB] dark:border-[#3D3D3D]">
                <table className="w-full text-sm">
                  <thead className="bg-[#F7F7F7] dark:bg-[#121212]">
                    <tr>
                      <th className="px-3 py-2 text-left">Duration</th>
                      <th className="px-3 py-2 text-left">Price</th>
                      <th className="px-3 py-2 text-left">Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricedWithSavings.map((row) => (
                      <tr key={row.label} className={bestValue.label === row.label ? 'bg-amber-50/60 dark:bg-amber-900/10' : ''}>
                        <td className="px-3 py-2">{row.label}</td>
                        <td className="px-3 py-2 font-semibold">{formatPrice(row.value)}</td>
                        <td className="px-3 py-2 text-green-700 dark:text-green-300">{row.savings > 0 ? `Save ${row.savings}%` : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bestValue.savings > 0 && (
                <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
                  💡 Best value: {bestValue.label} rental saves you {bestValue.savings}
                </p>
              )}
              {listing.security_deposit > 0 && (
                <p className="mt-2 text-sm text-[#222222] dark:text-white">
                  Security Deposit: {formatPrice(listing.security_deposit)}{' '}
                  <span className="text-xs rounded-full bg-green-500/10 px-2 py-0.5 text-green-700 dark:text-green-300">Refundable</span>
                </p>
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

            {/* Safety Checklist */}
            <div className="h-10" />
            <div className="rounded-2xl border border-[#EBEBEB] dark:border-[#3D3D3D] mb-5 overflow-hidden">
              <button
                onClick={() => setIsSafetyExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between bg-[#F7F7F7] dark:bg-[#1A1A1A] px-5 py-3"
              >
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-[#222222] dark:text-white" />
                  <h2 className="text-lg font-semibold text-[#222222] dark:text-white">Rental Safety Checklist</h2>
                </div>
                <ChevronDown size={18} className={`transition-transform ${isSafetyExpanded ? 'rotate-180' : ''}`} />
              </button>
              {isSafetyExpanded && (
                <div className="p-5 bg-white dark:bg-[#1A1A1A]">
                  <p className="text-sm font-semibold text-[#222222] dark:text-white mb-2">Before renting:</p>
                  <div className="space-y-2 mb-4">
                    {safetyItems.slice(0, 6).map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm text-[#222222] dark:text-white">
                        <input type="checkbox" checked={!!safetyChecks[item]} onChange={() => toggleSafety(item)} />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-[#222222] dark:text-white mb-2">After renting:</p>
                  <div className="space-y-2 mb-4">
                    {safetyItems.slice(6).map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm text-[#222222] dark:text-white">
                        <input type="checkbox" checked={!!safetyChecks[item]} onChange={() => toggleSafety(item)} />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={handleReport}
                    className="text-sm font-semibold text-[#222222] dark:text-white underline hover:no-underline"
                  >
                    ⚠️ Something wrong? Report this listing
                  </button>
                </div>
              )}
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
            <BookingWidget
              listing={listing}
              onContact={handleContact}
              onMessageOwner={!isOwner ? handleMessageOwner : undefined}
            />
            
            <div className="mt-8 px-6 bg-white dark:bg-[#1A1A1A] rounded-[2rem] border border-[#EBEBEB] dark:border-[#3D3D3D] py-4 shadow-sm">
              <div className="flex items-center justify-around">
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

        {/* Related Items */}
        <div className="h-10" />
        {ownerMoreListings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-4">More from this owner</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {ownerMoreListings.map((l) => (
                <div key={l.id} className="min-w-[280px] max-w-[280px]">
                  <ListingCard listing={l} />
                </div>
              ))}
            </div>
          </div>
        )}
        {citySimilarListings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-4">Similar items in {listing.city}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {citySimilarListings.map((l) => (
                <div key={l.id} className="min-w-[280px] max-w-[280px]">
                  <ListingCard listing={l} />
                </div>
              ))}
            </div>
          </div>
        )}
        {youMightLikeListings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-4">You might also like</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {youMightLikeListings.map((l) => (
                <div key={l.id} className="min-w-[280px] max-w-[280px]">
                  <ListingCard listing={l} />
                </div>
              ))}
            </div>
          </div>
        )}
        {similarListings.length > 0 && ownerMoreListings.length === 0 && citySimilarListings.length === 0 && youMightLikeListings.length === 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-5">More items you might like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarListings.slice(0, 4).map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#1E1E1E] border-t border-[#DDDDDD] dark:border-[#3D3D3D] p-4 flex items-center gap-3 lg:hidden">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#222222] dark:text-white">{formatPrice(listing.price_per_day)}<span className="font-normal text-[#717171] dark:text-[#A0A0A0] text-sm">/day</span></p>
          {listing.total_reviews > 0 && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#222222] dark:fill-white stroke-[#222222] dark:stroke-white" />
              <span className="text-xs text-[#222222] dark:text-white">{listing.average_rating.toFixed(1)}</span>
              <span className="text-xs text-[#717171] dark:text-[#A0A0A0]">({listing.total_reviews})</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleReport}
            className="p-2.5 text-[#717171] dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#2D2D2D] rounded-xl transition-colors"
            aria-label="Report listing"
          >
            <Flag size={20} />
          </button>
          {!isOwner ? (
            <>
              <button
                onClick={handleContact}
                className="px-3 py-2.5 border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors whitespace-nowrap"
              >
                Contact
              </button>
              <button
                onClick={handleMessageOwner}
                className="px-4 py-2.5 bg-[#0071E3] text-white text-sm font-semibold rounded-xl hover:bg-[#0055B3] hover:shadow-md transition-all whitespace-nowrap"
              >
                Message
              </button>
            </>
          ) : (
            <Link
              href={`/edit-listing/${listing.id}`}
              className="px-4 py-2.5 bg-[#222222] dark:bg-white dark:text-[#222222] text-white text-sm font-semibold rounded-xl whitespace-nowrap"
            >
              Edit
            </Link>
          )}
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
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
