'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, User, Heart, Plus, LogOut, Settings, List, MessageCircle, TrendingUp, CalendarCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/lib/utils'
import { Suspense } from 'react'
import SearchBar from '@/components/SearchBar'
import ThemeToggle from '@/components/ThemeToggle'
import NotificationBell from '@/components/NotificationBell'
import { motion, AnimatePresence } from 'framer-motion'
import { useMessageStore } from '@/store/messageStore'

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { profile, isAuthenticated, signOut } = useAuth()
  const unreadCount = useMessageStore(state => state.unreadCount)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
    router.push('/')
  }

  return (
    <>
      {/* Dim Overlay */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 z-30"
          />
        )}
      </AnimatePresence>

      <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-40 glass dark:glass-dark border-b border-black/[0.08] dark:border-white/5 transition-all duration-300`} style={{ boxShadow: '0 0.5px 0 rgba(0,0,0,0.08)' }}>
        <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[52px] md:h-[52px] gap-4 relative">

          {/* Logo — clean black like Apple's wordmark */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-[22px] font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              ORMA
            </span>
          </Link>

          {/* Search Bar — Desktop */}
          <div className="hidden md:flex flex-[2] justify-center relative h-full items-center px-4 max-w-[850px] mx-auto">
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />
            <NotificationBell />

            {/* List Your Item — desktop only */}
            <Link
              href="/list-your-item"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors font-medium text-sm text-[#0071E3]"
            >
              <Plus size={16} />
              List Your Item
            </Link>

            {/* User Menu Button */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex relative items-center gap-3 border border-[#D2D2D7] dark:border-white/10 rounded-full pl-3 pr-1.5 py-1.5 hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-sm"
                aria-label="User menu"
                aria-expanded={isMenuOpen}
              >
                {/* Global Unread Badge on Avatar Menu */}
                {isAuthenticated && unreadCount > 0 && (
                  <span className="absolute top-0 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0071E3] border-2 border-white dark:border-[#1C1C1E]"></span>
                  </span>
                )}
                
                <Menu size={18} className="text-[#1D1D1F] dark:text-white" />
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#86868B] flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                  {isAuthenticated && profile?.full_name ? (
                    <span>{getInitials(profile.full_name)}</span>
                  ) : (
                    <User size={16} />
                  )}
                </div>
              </button>

              {/* Dropdown */}
              {isMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] border border-[#E8E8ED] dark:border-white/10 py-2 z-50 animate-[slideDown_0.2s_ease-out]"
                  role="menu"
                  aria-label="User menu"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') { e.preventDefault(); setIsMenuOpen(false); return }
                    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
                    e.preventDefault()
                    const items = e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]')
                    if (!items.length) return
                    const idx = Array.from(items).findIndex(el => el === document.activeElement)
                    let next = idx
                    if (e.key === 'ArrowDown') next = (idx + 1) % items.length
                    else next = (idx - 1 + items.length) % items.length
                    items[next]?.focus()
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-[#E8E8ED] dark:border-[#38383A] mb-1">
                        <p className="text-[13px] font-semibold text-[#1D1D1F] dark:text-white">
                          {(() => {
                            const hour = new Date().getHours()
                            const prefix = profile?.full_name?.split(' ')[0] || 'there'
                            if (hour >= 5 && hour < 12) return `Good morning, ${prefix} ☀️`
                            if (hour >= 12 && hour < 17) return `Good afternoon, ${prefix} 🌤️`
                            if (hour >= 17 && hour < 21) return `Good evening, ${prefix} 🌅`
                            return `Hi, ${prefix} 🌙`
                          })()}
                        </p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <TrendingUp size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        Dashboard
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <User size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        Profile
                      </Link>
                      <Link href="/my-listings" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <List size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        My Listings
                      </Link>
                      <Link href="/bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <CalendarCheck size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        Bookings
                      </Link>
                      <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <Heart size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        Wishlist
                      </Link>
                      <Link href="/messages" className="flex items-center justify-between px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <div className="flex items-center gap-3">
                          <MessageCircle size={16} className="text-[#86868B] dark:text-[#98989D]" />
                          Messages
                        </div>
                        {unreadCount > 0 && (
                          <span className="bg-[#0071E3] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </Link>
                      <div className="border-t border-[#E8E8ED] dark:border-[#38383A] my-1" />
                      <Link href="/how-it-works" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        How it works
                      </Link>
                      <Link href="/list-your-item" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm font-semibold text-[#1D1D1F] dark:text-white" role="menuitem">
                        <Plus size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        List your item
                      </Link>
                      <div className="border-t border-[#E8E8ED] dark:border-[#38383A] my-1" />
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        <Settings size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white"
                        role="menuitem"
                      >
                        <LogOut size={16} className="text-[#86868B] dark:text-[#98989D]" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setIsMenuOpen(false); onOpenAuth('login') }}
                        className="w-full flex items-center px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm font-semibold text-[#1D1D1F] dark:text-white"
                        role="menuitem"
                      >
                        Log in
                      </button>
                      <button
                        onClick={() => { setIsMenuOpen(false); onOpenAuth('signup') }}
                        className="w-full flex items-center px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white"
                        role="menuitem"
                      >
                        Sign up
                      </button>
                      <div className="border-t border-[#E8E8ED] dark:border-[#38383A] my-1" />
                      <Link href="/how-it-works" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        How it works
                      </Link>
                      <Link href="/list-your-item" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-xl mx-2 text-sm text-[#1D1D1F] dark:text-white" role="menuitem">
                        List your item
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 pt-1">
          {pathname === '/search' ? (
            <div className="px-1">
              <Suspense fallback={null}>
                <SearchBar />
              </Suspense>
            </div>
          ) : (
            <button
              onClick={() => router.push('/search')}
              className="w-full flex items-center border border-[#D2D2D7] dark:border-white/5 bg-[#F5F5F7] dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-5 py-3 gap-4"
              aria-label="Search rentals"
            >
              <Search size={20} className="text-[#1D1D1F] dark:text-white" />
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white">Search items</span>
                <span className="text-xs text-[#86868B] dark:text-[#98989D]">Any location • Any dates</span>
              </div>
            </button>
          )}
        </div>
        </div>
      </nav>
    </>
  )
}
