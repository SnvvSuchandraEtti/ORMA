'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useListingFormStore } from '@/store/listingFormStore'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/lib/utils'
import toast from '@/lib/toast'
import { useState } from 'react'
import { sanitizeInput } from '@/lib/sanitize'

export default function StepReview() {
  const { formData, resetForm } = useListingFormStore()
  const { user } = useAuth()
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const supabase = createClient()

  const handlePublish = async () => {
    if (!user) { toast.error('Please log in first'); return }
    if (!formData.category_id) { toast.error('Please select a category'); return }
    if (!formData.imageUrls.length) { toast.error('Please add at least one photo'); return }
    if (!formData.title) { toast.error('Please add a title'); return }
    if (!formData.price_per_day) { toast.error('Please set a price per day'); return }
    if (!formData.city || !formData.state) { toast.error('Please add location'); return }
    if (!formData.contact_phone && !formData.contact_whatsapp && !formData.contact_email) {
      toast.error('Please add at least one contact method')
      return
    }

    setIsPublishing(true)
    try {
      const { data, error } = await supabase
        .from('listings')
        .insert({
          owner_id: user.id,
          category_id: formData.category_id,
          title: sanitizeInput(formData.title.trim()),
          description: sanitizeInput(formData.description.trim()),
          condition: formData.condition,
          brand: sanitizeInput(formData.brand.trim()),
          model: sanitizeInput(formData.model.trim()),
          images: formData.imageUrls,
          price_per_hour: formData.price_per_hour ? parseFloat(formData.price_per_hour) : null,
          price_per_day: parseFloat(formData.price_per_day),
          price_per_week: formData.price_per_week ? parseFloat(formData.price_per_week) : null,
          price_per_month: formData.price_per_month ? parseFloat(formData.price_per_month) : null,
          security_deposit: formData.security_deposit ? parseFloat(formData.security_deposit) : 0,
          city: sanitizeInput(formData.city.trim()),
          area: sanitizeInput(formData.area.trim()),
          state: formData.state,
          pincode: sanitizeInput(formData.pincode.trim()),
          contact_phone: sanitizeInput(formData.contact_phone || ''),
          contact_whatsapp: sanitizeInput(formData.contact_whatsapp || ''),
          contact_email: sanitizeInput(formData.contact_email || ''),
          preferred_contact: formData.preferred_contact,
          terms_and_conditions: sanitizeInput(formData.terms_and_conditions.trim()),
          id_proof_required: formData.id_proof_required,
          delivery_available: formData.delivery_available,
          minimum_rental_period: sanitizeInput(formData.minimum_rental_period || ''),
          status: 'active',
          is_available: true,
        })
        .select('id')
        .single()

      if (error) throw error
      toast.success('🎉 Your item is now live on ORMA!')
      resetForm()
      router.push(`/listing/${data.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish. Please try again.'
      toast.error(msg)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] dark:text-white dark:text-[#121212] mb-2">Review and publish</h2>
      <p className="text-[#717171] dark:text-[#A0A0A0] mb-6">Here&apos;s a preview of your listing. Once published, renters can discover and contact you.</p>

      {/* Preview Card */}
      <div className="border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-2xl overflow-hidden mb-6">
        {/* Cover Image */}
        {formData.imageUrls[0] && (
          <div className="relative h-52 bg-gray-100">
            <Image src={formData.imageUrls[0]} alt="Cover" fill className="object-cover" unoptimized />
          </div>
        )}

        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#222222] dark:text-white dark:text-[#121212]">{formData.title || 'Untitled item'}</h3>
            <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">{formData.category_name}</p>
            <div className="flex items-center gap-1 text-sm text-[#717171] dark:text-[#A0A0A0] mt-1">
              <MapPin size={14} />
              <span>{[formData.area, formData.city, formData.state].filter(Boolean).join(', ') || 'No location set'}</span>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {formData.price_per_day && (
              <span className="font-semibold text-[#222222] dark:text-white dark:text-[#121212]">{formatPrice(parseFloat(formData.price_per_day))}/day</span>
            )}
            {formData.price_per_week && (
              <span className="text-sm text-[#717171] dark:text-[#A0A0A0]">{formatPrice(parseFloat(formData.price_per_week))}/week</span>
            )}
            {formData.price_per_month && (
              <span className="text-sm text-[#717171] dark:text-[#A0A0A0]">{formatPrice(parseFloat(formData.price_per_month))}/month</span>
            )}
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {[
              { label: 'Category selected', ok: !!formData.category_id },
              { label: `${formData.imageUrls.length} photo(s) added`, ok: formData.imageUrls.length > 0 },
              { label: 'Title & description', ok: !!formData.title && !!formData.description },
              { label: 'Price per day set', ok: !!formData.price_per_day },
              { label: 'Location set', ok: !!formData.city && !!formData.state },
              { label: 'Contact method provided', ok: !!(formData.contact_phone || formData.contact_whatsapp || formData.contact_email) },
            ].map(({ label, ok }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className={ok ? 'text-[#222222] dark:text-white dark:text-[#121212]' : 'text-[#B0B0B0] dark:text-[#6B6B6B]'} />
                <span className={ok ? 'text-[#222222] dark:text-white dark:text-[#121212]' : 'text-[#B0B0B0] dark:text-[#6B6B6B]'}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="flex gap-3 bg-gray-100 border border-blue-200 rounded-xl p-4 mb-6 text-sm">
        <Phone size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-800">Contact info stays private</p>
          <p className="text-blue-700">Your phone number is only shown to renters when they click &quot;Contact Owner&quot;. It&apos;s never shown publicly.</p>
        </div>
      </div>

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="w-full py-4 bg-[#000000] dark:bg-white text-white dark:text-[#121212] text-base font-semibold rounded-xl hover:bg-[#333333] dark:hover:bg-[#EBEBEB] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPublishing ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Publishing...
          </>
        ) : '🚀 Publish Listing'}
      </button>
    </div>
  )
}
