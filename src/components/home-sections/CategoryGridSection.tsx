import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Category } from '@/types'

// Map aesthetic premium local images to category slugs
const categoryImages: Record<string, string> = {
  cars: '/images/categories/cars.png',
  bikes: '/images/categories/bikes.png',
  cameras: '/images/categories/cameras.png',
  laptops: '/images/categories/laptops.png',
  phones: '/images/categories/other.png',
  tablets: '/images/categories/other.png',
  consoles: '/images/categories/gaming.png', // Fallback for old seed data
  gaming: '/images/categories/gaming.png',
  furniture: '/images/categories/furniture.png',
  drones: '/images/categories/other.png',
  tools: '/images/categories/other.png',
  camping: '/images/categories/other.png',
  sports: '/images/categories/other.png',
  music: '/images/categories/musical-instruments.png', // Fallback for old seed data
  'musical-instruments': '/images/categories/musical-instruments.png',
  events: '/images/categories/events.png',
  apparel: '/images/categories/other.png',
  books: '/images/categories/other.png',
  other: '/images/categories/other.png'
}

type CategoryWithCount = Category & { listing_count: number }

export default function CategoryGridSection() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([])

  useEffect(() => {
    async function fetchCats() {
      const supabase = createClient()
      const { data } = await supabase.from('categories').select('*').eq('is_active', true)
      
      if (data) {
        // Fetch raw counts from listings to sort by popularity
        const { data: countData } = await supabase.from('listings').select('category_id')
        
        const counts: Record<number, number> = {}
        countData?.forEach(item => {
          counts[item.category_id] = (counts[item.category_id] || 0) + 1
        })

        const mapped = data.map(c => ({
          ...c,
          listing_count: counts[c.id] || 0
        })).sort((a, b) => b.listing_count - a.listing_count).slice(0, 8) // Get top 8

        setCategories(mapped)
      }
    }
    fetchCats()
  }, [])

  if (categories.length === 0) return null

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="py-12 border-t border-gray-100 dark:border-white/5"
    >
      <div className="space-y-1 mb-10">
        <h2 className="text-2xl font-extrabold text-[#222222] dark:text-white tracking-tight">Browse by category</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest">Find exactly what you need</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {categories.map((category, idx) => {
          const bgImage = categoryImages[category.slug] || categoryImages['other']
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                href={`/search?category=${category.slug}`}
                className="group relative h-48 md:h-72 rounded-[2.5rem] overflow-hidden cursor-pointer flex flex-col justify-end p-6 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-lg font-bold mb-0.5">{category.name}</h3>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                    {category.listing_count} {category.listing_count === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
