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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={onClose} 
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white/80 dark:bg-black/40 backdrop-blur-2xl w-full sm:max-w-lg sm:rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.3)] z-10 overflow-hidden border border-white/20 dark:border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-black/[0.05] dark:border-white/[0.05]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-[#222222] dark:text-white/20">
                <X size={18} className="opacity-0" />
              </div>
              <h2 id="contact-modal-title" className="text-xl font-black text-[#222222] dark:text-white tracking-tight">Contact Owner</h2>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-[#222222] dark:text-white hover:bg-[#FF385C] hover:text-white transition-all active:scale-90" 
                aria-label="Close"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="px-8 py-10 space-y-8 max-h-[70vh] overflow-y-auto hide-scrollbar">
              {/* Owner info */}
              <div className="group relative flex items-center gap-5 bg-white/40 dark:bg-white/[0.03] p-6 rounded-[2.5rem] border border-black/[0.03] dark:border-white/[0.03] overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF385C]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative w-20 h-20 rounded-[2rem] bg-[#717171] flex items-center justify-center text-white text-2xl font-black overflow-hidden flex-shrink-0 border-4 border-white dark:border-white/10 shadow-xl">
                  {owner.avatar_url ? (
                    <Image src={owner.avatar_url} alt={`${owner.full_name || 'Owner'}'s profile`} width={80} height={80} className="object-cover w-full h-full" unoptimized />
                  ) : (
                    <span>{getInitials(owner.full_name)}</span>
                  )}
                </div>
                
                <div className="relative">
                  <p className="text-2xl font-black text-[#222222] dark:text-white tracking-tight leading-tight">
                    {owner.full_name || 'Owner'}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-xs text-emerald-600 dark:text-emerald-500 font-black uppercase tracking-widest">Available Now</p>
                  </div>
                  {owner.is_verified && (
                    <div className="flex items-center gap-1.5 mt-2 px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 rounded-full w-fit border border-blue-500/20">
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest">Verified Pro</span>
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
                  className="flex items-center justify-between p-5 rounded-[2rem] bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white shadow-xl shadow-[#FF385C]/20 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
                      router.push('/messages')
                      onClose()
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
                        router.push('/messages')
                        onClose()
                      } else {
                        toast.error('Failed to start conversation')
                        setIsStartingChat(false)
                      }
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <MessageCircle size={24} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Secure Chat</p>
                      <p className="text-lg font-black tracking-tight">Message on ORMA</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    {isStartingChat ? '...' : 'GO'}
                  </div>
                </motion.div>

                {listing.contact_phone && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between p-5 rounded-[2rem] bg-white/50 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] hover:bg-white dark:hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center text-[#222222] dark:text-white">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Phone Support</p>
                        <p className="text-lg font-black text-[#222222] dark:text-white tracking-tight">+91 {listing.contact_phone}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:+91${listing.contact_phone}`}
                      className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-black rounded-xl hover:scale-105 transition-all shadow-lg"
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
                    className="flex items-center justify-between p-5 rounded-[2rem] bg-[#25D366]/5 border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                        <MessageCircle size={24} strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#25D366] underline uppercase tracking-widest">WhatsApp Business</p>
                        <p className="text-lg font-black text-[#222222] dark:text-white tracking-tight">+91 {listing.contact_whatsapp}</p>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppLink(listing.contact_whatsapp, listing.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#25D366] text-white text-sm font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#25D366]/20"
                    >
                      OPEN
                    </a>
                  </motion.div>
                )}
              </div>

              {/* Safety Shield */}
              <div className="relative group overflow-hidden bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-[2.5rem] p-6 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col items-center relative gap-3">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#222222] dark:text-white uppercase tracking-widest mb-1.5">ORMA Security Shield</p>
                    <p className="text-xs text-[#717171] font-medium leading-relaxed max-w-[240px] mx-auto">
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
