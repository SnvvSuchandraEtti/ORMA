'use client'

import { useListingFormStore } from '@/store/listingFormStore'
import type { PreferredContact } from '@/types'

export default function StepContact() {
  const { formData, updateFormData } = useListingFormStore()

  const contactOptions: { value: PreferredContact; label: string }[] = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
    { value: 'all', label: 'All methods' },
  ]

  const minPeriods = ['Few hours', '1 day', '2 days', '3 days', '1 week', '1 month']

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">How should renters reach you?</h2>
      <p className="text-[#717171] dark:text-[#A0A0A0] mb-6">Provide at least one contact method. Your number won&apos;t show publicly until a renter contacts you.</p>

      <div className="space-y-5">
        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">Phone Number</label>
          <div className="flex">
            <span className="flex items-center px-3 border border-r-0 border-[#DDDDDD] dark:border-[#3D3D3D] rounded-l-xl bg-gray-50 dark:bg-[#1A1A1A] text-[#717171] dark:text-[#A0A0A0] text-sm">+91</span>
            <input
              id="contact-phone"
              type="tel"
              value={formData.contact_phone}
              onChange={e => updateFormData({ contact_phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="10-digit mobile number"
              maxLength={10}
              className="flex-1 px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-r-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="contact-wa" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">WhatsApp Number</label>
          <div className="flex">
            <span className="flex items-center px-3 border border-r-0 border-[#DDDDDD] dark:border-[#3D3D3D] rounded-l-xl bg-gray-50 dark:bg-[#1A1A1A] text-[#717171] dark:text-[#A0A0A0] text-sm">+91</span>
            <input
              id="contact-wa"
              type="tel"
              value={formData.contact_whatsapp}
              onChange={e => updateFormData({ contact_whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="Same as phone, or different"
              maxLength={10}
              className="flex-1 px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-r-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">Email (optional)</label>
          <input
            id="contact-email"
            type="email"
            value={formData.contact_email}
            onChange={e => updateFormData({ contact_email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0]"
          />
        </div>

        {/* Preferred contact method */}
        <div>
          <label className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">Preferred contact method</label>
          <div className="flex flex-wrap gap-2">
            {contactOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateFormData({ preferred_contact: opt.value })}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  formData.preferred_contact === opt.value
                    ? 'bg-[#222222] dark:bg-white text-white dark:text-[#121212] border-[#222222] dark:border-white'
                    : 'border-[#DDDDDD] dark:border-[#3D3D3D] text-[#717171] dark:text-[#A0A0A0] hover:border-[#222222] dark:border-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#EBEBEB] dark:border-[#3D3D3D] pt-5">
          <h3 className="text-base font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-4">Rental Terms</h3>

          <div className="space-y-4">
            {/* Minimum rental period */}
            <div>
              <label htmlFor="min-period" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">Minimum rental period</label>
              <select
                id="min-period"
                value={formData.minimum_rental_period}
                onChange={e => updateFormData({ minimum_rental_period: e.target.value })}
                className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] bg-white dark:bg-[#121212]"
              >
                {minPeriods.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* ID proof */}
            <div className="flex items-center gap-3">
              <input
                id="id-proof"
                type="checkbox"
                checked={formData.id_proof_required}
                onChange={e => updateFormData({ id_proof_required: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              <label htmlFor="id-proof" className="text-sm text-[#222222] dark:text-white dark:text-[#121212] cursor-pointer">
                ID proof required (Aadhaar, Passport, Driving License)
              </label>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-3">
              <input
                id="delivery"
                type="checkbox"
                checked={formData.delivery_available}
                onChange={e => updateFormData({ delivery_available: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              <label htmlFor="delivery" className="text-sm text-[#222222] dark:text-white dark:text-[#121212] cursor-pointer">
                I can deliver to the renter&apos;s location (add delivery charges in terms)
              </label>
            </div>

            {/* Terms */}
            <div>
              <label htmlFor="terms" className="block text-sm font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-1">Additional terms & conditions (optional)</label>
              <textarea
                id="terms"
                value={formData.terms_and_conditions}
                onChange={e => updateFormData({ terms_and_conditions: e.target.value })}
                placeholder="e.g., Renter must have a valid driving license. No smoking near the vehicle..."
                rows={3}
                className="w-full px-4 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:outline-none focus:border-[#222222] dark:border-white text-[#222222] dark:text-white dark:text-[#121212] placeholder-[#B0B0B0] resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
