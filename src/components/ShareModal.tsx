'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, MessageCircle, Facebook, Twitter, Mail, Send } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export default function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=Check out this rental on ORMA: ${encodeURIComponent(title)} - ${encodeURIComponent(url)}`,
      color: 'bg-[#25D366] text-white'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-[#1877F2] text-white'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=Check out this rental: ${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'bg-[#1DA1F2] text-white'
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-[#0088CC] text-white'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={modalRef} 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="share-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50 dark:border-white/10">
              <h2 id="share-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">Share this listing</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Copy URL block */}
              <div className="flex items-center p-2 mb-8 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-black/20">
                <div className="flex-1 overflow-x-auto whitespace-nowrap px-3 text-sm text-gray-500 dark:text-gray-400 hide-scrollbar font-medium">
                  {url}
                </div>
                <button
                  onClick={handleCopy}
                  className="ml-2 flex items-center gap-2 px-4 py-2.5 bg-[#222222] dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/5 dark:shadow-white/5"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Share via</p>
                <div className="grid grid-cols-2 gap-3">
                  {shareLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-sm hover:shadow-md ${link.color}`}
                      >
                        <Icon size={20} />
                        <span className="font-bold text-sm">{link.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0">
               <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: title, url: url }).catch(console.error)
                  }
                }}
                className="w-full py-4 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                More options
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
