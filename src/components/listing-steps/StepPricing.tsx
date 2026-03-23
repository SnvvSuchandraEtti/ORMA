'use client'

import { useListingFormStore } from '@/store/listingFormStore'

interface PriceInputProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  helper?: string
}

function PriceInput({ id, label, value, onChange, placeholder = '0', required, helper }: PriceInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">
        {label} {required && <span className="text-[#000000]">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#222222] dark:text-white font-semibold">₹</span>
        <input
          id={id}
          type="number"
          min={0}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 pr-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
        />
      </div>
      {helper && <p className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-1">{helper}</p>}
    </div>
  )
}

export default function StepPricing() {
  const { formData, updateFormData } = useListingFormStore()

  const suggestedWeekly = formData.price_per_day ? `₹${(parseFloat(formData.price_per_day) * 5).toLocaleString('en-IN')}` : ''
  const suggestedMonthly = formData.price_per_day ? `₹${(parseFloat(formData.price_per_day) * 20).toLocaleString('en-IN')}` : ''

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">Set your rental price</h2>
      <p className="text-[#717171] dark:text-[#A0A0A0] mb-6">You can set different prices for different rental periods. Price per day is required.</p>

      <div className="space-y-5">
        <PriceInput
          id="price-day"
          label="Price per day"
          required
          value={formData.price_per_day}
          onChange={v => updateFormData({ price_per_day: v })}
          placeholder="e.g., 500"
        />
        <PriceInput
          id="price-hour"
          label="Price per hour (optional)"
          value={formData.price_per_hour}
          onChange={v => updateFormData({ price_per_hour: v })}
          placeholder="e.g., 100"
          helper="Leave blank if hourly rental is not available"
        />
        <PriceInput
          id="price-week"
          label="Price per week (optional)"
          value={formData.price_per_week}
          onChange={v => updateFormData({ price_per_week: v })}
          placeholder="e.g., 2500"
          helper={suggestedWeekly ? `Suggested: ${suggestedWeekly} (daily × 5)` : undefined}
        />
        <PriceInput
          id="price-month"
          label="Price per month (optional)"
          value={formData.price_per_month}
          onChange={v => updateFormData({ price_per_month: v })}
          placeholder="e.g., 10000"
          helper={suggestedMonthly ? `Suggested: ${suggestedMonthly} (daily × 20)` : undefined}
        />
        <PriceInput
          id="security-deposit"
          label="Security deposit (optional)"
          value={formData.security_deposit}
          onChange={v => updateFormData({ security_deposit: v })}
          placeholder="e.g., 5000"
          helper="Refundable deposit collected at the start of rental"
        />
      </div>
    </div>
  )
}
