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
      el.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' })
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="py-12 border-t border-gray-100 dark:border-white/5"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#222222] dark:text-white tracking-tight">Recently viewed</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest">Picked up where you left off</p>
        </div>
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => scrollContainer('left')} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 text-[#222222] dark:text-white hover:bg-white dark:hover:bg-white/5 hover:shadow-lg transition-all active:scale-90 bg-white/50 dark:bg-black/20 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scrollContainer('right')} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 text-[#222222] dark:text-white hover:bg-white dark:hover:bg-white/5 hover:shadow-lg transition-all active:scale-90 bg-white/50 dark:bg-black/20 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        id="recent-scroll-container"
        className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar snap-x scroll-smooth"
      >
        {listings.map((listing, idx) => (
          <motion.div 
            key={listing.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="min-w-[280px] sm:min-w-[320px] snap-start shrink-0"
          >
            <ListingCard listing={listing} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
