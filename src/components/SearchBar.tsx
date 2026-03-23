'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, MapPin, Sparkles } from 'lucide-react'

const POPULAR = ['Camera', 'Car', 'Bike', 'Laptop', 'Tent', 'Gaming Setup', 'Guitar', 'Drone']

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setLocation(searchParams.get('city') || '')
  }, [searchParams])

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (location.trim()) params.set('city', location.trim())
    router.push(`/search?${params.toString()}`)
    inputRef.current?.blur()
    setIsFocused(false)
  }

  const handlePopular = (term: string) => {
    setQuery(term)
    const params = new URLSearchParams()
    params.set('q', term)
    if (location) params.set('city', location)
    router.push(`/search?${params.toString()}`)
    setIsFocused(false)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
      <div className={`flex items-center border-2 rounded-full transition-all ${
        isFocused ? 'border-[#222222] shadow-[0_2px_4px_rgba(0,0,0,0.18)]' : 'border-[#DDDDDD] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
      }`}>
        {/* What */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 min-w-0">
          <Search size={18} className="text-[#717171] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="What do you want to rent?"
            className="flex-1 bg-transparent outline-none text-[#222222] placeholder-[#717171] text-sm min-w-0"
            aria-label="Search query"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-[#B0B0B0] hover:text-[#222222]">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#DDDDDD] flex-shrink-0" />

        {/* Where */}
        <div className="flex items-center gap-2 px-4 py-3">
          <MapPin size={16} className="text-[#717171] flex-shrink-0" />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City"
            className="bg-transparent outline-none text-[#222222] placeholder-[#717171] text-sm w-24 md:w-32"
            aria-label="City"
          />
          {location && (
            <button type="button" onClick={() => setLocation('')} className="text-[#B0B0B0] hover:text-[#222222]">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="mr-2 w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center hover:bg-[#333333] transition-colors"
          aria-label="Search"
        >
          <Search size={16} className="text-white" />
        </button>
      </div>

      {/* Popular suggestions dropdown */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EBEBEB] rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] py-3 z-50 animate-[slideDown_0.2s_ease-out]">
          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-[#717171] flex items-center gap-1.5 mb-2">
              <Sparkles size={12} /> Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map(term => (
                <button
                  key={term}
                  type="button"
                  onMouseDown={() => handlePopular(term)}
                  className="px-3 py-1.5 border border-[#DDDDDD] rounded-full text-sm text-[#222222] hover:border-[#222222] hover:bg-gray-50 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
