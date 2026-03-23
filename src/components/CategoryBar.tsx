'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, Car, Bike, Camera, Laptop, Smartphone, Armchair, Gamepad2, Wrench, Dumbbell, Music, BookOpen, Plane, Shirt, Package, WashingMachine, PartyPopper, type LucideIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Category } from '@/types'

// Icon name → Lucide component mapping
const ICON_MAP: Record<string, LucideIcon> = {
  Car,
  Bike,
  Camera,
  Laptop,
  Smartphone,
  Armchair,
  WashingMachine,
  Gamepad2,
  Wrench,
  Dumbbell,
  Music,
  PartyPopper,
  BookOpen,
  Plane,
  Shirt,
  Package,
}

export default function CategoryBar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
      if (data) setCategories(data as Category[])
    }
    fetchCategories()
  }, [])

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setShowLeftArrow(el.scrollLeft > 10)
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    updateArrows()
    return () => el.removeEventListener('scroll', updateArrows)
  }, [categories, updateArrows])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  const handleCategoryClick = (slug: string) => {
    if (selectedCategory === slug) {
      // Deselect
      router.push('/')
    } else {
      router.push(`/?category=${slug}`)
    }
  }

  return (
    <div className="fixed left-0 right-0 z-30 bg-white dark:bg-[#121212] transition-colors duration-300" style={{ top: '64px' }}>
      <nav aria-label="Categories" className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10 relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-[#121212] border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.18)] flex items-center justify-center hover:shadow-md transition-shadow"
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Scrollable categories */}
        <div
          ref={scrollRef}
          className="flex items-end gap-6 overflow-x-auto hide-scrollbar py-3 md:py-4"
          role="tablist"
          aria-label="Category filters"
          onKeyDown={(e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
            e.preventDefault()
            const buttons = scrollRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
            if (!buttons?.length) return
            const currentIdx = Array.from(buttons).findIndex(b => b === document.activeElement)
            let nextIdx = currentIdx
            if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % buttons.length
            else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + buttons.length) % buttons.length
            buttons[nextIdx]?.focus()
            buttons[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
          }}
        >
          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon_name] || Package
            const isActive = selectedCategory === cat.slug
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`flex flex-col items-center gap-1.5 min-w-[56px] pb-1 border-b-2 transition-all flex-shrink-0 ${
                  isActive
                    ? 'border-[#222222] dark:border-white opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#DDDDDD] dark:hover:border-[#3D3D3D]'
                }`}
                role="tab"
                aria-selected={isActive}
                aria-label={cat.name}
                tabIndex={isActive ? 0 : -1}
              >
                <IconComponent size={22} className={isActive ? 'text-[#222222] dark:text-white' : 'text-[#717171] dark:text-[#A0A0A0]'} />
                <span className={`text-[11px] font-medium whitespace-nowrap ${isActive ? 'text-[#222222] dark:text-white' : 'text-[#717171] dark:text-[#A0A0A0]'}`}>
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-[#121212] border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.18)] flex items-center justify-center hover:shadow-md transition-shadow"
            aria-label="Scroll categories right"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </nav>
    </div>
  )
}
