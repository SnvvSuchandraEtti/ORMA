'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ListingCondition } from '@/types'

const CITIES = ['Hyderabad', 'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Delhi', 'Kolkata', 'Jaipur', 'Kochi', 'Ahmedabad']
const PRICE_BUCKETS = 9
const PRICE_MAX = 5000

interface FilterPanelProps {
  onClose?: () => void
  cityCounts?: Record<string, number>
  conditionCounts?: Record<ListingCondition, number>
  histogramBuckets?: number[]
  activeFilterCount?: number
}

export default function FilterPanel({
  onClose,
  cityCounts = {},
  conditionCounts = { excellent: 0, good: 0, fair: 0 },
  histogramBuckets = [],
  activeFilterCount = 0,
}: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentCity = searchParams.get('city') || ''
  const currentMinPrice = searchParams.get('minPrice') || ''
  const currentMaxPrice = searchParams.get('maxPrice') || ''
  const currentCondition = searchParams.get('condition') || ''
  const currentSort = searchParams.get('sort') || 'newest'
  const verifiedOnly = searchParams.get('verified') === 'true'
  const freeDeliveryOnly = searchParams.get('delivery') === 'true'
  const availableNowOnly = searchParams.get('availableNow') === 'true'

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/search?${params.toString()}`)
  }

  const clearAll = () => {
    const q = searchParams.get('q')
    router.push(q ? `/search?q=${q}` : '/search')
    onClose?.()
  }

  const hasFilters = !!(currentCategory || currentCity || currentMinPrice || currentMaxPrice || currentCondition)
  const buckets = useMemo(() => {
    if (histogramBuckets.length === PRICE_BUCKETS) return histogramBuckets
    return Array.from({ length: PRICE_BUCKETS }).map(() => 0)
  }, [histogramBuckets])
  const maxBucket = Math.max(...buckets, 1)

  return (
    <div className="bg-white dark:bg-[#1E1E1E] space-y-8 p-1">
      <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
        <h3 className="font-bold text-xl text-[#222222] dark:text-white tracking-tight">Filters</h3>
        <span className="text-xs font-semibold text-[#717171] dark:text-[#A0A0A0]">({activeFilterCount})</span>
        {hasFilters && (
          <button onClick={clearAll} className="text-sm font-bold underline text-[#717171] hover:text-[#FF385C] transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-bold text-[#222222] dark:text-white mb-3 ml-1">Sort by</label>
        <select
          value={currentSort}
          onChange={e => updateFilter('sort', e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-medium text-[#222222] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all shadow-sm"
        >
          <option value="newest">Newest first</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-bold text-[#222222] dark:text-white mb-3 ml-1">City</label>
        <div className="space-y-2">
          {CITIES.map(city => (
            <button
              key={city}
              onClick={() => updateFilter('city', currentCity === city ? '' : city)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-300 shadow-sm ${
                currentCity === city
                  ? 'bg-[#FF385C] text-white border-[#FF385C] shadow-[#FF385C]/20'
                  : 'border-black/10 dark:border-white/10 text-[#717171] dark:text-[#A0A0A0] hover:border-[#FF385C] hover:text-[#FF385C]'
              }`}
            >
              <span>{city}</span>
              <span>({cityCounts[city] || 0})</span>
            </button>
          ))}
        </div>
        <input
          type="text"
          value={currentCity}
          onChange={e => updateFilter('city', e.target.value)}
          placeholder="Type a city..."
          className="mt-2 w-full px-3 py-2 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222]"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-bold text-[#222222] dark:text-white mb-3 ml-1">Price per day (₹)</label>
        <div className="mb-3">
          <div className="flex h-12 items-end gap-1 rounded-xl bg-[#F7F7F7] p-2 dark:bg-[#121212]">
            {buckets.map((count, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-sm bg-[#222222] dark:bg-[#FF385C]"
                style={{ height: `${Math.max((count / maxBucket) * 100, 8)}%` }}
              />
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-[#717171] dark:text-[#A0A0A0]">
            <span>₹0</span>
            <span>₹{PRICE_MAX.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={currentMinPrice}
            onChange={e => updateFilter('minPrice', e.target.value)}
            placeholder="Min"
            min={0}
            className="flex-1 px-4 py-3 bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-medium text-[#222222] dark:text-white placeholder-[#B0B0B0] dark:placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all shadow-sm"
          />
          <span className="text-[#B0B0B0]">—</span>
          <input
            type="number"
            value={currentMaxPrice}
            onChange={e => updateFilter('maxPrice', e.target.value)}
            placeholder="Max"
            min={0}
            className="flex-1 px-4 py-3 bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-medium text-[#222222] dark:text-white placeholder-[#B0B0B0] dark:placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-semibold text-[#222222] mb-2">Item Condition</label>
        <div className="space-y-2">
          {([
            { value: 'excellent', icon: '⭐', label: 'Excellent' },
            { value: 'good', icon: '✅', label: 'Good' },
            { value: 'fair', icon: '⚠️', label: 'Fair' },
          ] as { value: ListingCondition; icon: string; label: string }[]).map((cond) => (
            <button
              key={cond.value}
              onClick={() => updateFilter('condition', currentCondition === cond.value ? '' : cond.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border transition-all ${
                currentCondition === cond.value
                  ? 'bg-[#222222] text-white border-[#222222]'
                  : 'border-[#DDDDDD] text-[#717171] hover:border-[#222222]'
              }`}
            >
              <span>{cond.icon} {cond.label}</span>
              <span>({conditionCounts[cond.value] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t border-black/5 pt-2 dark:border-white/5">
        <button
          onClick={() => updateFilter('verified', verifiedOnly ? '' : 'true')}
          className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-all ${
            verifiedOnly ? 'border-[#222222] bg-[#222222] text-white' : 'border-[#DDDDDD] text-[#222222]'
          }`}
        >
          Verified owners only
        </button>
        <button
          onClick={() => updateFilter('delivery', freeDeliveryOnly ? '' : 'true')}
          className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-all ${
            freeDeliveryOnly ? 'border-[#222222] bg-[#222222] text-white' : 'border-[#DDDDDD] text-[#222222]'
          }`}
        >
          Free delivery
        </button>
        <button
          onClick={() => updateFilter('availableNow', availableNowOnly ? '' : 'true')}
          className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-all ${
            availableNowOnly ? 'border-[#222222] bg-[#222222] text-white' : 'border-[#DDDDDD] text-[#222222]'
          }`}
        >
          Available now
        </button>
      </div>
    </div>
  )
}
