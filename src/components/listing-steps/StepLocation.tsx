'use client'

import { useListingFormStore } from '@/store/listingFormStore'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
]

export default function StepLocation() {
  const { formData, updateFormData } = useListingFormStore()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] mb-2">Where is the item located?</h2>
      <p className="text-[#717171] mb-6">Renters need to know where to pick up or receive the item.</p>

      <div className="space-y-5">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-[#222222] mb-1">
            City <span className="text-[#FF385C]">*</span>
          </label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={e => updateFormData({ city: e.target.value })}
            placeholder="e.g., Mumbai, Bangalore, Delhi"
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222] placeholder-[#B0B0B0]"
          />
        </div>

        {/* Area / Locality */}
        <div>
          <label htmlFor="area" className="block text-sm font-semibold text-[#222222] mb-1">
            Area / Locality
          </label>
          <input
            id="area"
            type="text"
            value={formData.area}
            onChange={e => updateFormData({ area: e.target.value })}
            placeholder="e.g., Bandra West, Koramangala, Connaught Place"
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222] placeholder-[#B0B0B0]"
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-[#222222] mb-1">
            State <span className="text-[#FF385C]">*</span>
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={e => updateFormData({ state: e.target.value })}
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222] bg-white"
          >
            <option value="">Select state</option>
            {INDIAN_STATES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Pincode */}
        <div>
          <label htmlFor="pincode" className="block text-sm font-semibold text-[#222222] mb-1">Pincode</label>
          <input
            id="pincode"
            type="text"
            value={formData.pincode}
            onChange={e => updateFormData({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            placeholder="6-digit pincode"
            maxLength={6}
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222] placeholder-[#B0B0B0]"
          />
        </div>
      </div>
    </div>
  )
}
