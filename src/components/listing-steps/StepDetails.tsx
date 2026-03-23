'use client'

import { useListingFormStore } from '@/store/listingFormStore'

export default function StepDetails() {
  const { formData, updateFormData } = useListingFormStore()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">Tell renters about your item</h2>
      <p className="text-[#717171] dark:text-[#A0A0A0] mb-6">Detailed descriptions get more inquiries.</p>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="item-title" className="text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212]">Item Title *</label>
            <span className="text-xs text-[#B0B0B0] dark:text-[#6B6B6B]">{formData.title.length}/100</span>
          </div>
          <input
            id="item-title"
            type="text"
            value={formData.title}
            onChange={e => updateFormData({ title: e.target.value.slice(0, 100) })}
            placeholder="e.g., Canon EOS R5 with 24-70mm f/2.8 Lens"
            className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="description" className="text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212]">Description *</label>
            <span className="text-xs text-[#B0B0B0] dark:text-[#6B6B6B]">{formData.description.length}/1000</span>
          </div>
          <textarea
            id="description"
            value={formData.description}
            onChange={e => updateFormData({ description: e.target.value.slice(0, 1000) })}
            placeholder="Describe your item — condition, what's included, special features, how to handle it..."
            rows={5}
            className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0] resize-none"
          />
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="brand" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">Brand (optional)</label>
            <input
              id="brand"
              type="text"
              value={formData.brand}
              onChange={e => updateFormData({ brand: e.target.value })}
              placeholder="e.g., Canon, Honda, Samsung"
              className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">Model (optional)</label>
            <input
              id="model"
              type="text"
              value={formData.model}
              onChange={e => updateFormData({ model: e.target.value })}
              placeholder="e.g., EOS R5, Activa 6G"
              className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
            />
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">Item Condition *</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {([
              { value: 'excellent', label: 'Excellent', desc: 'Like new, minimal to no signs of use' },
              { value: 'good', label: 'Good', desc: 'Normal wear, fully functional' },
              { value: 'fair', label: 'Fair', desc: 'Visible wear, but works properly' },
            ] as const).map(cond => (
              <button
                key={cond.value}
                type="button"
                onClick={() => updateFormData({ condition: cond.value })}
                className={`text-left p-4 border-2 rounded-xl transition-all ${
                  formData.condition === cond.value
                    ? 'border-[#222222] dark:border-white bg-gray-50 dark:bg-[#1A1A1A]'
                    : 'border-[#DDDDDD] dark:border-[#3D3D3D] hover:border-[#222222] dark:border-white'
                }`}
              >
                <p className="font-semibold text-sm text-[#222222] dark:text-white dark:text-[#121212]">{cond.label}</p>
                <p className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-0.5">{cond.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
