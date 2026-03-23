import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Category } from '@/types'

// Map aesthetic unsplash images to category slugs
const categoryImages: Record<string, string> = {
  cars: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
  bikes: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
  cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
  laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
  phones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
  tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
  consoles: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=800',
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  drones: 'https://images.unsplash.com/photo-1507580456885-eec3eb1c8172?auto=format&fit=crop&q=80&w=800',
  tools: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800',
  camping: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800',
  sports: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
  music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800',
  apparel: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
  books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800',
  other: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800'
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
      className="py-10 max-w-[2520px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20"
    >
      <h2 className="text-2xl font-semibold text-[#222222] dark:text-white mb-6">Browse by category</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => {
          const bgImage = categoryImages[category.slug] || categoryImages['other']
          return (
            <Link 
              key={category.id} 
              href={`/search?category=${category.slug}`}
              className="group relative h-48 md:h-64 rounded-2xl overflow-hidden cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm font-medium">
                  {category.listing_count} {category.listing_count === 1 ? 'item' : 'items'}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </motion.section>
  )
}
