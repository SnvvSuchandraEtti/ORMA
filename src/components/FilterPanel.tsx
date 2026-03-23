'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { ListingCondition } from '@/types'

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur']

interface FilterPanelProps {
  onClose?: () => void
}

export default function FilterPanel({ onClose }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentCity = searchParams.get('city') || ''
  const currentMinPrice = searchParams.get('minPrice') || ''
  const currentMaxPrice = searchParams.get('maxPrice') || ''
  const currentCondition = searchParams.get('condition') || ''
  const currentSort = searchParams.get('sort') || 'newest'

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

  return (
    <div className="bg-white space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#222222]">Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-sm underline text-[#717171] hover:text-[#222222]">
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-[#222222] mb-2">Sort by</label>
        <select
          value={currentSort}
          onChange={e => updateFilter('sort', e.target.value)}
          className="w-full px-3 py-2.5 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] bg-white"
        >
          <option value="newest">Newest first</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-[#222222] mb-2">City</label>
        <div className="flex flex-wrap gap-2">
          {CITIES.map(city => (
            <button
              key={city}
              onClick={() => updateFilter('city', currentCity === city ? '' : city)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                currentCity === city
                  ? 'bg-[#222222] text-white border-[#222222]'
                  : 'border-[#DDDDDD] text-[#717171] hover:border-[#222222]'
              }`}
            >
              {city}
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
        <label className="block text-sm font-semibold text-[#222222] mb-2">Price per day (₹)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={currentMinPrice}
            onChange={e => updateFilter('minPrice', e.target.value)}
            placeholder="Min"
            min={0}
            className="flex-1 px-3 py-2 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222]"
          />
          <span className="text-[#717171]">—</span>
          <input
            type="number"
            value={currentMaxPrice}
            onChange={e => updateFilter('maxPrice', e.target.value)}
            placeholder="Max"
            min={0}
            className="flex-1 px-3 py-2 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222]"
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-semibold text-[#222222] mb-2">Item Condition</label>
        <div className="flex flex-wrap gap-2">
          {(['excellent', 'good', 'fair'] as ListingCondition[]).map(cond => (
            <button
              key={cond}
              onClick={() => updateFilter('condition', currentCondition === cond ? '' : cond)}
              className={`px-3 py-1.5 rounded-full text-sm border capitalize transition-all ${
                currentCondition === cond
                  ? 'bg-[#222222] text-white border-[#222222]'
                  : 'border-[#DDDDDD] text-[#717171] hover:border-[#222222]'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
