'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import type { ListingWithDetails, ListingCondition, PreferredContact } from '@/types'
import { 
  ChevronDown, ChevronUp, X, UploadCloud, 
  Trash2, AlertCircle, RefreshCw
} from 'lucide-react'
import Image from 'next/image'
import toast from '@/lib/toast'
import { handleSupabaseError } from '@/lib/handleError'
import { useDropzone } from 'react-dropzone'
import { sanitizeInput } from '@/lib/sanitize'

export default function EditListingPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const supabase = createClient()
  const { user, isAuthenticated } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [listing, setListing] = useState<ListingWithDetails | null>(null)
  
  // Form State
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    condition: 'good' as ListingCondition,
    brand: '',
    model: '',
    price_per_hour: '',
    price_per_day: '',
    price_per_week: '',
    price_per_month: '',
    security_deposit: '',
    city: '',
    area: '',
    state: '',
    pincode: '',
    contact_phone: '',
    contact_whatsapp: '',
    contact_email: '',
    preferred_contact: 'all' as PreferredContact,
    terms_and_conditions: '',
    id_proof_required: false,
    delivery_available: false,
    minimum_rental_period: ''
  })

  // Accordion state
  const [openSection, setOpenSection] = useState<'photos'|'details'|'pricing'|'location'|'contact'>('photos')

  // Fetch Listing
  const fetchListing = useCallback(async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('id', id)
        .single()

      if (error || !data) {
        toast.error('Listing not found')
        router.push('/my-listings')
        return
      }

      if (data.owner_id !== user.id) {
        toast.error('Unauthorized')
        router.push('/')
        return
      }

      setListing(data as ListingWithDetails)
      setImageUrls(data.images || [])
      setFormData({
        title: data.title || '',
        description: data.description || '',
        condition: data.condition || 'good',
        brand: data.brand || '',
        model: data.model || '',
        price_per_hour: data.price_per_hour ? data.price_per_hour.toString() : '',
        price_per_day: data.price_per_day ? data.price_per_day.toString() : '',
        price_per_week: data.price_per_week ? data.price_per_week.toString() : '',
        price_per_month: data.price_per_month ? data.price_per_month.toString() : '',
        security_deposit: data.security_deposit ? data.security_deposit.toString() : '',
        city: data.city || '',
        area: data.area || '',
        state: data.state || '',
        pincode: data.pincode || '',
        contact_phone: data.contact_phone || '',
        contact_whatsapp: data.contact_whatsapp || '',
        contact_email: data.contact_email || '',
        preferred_contact: data.preferred_contact || 'all',
        terms_and_conditions: data.terms_and_conditions || '',
        id_proof_required: !!data.id_proof_required,
        delivery_available: !!data.delivery_available,
        minimum_rental_period: data.minimum_rental_period || ''
      })
    } catch (err) {
      handleSupabaseError(err, 'fetchEditListing')
    } finally {
      setIsLoading(false)
    }
  }, [id, supabase, user, router])

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchListing()
    } else if (isAuthenticated === false) {
      router.push('/')
    }
  }, [isAuthenticated, user, fetchListing, router])

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Image Upload
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return
    const remaining = 10 - imageUrls.length
    const toUpload = acceptedFiles.slice(0, remaining)
    if (!toUpload.length) { toast.error('Maximum 10 photos allowed'); return }

    setUploading(true)
    const newUrls: string[] = []

    for (const file of toUpload) {
      const path = `${user.id}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const { error } = await supabase.storage.from('listing-images').upload(path, file, { upsert: false })
      if (error) { toast.error(`Failed to upload ${file.name}`); continue }
      const { data: urlData } = supabase.storage.from('listing-images').getPublicUrl(path)
      if (urlData?.publicUrl) newUrls.push(urlData.publicUrl)
    }

    setImageUrls(prev => [...prev, ...newUrls])
    setUploading(false)
    if (newUrls.length) toast.success(`${newUrls.length} photo(s) uploaded!`)
  }, [imageUrls.length, supabase, user])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
    disabled: uploading || imageUrls.length >= 10,
  })

  // Submit
  const handleSave = async () => {
    if (!formData.title || !formData.price_per_day || imageUrls.length === 0) {
      toast.error('Title, Daily Price, and at least 1 Photo are required')
      return
    }

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('listings')
        .update({
          title: sanitizeInput(formData.title),
          description: sanitizeInput(formData.description),
          condition: formData.condition,
          brand: sanitizeInput(formData.brand),
          model: sanitizeInput(formData.model),
          price_per_hour: formData.price_per_hour ? parseFloat(formData.price_per_hour) : null,
          price_per_day: parseFloat(formData.price_per_day),
          price_per_week: formData.price_per_week ? parseFloat(formData.price_per_week) : null,
          price_per_month: formData.price_per_month ? parseFloat(formData.price_per_month) : null,
          security_deposit: parseFloat(formData.security_deposit || '0'),
          city: sanitizeInput(formData.city),
          area: sanitizeInput(formData.area),
          state: formData.state,
          pincode: sanitizeInput(formData.pincode),
          contact_phone: sanitizeInput(formData.contact_phone),
          contact_whatsapp: sanitizeInput(formData.contact_whatsapp),
          contact_email: sanitizeInput(formData.contact_email),
          preferred_contact: formData.preferred_contact,
          terms_and_conditions: sanitizeInput(formData.terms_and_conditions),
          id_proof_required: formData.id_proof_required,
          delivery_available: formData.delivery_available,
          minimum_rental_period: sanitizeInput(formData.minimum_rental_period),
          images: imageUrls,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      toast.success('Listing updated successfully!')
      router.push(`/listing/${id}`)
    } catch (err) {
      handleSupabaseError(err, 'updateListing')
    } finally {
      setIsSaving(false)
    }
  }

  // Delete
  const handleDelete = async () => {
    if (!confirm('Are you absolutely sure you want to delete this listing? This cannot be undone.')) return
    
    setIsDeleting(true)
    try {
      const { error } = await supabase.from('listings').delete().eq('id', id)
      if (error) throw error
      toast.success('Listing permanently deleted')
      router.push('/my-listings')
    } catch (err) {
      handleSupabaseError(err, 'deleteListing')
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 mt-20 flex justify-center">
        <RefreshCw className="animate-spin text-[#717171] dark:text-[#A0A0A0]" size={32} />
      </div>
    )
  }

  if (!listing) return null

  const SectionHeader = ({ id, title }: { id: typeof openSection, title: string }) => (
    <button
      onClick={() => setOpenSection(openSection === id ? id : id)} // Keep open or just switch (let's make them behave like radio tabs for simplicity to keep one open, or toggles)
      className="w-full flex items-center justify-between py-4 focus:outline-none"
    >
      <h2 className="text-xl font-semibold text-[#222222] dark:text-white">{title}</h2>
      {openSection === id ? <ChevronUp size={20} className="text-[#717171] dark:text-[#A0A0A0]" /> : <ChevronDown size={20} className="text-[#717171] dark:text-[#A0A0A0]" />}
    </button>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 pb-32 bg-white dark:bg-[#121212]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-[#222222] dark:text-white">Edit Listing</h1>
        <button 
          onClick={() => router.push('/my-listings')}
          className="text-sm font-semibold underline text-[#222222] dark:text-white hover:no-underline"
        >
          Cancel
        </button>
      </div>

      {/* Category (Read Only) */}
      <div className="bg-[#F7F7F7] dark:bg-[#1A1A1A] p-4 rounded-xl mb-6 flex items-center gap-3">
        <AlertCircle className="text-[#717171] dark:text-[#A0A0A0]" size={20} />
        <div>
          <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">Category</p>
          <p className="font-semibold text-[#222222] dark:text-white">{listing.category?.name}</p>
        </div>
        <div className="ml-auto text-xs text-[#717171] dark:text-[#A0A0A0] uppercase tracking-wider font-bold">Non-editable</div>
      </div>

      <div className="space-y-2 border-t border-[#EBEBEB] dark:border-[#3D3D3D]">
        
        {/* PHOTOS */}
        <div className="border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
          <SectionHeader id="photos" title="Photos" />
          {openSection === 'photos' && (
            <div className="pb-6 animate-[fadeIn_0.3s_ease-out]">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-[#000000] bg-gray-50 dark:bg-[#1A1A1A]' : 'border-[#DDDDDD] dark:border-[#3D3D3D] hover:border-[#222222] dark:border-[#6B6B6B]'
                } ${imageUrls.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input {...getInputProps()} />
                <UploadCloud size={32} className="mx-auto text-[#717171] dark:text-[#A0A0A0] mb-2" />
                <p className="text-[#222222] dark:text-white font-medium text-sm">
                  {uploading ? 'Uploading...' : 'Click or drag new photos'}
                </p>
                <p className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-1">Up to 10 photos</p>
              </div>

              {imageUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square">
                      <Image src={url} alt={`Photo ${idx + 1}`} fill className="object-cover" unoptimized />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-[#222222] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                          Cover
                        </span>
                      )}
                      <button
                        onClick={() => setImageUrls(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 w-6 h-6 bg-white dark:bg-[#1E1E1E]/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {uploading && (
                    <div className="aspect-square rounded-xl border-2 border-dashed border-[#DDDDDD] dark:border-[#3D3D3D] flex items-center justify-center">
                      <RefreshCw size={20} className="animate-spin text-[#717171] dark:text-[#A0A0A0]" />
                    </div>
                  )}
                </div>
              )}
              {imageUrls.length === 0 && <p className="text-red-500 text-sm mt-2">At least 1 photo is required.</p>}
            </div>
          )}
        </div>

        {/* BASIC DETAILS */}
        <div className="border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
          <button onClick={() => setOpenSection('details')} className="w-full flex items-center justify-between py-4 focus:outline-none">
            <h2 className="text-xl font-semibold text-[#222222] dark:text-white">Basic Details</h2>
            {openSection === 'details' ? <ChevronUp size={20} className="text-[#717171] dark:text-[#A0A0A0]" /> : <ChevronDown size={20} className="text-[#717171] dark:text-[#A0A0A0]" />}
          </button>
          {openSection === 'details' && (
            <div className="pb-6 space-y-4 animate-[fadeIn_0.3s_ease-out]">
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Condition</label>
                  <select name="condition" value={formData.condition} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none bg-white dark:bg-[#1E1E1E]">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Model</label>
                  <input type="text" name="model" value={formData.model} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PRICING */}
        <div className="border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
          <button onClick={() => setOpenSection('pricing')} className="w-full flex items-center justify-between py-4 focus:outline-none">
            <h2 className="text-xl font-semibold text-[#222222] dark:text-white">Pricing (₹)</h2>
            {openSection === 'pricing' ? <ChevronUp size={20} className="text-[#717171] dark:text-[#A0A0A0]" /> : <ChevronDown size={20} className="text-[#717171] dark:text-[#A0A0A0]" />}
          </button>
          {openSection === 'pricing' && (
            <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease-out]">
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Price per Day *</label>
                <input type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Security Deposit</label>
                <input type="number" name="security_deposit" value={formData.security_deposit} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Price per Hour</label>
                <input type="number" name="price_per_hour" value={formData.price_per_hour} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Price per Week</label>
                <input type="number" name="price_per_week" value={formData.price_per_week} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Price per Month</label>
                <input type="number" name="price_per_month" value={formData.price_per_month} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
              </div>
            </div>
          )}
        </div>

        {/* LOCATION */}
        <div className="border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
          <button onClick={() => setOpenSection('location')} className="w-full flex items-center justify-between py-4 focus:outline-none">
            <h2 className="text-xl font-semibold text-[#222222] dark:text-white">Location</h2>
            {openSection === 'location' ? <ChevronUp size={20} className="text-[#717171] dark:text-[#A0A0A0]" /> : <ChevronDown size={20} className="text-[#717171] dark:text-[#A0A0A0]" />}
          </button>
          {openSection === 'location' && (
            <div className="pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease-out]">
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Area / Neighborhood</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" required />
              </div>
            </div>
          )}
        </div>

        {/* CONTACT & TERMS */}
        <div className="border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
          <button onClick={() => setOpenSection('contact')} className="w-full flex items-center justify-between py-4 focus:outline-none">
            <h2 className="text-xl font-semibold text-[#222222] dark:text-white">Contact & Terms</h2>
            {openSection === 'contact' ? <ChevronUp size={20} className="text-[#717171] dark:text-[#A0A0A0]" /> : <ChevronDown size={20} className="text-[#717171] dark:text-[#A0A0A0]" />}
          </button>
          {openSection === 'contact' && (
            <div className="pb-6 space-y-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Phone</label>
                  <input type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">WhatsApp</label>
                  <input type="tel" name="contact_whatsapp" value={formData.contact_whatsapp} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Email</label>
                  <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Preferred Contact</label>
                  <select name="preferred_contact" value={formData.preferred_contact} onChange={handleChange}
                    className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none bg-white dark:bg-[#1E1E1E]">
                    <option value="all">Any</option>
                    <option value="phone">Phone only</option>
                    <option value="whatsapp">WhatsApp only</option>
                    <option value="email">Email only</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-1">Terms & Conditions</label>
                <textarea name="terms_and_conditions" value={formData.terms_and_conditions} onChange={handleChange} rows={3}
                  className="w-full p-3 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl focus:border-[#222222] dark:border-[#6B6B6B] focus:ring-1 focus:ring-[#222222] outline-none" />
              </div>
              <div className="flex gap-4 flex-wrap pt-2">
                <label className="flex items-center gap-2 text-sm text-[#222222] dark:text-white cursor-pointer">
                  <input type="checkbox" name="id_proof_required" checked={formData.id_proof_required} onChange={handleChange}
                    className="w-5 h-5 rounded border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white focus:ring-[#222222]" />
                  ID Proof Required
                </label>
                <label className="flex items-center gap-2 text-sm text-[#222222] dark:text-white cursor-pointer">
                  <input type="checkbox" name="delivery_available" checked={formData.delivery_available} onChange={handleChange}
                    className="w-5 h-5 rounded border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white focus:ring-[#222222]" />
                  Delivery Available
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1E1E1E] border-t border-[#DDDDDD] dark:border-[#3D3D3D] z-40 flex justify-between items-center px-4 md:px-10 lg:px-20 xl:px-40">
        <button
          onClick={handleDelete}
          disabled={isDeleting || isSaving}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Delete Listing</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/my-listings')}
            disabled={isSaving || isDeleting}
            className="px-5 py-2.5 text-sm font-semibold text-[#222222] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2D2D2D] rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isDeleting || imageUrls.length === 0}
            className="px-6 py-2.5 bg-[#0071E3] text-white font-semibold rounded-lg hover:bg-[#0055B3] hover:shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving && <RefreshCw size={16} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
