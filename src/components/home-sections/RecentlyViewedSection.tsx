'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import ListingCard from '@/components/ListingCard'

export default function RecentlyViewedSection() {
  const { viewedIds } = useRecentlyViewed()
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchViewed() {
      if (viewedIds.length === 0) {
        setIsLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .in('id', viewedIds)
        .eq('status', 'active')

      if (!error && data) {
        // Sort data to match viewedIds order (most recent first)
        const sorted = [...data].sort((a, b) => viewedIds.indexOf(a.id) - viewedIds.indexOf(b.id))
        setListings(sorted as ListingWithDetails[])
      }
      setIsLoading(false)
    }

    fetchViewed()
  }, [viewedIds])

  if (isLoading || listings.length === 0) return null

  const scrollContainer = (dir: 'left' | 'right') => {
    const el = document.getElementById('recent-scroll-container')
    if (el) {
      el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="py-10 max-w-[2520px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#222222] dark:text-white">Recently viewed</h2>
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
        id="recent-scroll-container"
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
