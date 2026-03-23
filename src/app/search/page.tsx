'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import ListingCard from '@/components/ListingCard'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const city = searchParams.get('city') || ''
  const category = searchParams.get('category') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const condition = searchParams.get('condition') || ''
  const sort = searchParams.get('sort') || 'newest'

  const [results, setResults] = useState<ListingWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const supabase = createClient()

  const search = useCallback(async () => {
    setIsLoading(true)
    try {
      let query = supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('status', 'active')
        .eq('is_available', true)

      if (q) query = query.ilike('title', `%${q}%`)
      if (city) query = query.ilike('city', `%${city}%`)
      if (condition) query = query.eq('condition', condition)
      if (minPrice) query = query.gte('price_per_day', parseFloat(minPrice))
      if (maxPrice) query = query.lte('price_per_day', parseFloat(maxPrice))

      if (category) {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', category)
          .single()
        if (catData) query = query.eq('category_id', catData.id)
      }

      // Apply sort
      if (sort === 'price_asc') query = query.order('price_per_day', { ascending: true })
      else if (sort === 'price_desc') query = query.order('price_per_day', { ascending: false })
      else if (sort === 'rating') query = query.order('average_rating', { ascending: false })
      else query = query.order('created_at', { ascending: false })

      const { data, error } = await query.limit(48)
      if (error) throw error
      setResults((data as ListingWithDetails[]) || [])
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [q, city, category, condition, minPrice, maxPrice, sort, supabase])

  useEffect(() => { search() }, [search])

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
            <h1 className="text-lg font-semibold text-[#222222]">
              {results.length} result{results.length !== 1 ? 's' : ''}
              {activeQ ? ` for "${activeQ}"` : ''}
            </h1>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
            showFilters || totalFilters > 0
              ? 'border-[#222222] bg-[#222222] text-white'
              : 'border-[#DDDDDD] text-[#222222] hover:border-[#222222]'
          }`}
        >
          {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
          Filters
          {totalFilters > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-[#FF385C] text-white text-xs flex items-center justify-center">
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
            <div className="border border-[#DDDDDD] rounded-2xl p-5 sticky top-[175px]">
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
              <Search size={48} className="text-[#B0B0B0] mb-4" />
              <h2 className="text-xl font-semibold text-[#222222] mb-2">No results found</h2>
              <p className="text-[#717171] mb-2">
                {q ? `We couldn't find any items matching "${q}".` : 'No items match your current filters.'}
              </p>
              <p className="text-sm text-[#717171]">Try adjusting your filters or searching for something else.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
              {results.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
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
