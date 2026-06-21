'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, MapPin, History, Flame, Folder, List, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const TRENDING = [
  'PlayStation 5',
  'Wedding camera',
  'Laptop for coding',
  'Party speakers',
  'GoPro camera',
  'Royal Enfield bike',
  'Projector for events',
  'Drone camera',
]
const COMMON_TERMS = ['camera', 'laptop', 'speaker', 'bike', 'car', 'projector', 'drone', 'guitar']

type SuggestionItem =
  | { type: 'recent'; label: string; value: string }
  | { type: 'trending'; label: string; value: string }
  | { type: 'listing'; label: string; value: string }
  | { type: 'category'; label: string; value: string; count: number }
const suggestionsCache = new Map<string, { listings: string[], categories: { slug: string, name: string, count: number }[] }>()

export default function SearchBar() {
  const supabase = createClient()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [listingSuggestions, setListingSuggestions] = useState<string[]>([])
  const [categorySuggestions, setCategorySuggestions] = useState<{ slug: string; name: string; count: number }[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [allCategories, setAllCategories] = useState<{ id: number; slug: string; name: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setLocation(searchParams.get('city') || '')
  }, [searchParams])

  useEffect(() => {
    const stored = localStorage.getItem('orma_recent_searches')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as string[]
      if (Array.isArray(parsed)) setRecentSearches(parsed.slice(0, 5))
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase.from('categories').select('id,slug,name').eq('is_active', true)
      if (data) setAllCategories(data)
    }
    loadCategories()
  }, [supabase])

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setListingSuggestions([])
      setCategorySuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    const cacheKey = trimmed.toLowerCase()
    if (suggestionsCache.has(cacheKey)) {
      const cached = suggestionsCache.get(cacheKey)!
      setListingSuggestions(cached.listings)
      setCategorySuggestions(cached.categories)
      setIsLoadingSuggestions(false)
      return
    }

    let isCancelled = false

    const timer = window.setTimeout(async () => {
      try {
        setIsLoadingSuggestions(true)
        
        const matchedCategories = allCategories
          .filter((cat) => cat.name.toLowerCase().includes(trimmed.toLowerCase()))
          .slice(0, 3)

        const [listingsRes, ...categoryCountsRes] = await Promise.all([
          supabase
            .from('listings')
            .select('title')
            .ilike('title', `%${trimmed}%`)
            .eq('status', 'active')
            .limit(5),
          ...matchedCategories.map(cat => 
            supabase
              .from('listings')
              .select('id', { count: 'exact', head: true })
              .eq('category_id', cat.id)
              .eq('status', 'active')
              .then(({ count }) => ({ slug: cat.slug, name: cat.name, count: count || 0 }))
          )
        ])

        if (isCancelled) {
          setIsLoadingSuggestions(false)
          return
        }

        const uniqueTitles = Array.from(new Set((listingsRes.data || []).map((item) => item.title))).slice(0, 5)
        const categories = categoryCountsRes.length > 0 ? categoryCountsRes : []
        
        suggestionsCache.set(cacheKey, { listings: uniqueTitles, categories })
        setListingSuggestions(uniqueTitles)
        setCategorySuggestions(categories)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      } finally {
        setIsLoadingSuggestions(false)
      }
    }, 250)

    return () => {
      isCancelled = true
      window.clearTimeout(timer)
    }
  }, [allCategories, query, supabase])

  const persistRecentSearch = (term: string) => {
    const trimmed = term.trim()
    if (!trimmed) return
    const next = [trimmed, ...recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5)
    setRecentSearches(next)
    localStorage.setItem('orma_recent_searches', JSON.stringify(next))
  }

  const runSearch = (term: string, cityValue: string) => {
    const params = new URLSearchParams()
    if (term.trim()) params.set('q', term.trim())
    if (cityValue.trim()) params.set('city', cityValue.trim())
    router.push(`/search?${params.toString()}`)
    setShowDropdown(false)
    setIsFocused(false)
    setActiveIndex(-1)
  }

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    persistRecentSearch(query)
    runSearch(query, location)
    inputRef.current?.blur()
  }

  const handleTermPick = (term: string) => {
    setQuery(term)
    persistRecentSearch(term)
    runSearch(term, location)
  }

  const handleCategoryPick = (slug: string) => {
    const params = new URLSearchParams()
    params.set('category', slug)
    if (location.trim()) params.set('city', location.trim())
    router.push(`/search?${params.toString()}`)
    setShowDropdown(false)
    setIsFocused(false)
    setActiveIndex(-1)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('orma_recent_searches')
  }

  const suggestionItems = useMemo<SuggestionItem[]>(() => {
    const items: SuggestionItem[] = []
    recentSearches.forEach((term) => items.push({ type: 'recent', label: term, value: term }))
    TRENDING.slice(0, 4).forEach((term) => items.push({ type: 'trending', label: term, value: term }))
    listingSuggestions.forEach((title) => items.push({ type: 'listing', label: title, value: title }))
    categorySuggestions.forEach((cat) =>
      items.push({ type: 'category', label: cat.name, value: cat.slug, count: cat.count })
    )
    return items
  }, [categorySuggestions, listingSuggestions, recentSearches])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestionItems.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % suggestionItems.length)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? suggestionItems.length - 1 : prev - 1))
      return
    }
    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      const item = suggestionItems[activeIndex]
      if (item.type === 'category') {
        handleCategoryPick(item.value)
      } else {
        handleTermPick(item.value)
      }
      return
    }
    if (e.key === 'Escape') {
      setShowDropdown(false)
      setActiveIndex(-1)
    }
  }

  return (
    <form ref={wrapperRef} onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
      <div className={`flex items-center border rounded-full transition-all bg-[#F5F5F7]/80 dark:bg-[#2C2C2E]/80 backdrop-blur-md ${
        isFocused ? 'border-[#222222] dark:border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.12)]' : 'border-[#D2D2D7] dark:border-[#38383A] shadow-sm hover:shadow-md'
      }`}>
        {/* What */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 min-w-0">
          <Search size={18} className="text-[#717171] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => { setIsFocused(true); setShowDropdown(true) }}
            onKeyDown={handleKeyDown}
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
        <div className="w-px h-6 bg-[#D2D2D7] dark:bg-[#505055] flex-shrink-0" />

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

      {/* Professional autocomplete dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EBEBEB] rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] py-3 z-50 animate-[slideDown_0.2s_ease-out]">
          {recentSearches.length > 0 && (
            <div className="px-4 pb-2">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#717171] flex items-center gap-1.5">
                  <History size={12} /> Recent Searches
                </p>
                <button
                  type="button"
                  onMouseDown={clearRecentSearches}
                  className="text-[11px] text-[#717171] hover:text-[#222222] flex items-center gap-1"
                >
                  <Trash2 size={11} /> Clear
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((term) => (
                  <button
                    key={`recent-${term}`}
                    type="button"
                    onMouseDown={() => handleTermPick(term)}
                    className="w-full text-left rounded-lg px-2 py-1.5 text-sm text-[#222222] hover:bg-[#F7F7F7]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-[#717171] flex items-center gap-1.5 mb-2">
              <Flame size={12} /> Trending Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {TRENDING.slice(0, 4).map((term) => (
                <button
                  key={`trend-${term}`}
                  type="button"
                  onMouseDown={() => handleTermPick(term)}
                  className="px-3 py-1.5 border border-[#DDDDDD] rounded-full text-sm text-[#222222] hover:border-[#222222] hover:bg-gray-50 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {query.trim().length >= 2 && (
            <>
              <div className="px-4 pb-2">
                <p className="text-xs font-semibold text-[#717171] flex items-center gap-1.5 mb-2">
                  <List size={12} /> Suggestions
                </p>
                {isLoadingSuggestions ? (
                  <p className="text-sm text-[#717171] px-2 py-1">Loading suggestions...</p>
                ) : listingSuggestions.length === 0 ? (
                  <p className="text-sm text-[#717171] px-2 py-1">No listing suggestions yet</p>
                ) : (
                  <div className="space-y-1">
                    {listingSuggestions.map((title) => {
                      const idx = suggestionItems.findIndex((item) => item.type === 'listing' && item.value === title)
                      return (
                        <button
                          key={`listing-${title}`}
                          type="button"
                          onMouseDown={() => handleTermPick(title)}
                          className={`w-full text-left rounded-lg px-2 py-1.5 text-sm ${
                            idx === activeIndex ? 'bg-[#F0F0F0]' : 'hover:bg-[#F7F7F7]'
                          }`}
                        >
                          "{query.trim()}" {'->'} {title}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="px-4 pb-1">
                <p className="text-xs font-semibold text-[#717171] flex items-center gap-1.5 mb-2">
                  <Folder size={12} /> Categories
                </p>
                {categorySuggestions.length === 0 ? (
                  <p className="text-sm text-[#717171] px-2 py-1">
                    {COMMON_TERMS.find((term) => term.startsWith(query.toLowerCase()))
                      ? `Did you mean "${COMMON_TERMS.find((term) => term.startsWith(query.toLowerCase()))}"?`
                      : 'No category matches'}
                  </p>
                ) : (
                  <div className="space-y-1">
                    {categorySuggestions.map((cat) => {
                      const idx = suggestionItems.findIndex((item) => item.type === 'category' && item.value === cat.slug)
                      return (
                        <button
                          key={`category-${cat.slug}`}
                          type="button"
                          onMouseDown={() => handleCategoryPick(cat.slug)}
                          className={`w-full text-left rounded-lg px-2 py-1.5 text-sm ${
                            idx === activeIndex ? 'bg-[#F0F0F0]' : 'hover:bg-[#F7F7F7]'
                          }`}
                        >
                          {cat.name} ({cat.count} items)
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </form>
  )
}
