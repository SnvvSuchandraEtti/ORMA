'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, User, Heart, Plus, LogOut, Settings, List } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/lib/utils'
import Image from 'next/image'

interface NavbarProps {
  onOpenAuth: () => void
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { user, profile, isAuthenticated, signOut } = useAuth()

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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#DDDDDD]">
      <div className="max-w-[1760px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl md:text-3xl font-bold text-[#FF385C] tracking-tight">
              ORMA
            </span>
          </Link>

          {/* Search Bar — Desktop */}
          <button
            onClick={() => router.push('/search')}
            className="hidden md:flex items-center border border-[#DDDDDD] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow px-4 py-2 gap-3 flex-1 max-w-[480px]"
            aria-label="Search rentals"
          >
            <span className="text-sm text-[#717171] flex-1 text-left line-clamp-1">
              Search anything to rent
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0">
              <Search size={14} className="text-white" />
            </div>
          </button>

          {/* Right Side */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* List Your Item — desktop only */}
            <Link
              href="/list-your-item"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-semibold text-sm text-[#222222]"
            >
              <Plus size={16} />
              List Your Item
            </Link>

            {/* User Menu Button */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 border border-[#DDDDDD] rounded-full px-3 py-2 hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow"
                aria-label="User menu"
                aria-expanded={isMenuOpen}
              >
                <Menu size={18} className="text-[#222222]" />
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#717171] flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                  {isAuthenticated && profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.full_name || 'User'}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : isAuthenticated && profile?.full_name ? (
                    <span>{getInitials(profile.full_name)}</span>
                  ) : (
                    <User size={16} />
                  )}
                </div>
              </button>

              {/* Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] border border-[#EBEBEB] py-2 z-50 animate-[slideDown_0.2s_ease-out]">
                  {isAuthenticated ? (
                    <>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]">
                        <User size={16} className="text-[#717171]" />
                        Profile
                      </Link>
                      <Link href="/my-listings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]">
                        <List size={16} className="text-[#717171]" />
                        My Listings
                      </Link>
                      <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]">
                        <Heart size={16} className="text-[#717171]" />
                        Wishlist
                      </Link>
                      <div className="border-t border-[#EBEBEB] my-1" />
                      <Link href="/list-your-item" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-semibold text-[#222222]">
                        <Plus size={16} className="text-[#717171]" />
                        List your item
                      </Link>
                      <div className="border-t border-[#EBEBEB] my-1" />
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]">
                        <Settings size={16} className="text-[#717171]" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]"
                      >
                        <LogOut size={16} className="text-[#717171]" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setIsMenuOpen(false); onOpenAuth() }}
                        className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-sm font-semibold text-[#222222]"
                      >
                        Log in
                      </button>
                      <button
                        onClick={() => { setIsMenuOpen(false); onOpenAuth() }}
                        className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]"
                      >
                        Sign up
                      </button>
                      <div className="border-t border-[#EBEBEB] my-1" />
                      <Link href="/list-your-item" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-[#222222]">
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
        <div className="md:hidden pb-3">
          <button
            onClick={() => router.push('/search')}
            className="w-full flex items-center border border-[#DDDDDD] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08)] px-4 py-2.5 gap-3"
            aria-label="Search rentals"
          >
            <Search size={16} className="text-[#717171]" />
            <span className="text-sm text-[#717171] flex-1 text-left">Search anything to rent</span>
          </button>
        </div>
      </div>
    </header>
  )
}
