'use client'

import { useState } from 'react'
import { X, Phone, MessageCircle, Mail, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import type { Profile } from '@/types'
import { getInitials, getWhatsAppLink } from '@/lib/utils'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  owner: Profile
  listing: {
    id: string
    title: string
    contact_phone: string
    contact_whatsapp: string
    contact_email: string
    preferred_contact: string
  }
}

export default function ContactModal({ isOpen, onClose, owner, listing }: ContactModalProps) {
  const [copied, setCopied] = useState<string | null>(null)

  if (!isOpen) return null

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 modal-backdrop" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] z-10 overflow-hidden animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBEBEB] px-6 py-4">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close">
            <X size={16} />
          </button>
          <span className="font-semibold text-[16px]">Contact Owner</span>
          <div className="w-8" />
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Owner info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#717171] flex items-center justify-center text-white text-lg font-semibold overflow-hidden flex-shrink-0">
              {owner.avatar_url ? (
                <Image src={owner.avatar_url} alt={owner.full_name || 'Owner'} width={56} height={56} className="object-cover w-full h-full" unoptimized />
              ) : (
                <span>{getInitials(owner.full_name)}</span>
              )}
            </div>
            <div>
              <p className="font-semibold text-[#222222]">{owner.full_name || 'Owner'}</p>
              <p className="text-sm text-[#717171]">Typically responds within a few hours</p>
              {owner.is_verified && (
                <span className="text-xs text-green-600 font-medium">✓ Verified owner</span>
              )}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="space-y-3">
            {listing.contact_phone && (
              <div className="flex items-center justify-between p-4 border border-[#DDDDDD] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#717171]">Phone</p>
                    <p className="font-semibold text-[#222222]">+91 {listing.contact_phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(listing.contact_phone, 'phone')}
                    className="text-xs text-[#717171] hover:text-[#222222] underline"
                  >
                    {copied === 'phone' ? 'Copied!' : 'Copy'}
                  </button>
                  <a
                    href={`tel:+91${listing.contact_phone}`}
                    className="px-3 py-1.5 bg-[#222222] text-white text-xs font-semibold rounded-lg hover:bg-black"
                  >
                    Call
                  </a>
                </div>
              </div>
            )}

            {listing.contact_whatsapp && (
              <div className="flex items-center justify-between p-4 border border-[#DDDDDD] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <MessageCircle size={18} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#717171]">WhatsApp</p>
                    <p className="font-semibold text-[#222222]">+91 {listing.contact_whatsapp}</p>
                  </div>
                </div>
                <a
                  href={getWhatsAppLink(listing.contact_whatsapp, listing.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-green-500"
                >
                  Open WhatsApp
                </a>
              </div>
            )}

            {listing.contact_email && (
              <div className="flex items-center justify-between p-4 border border-[#DDDDDD] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#717171]">Email</p>
                    <p className="font-semibold text-[#222222] text-sm truncate max-w-[140px]">{listing.contact_email}</p>
                  </div>
                </div>
                <a
                  href={`mailto:${listing.contact_email}?subject=Interested in renting ${encodeURIComponent(listing.title)}`}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
                >
                  Send Email
                </a>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-amber-600" />
              <p className="text-sm font-semibold text-amber-800">Tips for a safe rental</p>
            </div>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Always verify the item in person before paying</li>
              <li>• Ask for a written agreement or receipt</li>
              <li>• Meet in a safe, public place if possible</li>
              <li>• Report suspicious behavior to ORMA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
