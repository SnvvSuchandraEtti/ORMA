'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Phone, MessageCircle, AlertCircle } from 'lucide-react'
import type { Profile } from '@/types'
import { getInitials, getWhatsAppLink } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'
import { useFocusTrap } from '@/hooks/useFocusTrap'

import { motion, AnimatePresence } from 'framer-motion'

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={modalRef} 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/48 backdrop-blur-sm" 
            onClick={onClose} 
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-[#1C1C1E] w-full sm:max-w-lg rounded-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E8E8ED] dark:border-[#38383A]">
              <div className="w-7" />
              <h2 id="contact-modal-title" className="text-xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">Contact Owner</h2>
              <button 
                onClick={onClose} 
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white hover:bg-[#E8E8ED] dark:hover:bg-[#38383A] transition-all" 
                aria-label="Close"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="px-8 py-8 space-y-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
              {/* Owner info */}
              <div className="flex items-center gap-5 bg-[#F5F5F7] dark:bg-[#2C2C2E] p-6 rounded-2xl">
                <div className="relative w-16 h-16 rounded-2xl bg-[#86868B] flex items-center justify-center text-white text-xl font-bold overflow-hidden flex-shrink-0">
                    <span>{getInitials(owner.full_name)}</span>
                </div>
                
                <div>
                  <p className="text-xl font-bold text-[#1D1D1F] dark:text-white tracking-tight leading-tight">
                    {owner.full_name || 'Owner'}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-2 h-2 bg-[#28CD41] rounded-full animate-pulse" />
                    <p className="text-xs text-[#28CD41] font-semibold">Available Now</p>
                  </div>
                  {owner.is_verified && (
                    <div className="flex items-center gap-1.5 mt-2 px-3 py-1 bg-[#28CD41]/10 rounded-full w-fit">
                      <span className="text-[10px] text-[#28CD41] font-semibold uppercase tracking-wider">Verified Pro</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Methods */}
              <div className="grid gap-4">
                
                {/* In-App Message */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-5 rounded-2xl bg-[#0071E3] text-white shadow-[0_4px_12px_rgba(0,113,227,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
                    const supabase = createClient()

                    const { data: existing } = await supabase
                      .from('conversations')
                      .select('id')
                      .eq('listing_id', listing.id)
                      .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
                      .limit(1)

                    if (existing && existing.length > 0) {
                      onClose()
                      setTimeout(() => router.push('/messages'), 100)
                    } else {
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
                        await supabase.from('messages').insert({
                          conversation_id: newConv.id,
                          sender_id: user.id,
                          message: `Hi, I'm interested in renting ${listing.title}.`
                        })
                        onClose()
                        setTimeout(() => router.push('/messages'), 100)
                      } else {
                        toast.error('Failed to start conversation')
                        setIsStartingChat(false)
                      }
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                      <MessageCircle size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Secure Chat</p>
                      <p className="text-lg font-bold tracking-tight">Message on ORMA</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                    {isStartingChat ? '...' : 'GO'}
                  </div>
                </motion.div>

                {listing.contact_phone && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#E8E8ED] dark:border-[#38383A] hover:bg-white dark:hover:bg-[#38383A] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E8E8ED] dark:bg-[#38383A] rounded-xl flex items-center justify-center text-[#1D1D1F] dark:text-white">
                        <Phone size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">Phone Support</p>
                        <p className="text-lg font-bold text-[#1D1D1F] dark:text-white tracking-tight">+91 {listing.contact_phone}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:+91${listing.contact_phone}`}
                      className="px-5 py-2.5 bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] text-sm font-semibold rounded-full hover:scale-105 transition-all shadow-sm"
                    >
                      CALL
                    </a>
                  </motion.div>
                )}

                {listing.contact_whatsapp && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-sm">
                        <MessageCircle size={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#25D366] uppercase tracking-wider">WhatsApp</p>
                        <p className="text-lg font-bold text-[#1D1D1F] dark:text-white tracking-tight">+91 {listing.contact_whatsapp}</p>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppLink(listing.contact_whatsapp, listing.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:scale-105 transition-all shadow-sm"
                    >
                      OPEN
                    </a>
                  </motion.div>
                )}
              </div>

              {/* Safety Shield */}
              <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 bg-[#28CD41]/10 text-[#28CD41] rounded-full flex items-center justify-center">
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1D1D1F] dark:text-white uppercase tracking-wider mb-1.5">ORMA Security Shield</p>
                    <p className="text-xs text-[#6E6E73] font-medium leading-relaxed max-w-[240px] mx-auto">
                      All interactions are monitored for your safety. Meet in public and verify gear before rental.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
