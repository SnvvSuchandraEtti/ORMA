'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useListingFormStore } from '@/store/listingFormStore'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

export default function StepPhotos() {
  const { formData, updateFormData } = useListingFormStore()
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return
    const remaining = 10 - formData.imageUrls.length
    const toUpload = acceptedFiles.slice(0, remaining)
    if (!toUpload.length) { toast.error('Maximum 10 photos allowed'); return }

    setUploading(true)
    const supabase = createClient()
    const newUrls: string[] = []

    for (const file of toUpload) {
      const path = `${user.id}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const { error } = await supabase.storage.from('listing-images').upload(path, file, { upsert: false })
      if (error) { toast.error(`Failed to upload ${file.name}`); continue }
      const { data: urlData } = supabase.storage.from('listing-images').getPublicUrl(path)
      if (urlData?.publicUrl) newUrls.push(urlData.publicUrl)
    }

    updateFormData({ imageUrls: [...formData.imageUrls, ...newUrls] })
    setUploading(false)
    if (newUrls.length) toast.success(`${newUrls.length} photo(s) uploaded!`)
  }, [formData.imageUrls, updateFormData, user])

  const removeImage = (idx: number) => {
    const updated = [...formData.imageUrls]
    updated.splice(idx, 1)
    updateFormData({ imageUrls: updated })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
    disabled: uploading || formData.imageUrls.length >= 10,
  })

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#222222] mb-2">Add photos of your item</h2>
      <p className="text-[#717171] mb-6">Items with clear, well-lit photos get rented 3× faster. Add up to 10 photos.</p>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-[#FF385C] bg-red-50' : 'border-[#DDDDDD] hover:border-[#222222]'
        } ${formData.imageUrls.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <UploadCloud size={36} className="mx-auto text-[#717171] mb-3" />
        <p className="text-[#222222] font-medium">
          {uploading ? 'Uploading...' : isDragActive ? 'Drop photos here' : 'Click to upload or drag & drop'}
        </p>
        <p className="text-sm text-[#717171] mt-1">JPG, PNG, WebP · Max 5MB per photo</p>
      </div>

      {/* Preview Grid */}
      {formData.imageUrls.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {formData.imageUrls.map((url, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square">
              <Image src={url} alt={`Photo ${idx + 1}`} fill className="object-cover" unoptimized />
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-[#222222] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Cover
                </span>
              )}
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove photo"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {uploading && (
            <div className="aspect-square rounded-xl border-2 border-dashed border-[#DDDDDD] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      {formData.imageUrls.length === 0 && !uploading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#717171]">
          <ImageIcon size={16} />
          <span>No photos yet · At least 1 required</span>
        </div>
      )}
    </div>
  )
}
