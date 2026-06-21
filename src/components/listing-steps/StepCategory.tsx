'use client'

import { useEffect, useState } from 'react'
import { Car, Bike, Camera, Laptop, Smartphone, Armchair, WashingMachine, Gamepad2, Wrench, Dumbbell, Music, PartyPopper, BookOpen, Plane, Shirt, Package, type LucideIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Category } from '@/types'
import { useListingFormStore } from '@/store/listingFormStore'

const ICON_MAP: Record<string, LucideIcon> = {
  Car, Bike, Camera, Laptop, Smartphone, Armchair, WashingMachine,
  Gamepad2, Wrench, Dumbbell, Music, PartyPopper, BookOpen, Plane, Shirt, Package,
}

export default function StepCategory() {
  const [categories, setCategories] = useState<Category[]>([])
  const { formData, updateFormData } = useListingFormStore()

  useEffect(() => {
    const supabase = createClient()
    supabase.from('categories').select('*').eq('is_active', true).order('display_order').then(({ data }) => {
      if (data) setCategories(data as Category[])
    })
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">What kind of item are you listing?</h2>
      <p className="text-[#717171] dark:text-[#A0A0A0] mb-6">Select the category that best describes your item.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon_name] || Package
          const isSelected = formData.category_id === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => updateFormData({ category_id: cat.id, category_name: cat.name })}
              className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all hover:border-[#222222] dark:border-white ${
                isSelected ? 'border-[#222222] dark:border-white bg-gray-50 dark:bg-[#1A1A1A]' : 'border-[#DDDDDD] dark:border-[#3D3D3D]'
              }`}
            >
              <Icon size={28} className={isSelected ? 'text-[#222222] dark:text-white dark:text-[#121212]' : 'text-[#717171] dark:text-[#A0A0A0]'} />
              <span className={`text-sm font-medium text-center ${isSelected ? 'text-[#222222] dark:text-white dark:text-[#121212]' : 'text-[#717171] dark:text-[#A0A0A0]'}`}>
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
