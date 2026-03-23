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
      color: 'bg-[#25D366] text-white hover:bg-[#128C7E]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-[#1877F2] text-white hover:bg-[#0C58C2]'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=Check out this rental: ${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'bg-[#1DA1F2] text-white hover:bg-[#1A91DA]'
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=Check out this on ORMA&body=I found this item for rent: ${encodeURIComponent(title)} - ${encodeURIComponent(url)}`,
      color: 'bg-[#717171] text-white hover:bg-[#222222]'
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-[#0088CC] text-white hover:bg-[#0077B5]'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
              <h2 id="share-modal-title" className="text-xl font-semibold text-[#222222] dark:text-white">Share this listing</h2>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] text-[#222222] dark:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Copy URL block */}
              <div className="flex items-center p-2 mb-6 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl bg-[#F7F7F7] dark:bg-[#1A1A1A]">
                <div className="flex-1 overflow-x-auto whitespace-nowrap px-2 text-sm text-[#717171] dark:text-[#A0A0A0] hide-scrollbar">
                  {url}
                </div>
                <button
                  onClick={handleCopy}
                  className="ml-2 flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E1E1E] border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg text-sm font-semibold text-[#222222] dark:text-white hover:bg-gray-50 dark:bg-[#1A1A1A] transition-colors shadow-sm"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Social Links */}
              <p className="text-sm font-semibold text-[#222222] dark:text-white mb-4">Share via</p>
              <div className="grid grid-cols-2 gap-3">
                {shareLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${link.color}`}
                    >
                      <Icon size={20} />
                      <span className="font-semibold text-sm">{link.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
