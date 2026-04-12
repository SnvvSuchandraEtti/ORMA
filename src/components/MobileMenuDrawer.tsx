'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Package, Info, HelpCircle, Mail, FileText, Shield, Settings, LogOut, MessageCircle, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import ThemeToggle from '@/components/ThemeToggle'
import { useMessageStore } from '@/store/messageStore'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface MobileMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const { isAuthenticated, signOut } = useAuth()
  const unreadCount = useMessageStore(state => state.unreadCount)
  const drawerRef = useRef<HTMLDivElement>(null)
  useFocusTrap(drawerRef, isOpen)

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  const links = [
    ...(isAuthenticated ? [{ icon: TrendingUp, label: 'Dashboard', href: '/dashboard' }] : []),
    ...(isAuthenticated ? [{ icon: MessageCircle, label: 'Messages', href: '/messages', badge: unreadCount }] : []),
    ...(isAuthenticated ? [{ icon: Package, label: 'My Listings', href: '/my-listings' }] : []),
    { icon: HelpCircle, label: 'How ORMA works', href: '/how-it-works' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: Mail, label: 'Contact', href: '/contact' },
    { icon: HelpCircle, label: 'FAQ', href: '/faq' },
    { icon: FileText, label: 'Terms of Service', href: '/terms' },
    { icon: Shield, label: 'Privacy Policy', href: '/privacy' },
    ...(isAuthenticated ? [{ icon: Settings, label: 'Settings', href: '/profile' }] : []),
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/48 z-[100] md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose()
            }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white dark:bg-[#1C1C1E] rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.08)] flex flex-col md:hidden max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            ref={drawerRef}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-[#D2D2D7] dark:bg-[#38383A] rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-2 flex items-center justify-between border-b border-[#E8E8ED] dark:border-[#38383A]">
              <h2 id="mobile-menu-title" className="text-xl font-semibold text-[#1D1D1F] dark:text-white">Menu</h2>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white transition-colors" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Scroll Area */}
            <div className="overflow-y-auto p-6 pb-24">
              <div className="flex flex-col gap-2">
                {links.map((link, idx) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-2 py-4 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-4 text-[#1D1D1F] dark:text-white">
                        <Icon size={24} className="text-[#86868B] dark:text-[#98989D]" />
                        <span className="text-base font-medium">{link.label}</span>
                      </div>
                      {link.badge ? (
                        <span className="bg-[#0071E3] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      ) : null}
                    </Link>
                  )
                })}

                {isAuthenticated && (
                  <>
                    <hr className="my-2 border-[#E8E8ED] dark:border-[#38383A]" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-4 px-2 py-4 text-[#1D1D1F] dark:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl transition-colors text-left w-full"
                    >
                      <LogOut size={24} className="text-[#86868B] dark:text-[#98989D]" />
                      <span className="text-base font-medium">Log out</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
