import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import { handleSupabaseError } from '@/lib/handleError'

export interface UseInfiniteListingsOptions {
  q?: string | null
  city?: string | null
  category?: string | null
  condition?: string | null
  minPrice?: string | null
  maxPrice?: string | null
  sort?: string | null
  pageSize?: number
}

export function useInfiniteListings(options: UseInfiniteListingsOptions = {}) {
  const {
    q,
    city,
    category,
    condition,
    minPrice,
    maxPrice,
    sort,
    pageSize = 20
  } = options

  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchPage = useCallback(async (pageIndex: number, isInitial = false) => {
    try {
      if (isInitial) {
        setIsLoading(true)
        setError(null)
      } else {
        setIsLoadingMore(true)
      }

      const from = pageIndex * pageSize
      const to = from + pageSize - 1

      let query = supabase
        .from('listings')
        .select(`
          *,
          owner:profiles(*),
          category:categories(*)
        `)
        .eq('status', 'active')
        .eq('is_available', true)

      // Search Query
      if (q) {
        query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`)
      }

      // City Filter
      if (city) {
        query = query.ilike('city', `%${city}%`)
      }

      // Condition Filter
      if (condition) {
        query = query.eq('condition', condition)
      }

      // Price Filters
      if (minPrice) {
        query = query.gte('price_per_day', Number(minPrice))
      }
      if (maxPrice) {
        query = query.lte('price_per_day', Number(maxPrice))
      }

      // Category Filter (Needs to resolve ID first)
      if (category) {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', category)
          .single()
        if (catData) {
          query = query.eq('category_id', catData.id)
        }
      }

      // Apply Sort
      if (sort === 'price_asc') {
        query = query.order('price_per_day', { ascending: true })
      } else if (sort === 'price_desc') {
        query = query.order('price_per_day', { ascending: false })
      } else if (sort === 'rating') {
        query = query.order('average_rating', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      // Standard Pagination Range
      query = query.range(from, to)

      const { data, error: fetchErr } = await query

      if (fetchErr) throw fetchErr

      const fetchedListings = (data as ListingWithDetails[]) || []

      setListings(prev => {
        if (isInitial) return fetchedListings
        // Deduplicate
        const existingIds = new Set(prev.map(l => l.id))
        return [...prev, ...fetchedListings.filter(l => !existingIds.has(l.id))]
      })

      setHasMore(fetchedListings.length === pageSize)
      setPage(pageIndex)

    } catch (err: any) {
      handleSupabaseError(err, 'fetchListings')
      setError(err.message || 'Failed to fetch listings')
    } finally {
      if (isInitial) {
        setIsLoading(false)
      } else {
        setIsLoadingMore(false)
      }
    }
  }, [category, city, condition, maxPrice, minPrice, pageSize, q, sort, supabase])

  // Reset & load Initial
  useEffect(() => {
    fetchPage(0, true)
  }, [fetchPage])

  const loadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore) {
      fetchPage(page + 1, false)
    }
  }, [isLoading, isLoadingMore, hasMore, fetchPage, page])

  return { listings, isLoading, isLoadingMore, hasMore, loadMore, error }
}
