'use client'

import { useMemo, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import ListingCard from '@/components/ListingCard'
import FloatingMapButton from '@/components/FloatingMapButton'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useInfiniteListings } from '@/hooks/useInfiniteListings'
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger'
import BackToTopButton from '@/components/BackToTopButton'

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const city = searchParams.get('city') || ''
  const category = searchParams.get('category') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const condition = searchParams.get('condition') || ''
  const sort = searchParams.get('sort') || 'recommended'
  const verified = searchParams.get('verified') === 'true'
  const delivery = searchParams.get('delivery') === 'true'
  const availableNow = searchParams.get('availableNow') === 'true'
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const guests = searchParams.get('guests') || ''

  const [showFilters, setShowFilters] = useState(false)

  const { listings, isLoading, isLoadingMore, hasMore, loadMore } = useInfiniteListings({
    q,
    city,
    category,
    condition,
    minPrice,
    maxPrice,
    sort,
    verified,
    delivery,
    availableNow,
    startDate,
    endDate,
    guests,
  })

  const results = useMemo(
    () => (verified ? listings.filter((item) => item.owner?.is_verified) : listings),
    [listings, verified]
  )

  const totalFilters = [category, city, minPrice || maxPrice, condition, verified, delivery, availableNow].filter(Boolean).length
  const contextText = useMemo(() => {
    if (q && city) return `Showing ${results.length} results for "${q}" in ${city}`
    if (q) return `Showing ${results.length} results for "${q}"`
    if (category) return `${results.length} items available in ${category} category`
    if (city) return `Showing ${results.length} results in ${city}`
    return `Showing ${results.length} available items`
  }, [category, city, q, results.length])

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    results.forEach((item) => {
      if (!item.city) return
      counts[item.city] = (counts[item.city] || 0) + 1
    })
    return counts
  }, [results])

  const conditionCounts = useMemo(() => {
    const counts = { excellent: 0, good: 0, fair: 0 }
    results.forEach((item) => {
      if (item.condition in counts) counts[item.condition as 'excellent' | 'good' | 'fair'] += 1
    })
    return counts
  }, [results])

  const histogramBuckets = useMemo(() => {
    const max = 5000
    const bucketSize = max / 9
    const buckets = Array.from({ length: 9 }).map(() => 0)
    results.forEach((item) => {
      const price = item.price_per_day || 0
      const idx = Math.min(Math.floor(price / bucketSize), 8)
      buckets[idx] += 1
    })
    return buckets
  }, [results])

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string }[] = []
    if (category) chips.push({ key: 'category', label: category })
    if (city) chips.push({ key: 'city', label: city })
    if (minPrice || maxPrice) chips.push({ key: 'price', label: `₹${minPrice || 0}-₹${maxPrice || '∞'}` })
    if (condition) chips.push({ key: 'condition', label: condition })
    if (verified) chips.push({ key: 'verified', label: 'Verified owners' })
    if (delivery) chips.push({ key: 'delivery', label: 'Free delivery' })
    if (availableNow) chips.push({ key: 'availableNow', label: 'Available now' })
    if (startDate) chips.push({ key: 'startDate', label: `From ${new Date(startDate).toLocaleDateString()}` })
    if (endDate) chips.push({ key: 'endDate', label: `Until ${new Date(endDate).toLocaleDateString()}` })
    if (guests) chips.push({ key: 'guests', label: `${guests} guests` })
    return chips
  }, [availableNow, category, city, condition, delivery, endDate, guests, maxPrice, minPrice, startDate, verified])

  const didYouMean = useMemo(() => {
    if (!q || results.length > 0) return ''
    const common = ['camera', 'laptop', 'playstation', 'speaker', 'bike', 'car', 'tent', 'drone', 'guitar']
    const match = common.find((term) => Math.abs(term.length - q.length) <= 2 && term[0] === q[0]?.toLowerCase())
    return match || ''
  }, [q, results.length])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.push(`/search?${next.toString()}`)
  }

  const clearAllFilters = () => {
    const next = new URLSearchParams(searchParams.toString())
    ;['category', 'city', 'minPrice', 'maxPrice', 'condition', 'verified', 'delivery', 'availableNow', 'startDate', 'endDate', 'guests'].forEach((k) =>
      next.delete(k)
    )
    router.push(`/search?${next.toString()}`)
  }

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10 py-6">
      {/* Top Search Bar */}
      <div className="mb-6">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Results Header + Filter Toggle */}
      <div className="flex items-center justify-between mb-5">
        <div>
          {isLoading ? (
            <div className="h-5 w-32 shimmer rounded" />
          ) : (
            <h1 className="text-lg font-semibold text-[#222222] dark:text-white">{contextText}</h1>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
            showFilters || totalFilters > 0
              ? 'border-[#222222] dark:border-white bg-[#222222] dark:bg-white text-white dark:text-[#121212]'
              : 'border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white dark:text-[#121212] hover:border-[#222222] dark:border-white'
          }`}
        >
          {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
          Filters
          {totalFilters > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-[#000000] dark:bg-white text-white dark:text-[#121212] text-xs flex items-center justify-center">
              {totalFilters}
            </span>
          )}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { key: 'recommended', label: 'Recommended' },
          { key: 'newest', label: 'Newest' },
          { key: 'price_asc', label: 'Price ↑' },
          { key: 'price_desc', label: 'Price ↓' },
          { key: 'rating', label: 'Top Rated' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => updateParam('sort', item.key)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
              sort === item.key
                ? 'bg-[#222222] text-white border-[#222222]'
                : 'border-[#DDDDDD] text-[#222222] hover:border-[#222222]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeChips.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => updateParam(chip.key, '')}
              className="rounded-full border border-[#DDDDDD] bg-[#F7F7F7] px-3 py-1 text-sm text-[#222222]"
            >
              {chip.label} ✕
            </button>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-sm font-semibold text-[#717171] hover:text-[#222222]"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div className={`flex gap-8 ${showFilters ? 'flex-col md:flex-row' : ''}`}>
        {/* Filter Panel */}
        {showFilters && (
          <div className="md:w-64 flex-shrink-0">
            <div className="border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-2xl p-5 sticky top-[175px]">
              <Suspense fallback={null}>
                <FilterPanel
                  onClose={() => setShowFilters(false)}
                  cityCounts={cityCounts}
                  conditionCounts={conditionCounts}
                  histogramBuckets={histogramBuckets}
                  activeFilterCount={totalFilters}
                />
              </Suspense>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : results.length === 0 ? (
            <div className="rounded-3xl border border-[#EBEBEB] bg-[#F7F7F7] p-8 text-center dark:border-[#3D3D3D] dark:bg-[#1A1A1A]">
              <Search size={48} className="mx-auto mb-4 text-[#B0B0B0] dark:text-[#6B6B6B]" />
              <h2 className="mb-2 text-xl font-semibold text-[#222222] dark:text-white">No items found</h2>
              <p className="mb-2 text-[#717171] dark:text-[#A0A0A0]">
                We couldn't find anything matching "{q || 'your search'}"{city ? ` in "${city}"` : ''}.
              </p>
              {didYouMean && (
                <p className="mb-4 text-sm font-medium text-[#222222] dark:text-white">
                  Did you mean "{didYouMean}"?
                </p>
              )}
              <div className="mb-4 text-left text-sm text-[#717171] dark:text-[#A0A0A0] max-w-xl mx-auto">
                <p>Suggestions:</p>
                <p>• Try a different search term</p>
                <p>• Search in a nearby city</p>
                <p>• Browse all categories</p>
              </div>
              <div className="mb-6 flex items-center justify-center gap-3">
                <Link href="/search" className="rounded-xl bg-[#222222] px-4 py-2 text-sm text-white">
                  Browse All Items
                </Link>
                <button onClick={clearAllFilters} className="rounded-xl border border-[#DDDDDD] px-4 py-2 text-sm text-[#222222]">
                  Clear Filters
                </button>
              </div>
              <div className="border-t border-[#DDDDDD] pt-4 text-sm text-[#717171] dark:text-[#A0A0A0]">
                <p>Can't find what you need? Post a rental request and let owners come to you!</p>
                <Link href="/contact" className="mt-2 inline-block font-semibold text-[#222222] dark:text-white hover:underline">
                  Post a Request
                </Link>
              </div>
            </div>
          ) : (
            <motion.div 
              className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
            >
              {results.map((listing, idx) => (
                <motion.div
                  key={listing.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                >
                  <ListingCard listing={listing} priority={idx < 4} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && results.length > 0 && (
            <InfiniteScrollTrigger
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMore}
            />
          )}
        </div>
      </div>
      <FloatingMapButton />
      <BackToTopButton />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonGrid count={8} />}>
      <SearchContent />
    </Suspense>
  )
}
