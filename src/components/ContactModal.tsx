'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Phone, MessageCircle, Mail, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import type { Profile } from '@/types'
import { getInitials, getWhatsAppLink } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'
import { useFocusTrap } from '@/hooks/useFocusTrap'

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
  const [isStartingChat, setIsStartingChat] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="absolute inset-0 modal-backdrop" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1E1E1E] w-full sm:max-w-md sm:rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] z-10 overflow-hidden animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBEBEB] dark:border-[#3D3D3D] px-6 py-4">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D]" aria-label="Close">
            <X size={16} />
          </button>
          <span id="contact-modal-title" className="font-semibold text-[16px]">Contact Owner</span>
          <div className="w-8" />
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Owner info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#717171] flex items-center justify-center text-white text-lg font-semibold overflow-hidden flex-shrink-0">
              {owner.avatar_url ? (
                <Image src={owner.avatar_url} alt={`${owner.full_name || 'Owner'}'s profile picture`} width={56} height={56} className="object-cover w-full h-full" unoptimized />
              ) : (
                <span>{getInitials(owner.full_name)}</span>
              )}
            </div>
            <div>
              <p className="font-semibold text-[#222222] dark:text-white">{owner.full_name || 'Owner'}</p>
              <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">Typically responds within a few hours</p>
              {owner.is_verified && (
                <span className="text-xs text-[#222222] dark:text-white font-medium">✓ Verified owner</span>
              )}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="space-y-3">
            
            {/* In-App Message */}
            <div className="flex items-center justify-between p-4 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl bg-gray-50 dark:bg-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF385C] rounded-full flex items-center justify-center">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#717171] dark:text-[#A0A0A0]">ORMA Messages</p>
                  <p className="font-semibold text-[#222222] dark:text-white">Chat in-app</p>
                </div>
              </div>
              <button
                disabled={isStartingChat}
                onClick={async () => {
                  if (!user) {
                    toast.error('Please login to send messages')
                    return
                  }
                  if (user.id === owner.id) {
                    toast.error('You cannot message yourself')
                    return
                  }

                  setIsStartingChat(true)

                  const lastSent = localStorage.getItem('last_message_time')
                  if (lastSent && Date.now() - Number(lastSent) < 60000) {
                    toast.error('Please wait a minute before starting another chat')
                    setIsStartingChat(false)
                    return
                  }

                  const supabase = createClient()

                  // Check if conversation exists
                  const { data: existing } = await supabase
                    .from('conversations')
                    .select('id')
                    .eq('listing_id', listing.id)
                    .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
                    .limit(1)

                  if (existing && existing.length > 0) {
                    // Go to messages
                    router.push('/messages')
                    onClose()
                  } else {
                    // Create new conversation
                    const { data: newConv, error: createErr } = await supabase
                      .from('conversations')
                      .insert({
                        listing_id: listing.id,
                        participant_1: user.id,
                        participant_2: owner.id
                      })
                      .select('id')
                      .single()

                    if (!createErr && newConv) {
                      // Insert initial hello message
                      await supabase.from('messages').insert({
                        conversation_id: newConv.id,
                        sender_id: user.id,
                        message: `Hi, I'm interested in renting ${listing.title}.`
                      })
                      localStorage.setItem('last_message_time', Date.now().toString())
                      router.push('/messages')
                      onClose()
                    } else {
                      toast.error('Failed to start conversation')
                      setIsStartingChat(false)
                    }
                  }
                }}
                className="px-4 py-2 bg-[#FF385C] text-white text-xs font-semibold rounded-lg hover:bg-[#D90B38] disabled:opacity-50 transition-colors"
              >
                {isStartingChat ? 'Starting...' : 'Message'}
              </button>
            </div>
            {listing.contact_phone && (
              <div className="flex items-center justify-between p-4 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-[#2D2D2D] rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-[#222222] dark:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#717171] dark:text-[#A0A0A0]">Phone</p>
                    <p className="font-semibold text-[#222222] dark:text-white">+91 {listing.contact_phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(listing.contact_phone, 'phone')}
                    className="text-xs text-[#717171] dark:text-[#A0A0A0] hover:text-[#222222] dark:text-white underline"
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
              <div className="flex items-center justify-between p-4 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-[#2D2D2D] rounded-full flex items-center justify-center">
                    <MessageCircle size={18} className="text-[#222222] dark:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#717171] dark:text-[#A0A0A0]">WhatsApp</p>
                    <p className="font-semibold text-[#222222] dark:text-white">+91 {listing.contact_whatsapp}</p>
                  </div>
                </div>
                <a
                  href={getWhatsAppLink(listing.contact_whatsapp, listing.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#000000] text-white text-xs font-semibold rounded-lg hover:bg-[#333333]"
                >
                  Open WhatsApp
                </a>
              </div>
            )}

            {listing.contact_email && (
              <div className="flex items-center justify-between p-4 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-[#2D2D2D] rounded-full flex items-center justify-center">
                    <Mail size={18} className="text-[#222222] dark:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#717171] dark:text-[#A0A0A0]">Email</p>
                    <p className="font-semibold text-[#222222] dark:text-white text-sm truncate max-w-[140px]">{listing.contact_email}</p>
                  </div>
                </div>
                <a
                  href={`mailto:${listing.contact_email}?subject=Interested in renting ${encodeURIComponent(listing.title)}`}
                  className="px-3 py-1.5 bg-[#000000] text-white text-xs font-semibold rounded-lg hover:bg-[#333333]"
                >
                  Send Email
                </a>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div className="bg-gray-50 dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-[#717171] dark:text-[#A0A0A0]" />
              <p className="text-sm font-semibold text-[#717171] dark:text-[#A0A0A0]">Tips for a safe rental</p>
            </div>
            <ul className="text-xs text-[#717171] dark:text-[#A0A0A0] space-y-1">
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
