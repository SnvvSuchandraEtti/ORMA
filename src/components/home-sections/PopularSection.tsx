'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import ListingCard from '@/components/ListingCard'

export default function PopularSection() {
  const { user } = useAuth()
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [city, setCity] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPopular() {
      const supabase = createClient()
      
      // Determine City based on logged in user's profile
      let userCity = null
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('city').eq('id', user.id).single()
        if (profile?.city) {
          userCity = profile.city
          setCity(profile.city)
        }
      }

      // Fetch
      let query = supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('status', 'active')
        .order('average_rating', { ascending: false })
        .order('views_count', { ascending: false })
        .limit(8)

      // Try local city first, fallback to generic if weak
      if (userCity) {
        const { data: localData } = await query.eq('city', userCity)
        if (localData && localData.length >= 4) {
          setListings(localData as ListingWithDetails[])
          setIsLoading(false)
          return
        }
      }

      // Generic popular 
      const { data } = await supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('status', 'active')
        .order('average_rating', { ascending: false })
        .order('views_count', { ascending: false })
        .limit(8)
      
      if (data) setListings(data as ListingWithDetails[])
      setIsLoading(false)
    }

    fetchPopular()
  }, [user])

  if (isLoading || listings.length === 0) return null

  const scrollContainer = (dir: 'left' | 'right') => {
    const el = document.getElementById('popular-scroll-container')
    if (el) {
      el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
    }
  }

  const title = city ? `Popular in ${city}` : 'Popular Items Around You'

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="py-10 max-w-[2520px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#222222] dark:text-white">{title}</h2>
        <div className="hidden md:flex gap-2">
          <button onClick={() => scrollContainer('left')} className="p-2 rounded-full border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white hover:shadow-md transition bg-white dark:bg-[#121212]">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scrollContainer('right')} className="p-2 rounded-full border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white hover:shadow-md transition bg-white dark:bg-[#121212]">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        id="popular-scroll-container"
        className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar snap-x"
      >
        {listings.map(listing => (
          <div key={listing.id} className="min-w-[280px] sm:min-w-[300px] md:min-w-[1fr] snap-start shrink-0">
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </motion.section>
  )
}
