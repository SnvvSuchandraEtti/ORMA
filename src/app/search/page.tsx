'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import ListingCard from '@/components/ListingCard'
import FloatingMapButton from '@/components/FloatingMapButton'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { useInfiniteListings } from '@/hooks/useInfiniteListings'
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger'
import BackToTopButton from '@/components/BackToTopButton'

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const city = searchParams.get('city') || ''
  const category = searchParams.get('category') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const condition = searchParams.get('condition') || ''
  const sort = searchParams.get('sort') || 'newest'

  const [showFilters, setShowFilters] = useState(false)

  const { listings: results, isLoading, isLoadingMore, hasMore, loadMore } = useInfiniteListings({
    q,
    city,
    category,
    condition,
    minPrice,
    maxPrice,
    sort,
  })

  const totalFilters = [category, city, minPrice || maxPrice, condition].filter(Boolean).length
  const activeQ = q || city

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
            <h1 className="text-lg font-semibold text-[#222222] dark:text-white dark:text-[#121212]">
              {results.length} result{results.length !== 1 ? 's' : ''}
              {activeQ ? ` for "${activeQ}"` : ''}
            </h1>
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

      {/* Main Layout */}
      <div className={`flex gap-8 ${showFilters ? 'flex-col md:flex-row' : ''}`}>
        {/* Filter Panel */}
        {showFilters && (
          <div className="md:w-64 flex-shrink-0">
            <div className="border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-2xl p-5 sticky top-[175px]">
              <Suspense fallback={null}>
                <FilterPanel onClose={() => setShowFilters(false)} />
              </Suspense>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search size={48} className="text-[#B0B0B0] dark:text-[#6B6B6B] mb-4" />
              <h2 className="text-xl font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">No results found</h2>
              <p className="text-[#717171] dark:text-[#A0A0A0] mb-2">
                {q ? `We couldn't find any items matching "${q}".` : 'No items match your current filters.'}
              </p>
              <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">Try adjusting your filters or searching for something else.</p>
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
