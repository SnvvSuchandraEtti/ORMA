'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Heart, Plus, User, Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import MobileMenuDrawer from './MobileMenuDrawer'

export default function MobileBottomNav({ openAuthModal }: { openAuthModal: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Fetch wishlist count
  useEffect(() => {
    async function fetchWishlists() {
      if (!user) return
      const supabase = createClient()
      const { count } = await supabase
        .from('wishlists')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      
      if (count !== null) setWishlistCount(count)
    }
    
    if (isAuthenticated) fetchWishlists()
    else setWishlistCount(0)
  }, [user, isAuthenticated])

  const isHidden = pathname.includes('/list-your-item/') 

  if (isHidden) return null

  const handleAuthGuardedNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    if (!isLoading) {
      if (isAuthenticated) router.push(path)
      else openAuthModal()
    }
  }

  type NavItem = {
    id: string
    label: string
    icon: React.ElementType
    href: string
    isActive: boolean
    onClick?: (e: React.MouseEvent, path: string) => void
    badge?: boolean
    isCenter?: boolean
    isProfile?: boolean
  }

  const navItems: NavItem[] = [
    {
      id: 'explore',
      label: 'Explore',
      icon: Search,
      href: '/',
      isActive: pathname === '/' || pathname.startsWith('/search'),
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      href: '/wishlist',
      isActive: pathname === '/wishlist',
      onClick: handleAuthGuardedNav,
      badge: wishlistCount > 0
    },
    {
      id: 'list',
      label: 'List',
      icon: Plus,
      href: '/list-your-item',
      isActive: pathname === '/list-your-item',
      onClick: handleAuthGuardedNav,
      isCenter: true
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      href: '/profile',
      isActive: pathname === '/profile' || pathname.startsWith('/user/'),
      onClick: handleAuthGuardedNav,
      isProfile: true
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: Menu,
      href: '#',
      isActive: isMenuOpen,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        setIsMenuOpen(true)
      }
    }
  ]

  return (
    <>
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 glass dark:glass-dark border-t border-black/[0.08] dark:border-[#38383A] z-50 px-4 pt-2"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          {navItems.map((item) => {
            const Icon = item.icon
            const activeColor = '#0071E3'
            const inactiveColor = '#86868B'

            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={(e) => item.onClick ? item.onClick(e, item.href) : router.push(item.href)}
                  className="flex flex-col items-center justify-center -mt-6 z-10"
                  aria-label={item.label}
                >
                  <div className="w-12 h-12 bg-[#0071E3] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,113,227,0.3)] transform transition-transform active:scale-95 border-2 border-white">
                    <Icon size={24} className="stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] tracking-wide font-medium mt-1 text-[#86868B] dark:text-[#98989D]">
                    {item.label}
                  </span>
                </button>
              )
            }

            return (
              <button
                key={item.id}
                onClick={(e) => item.onClick ? item.onClick(e, item.href) : router.push(item.href)}
                className="flex flex-col items-center justify-center min-w-[50px] gap-1"
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={item.isActive ? 2.5 : 2}
                    className="transition-colors duration-200"
                    style={{
                      color: item.isActive ? activeColor : inactiveColor,
                      fill: item.isActive && item.id !== 'menu' && !item.isProfile ? activeColor : 'none'
                    }}
                  />
                  {/* Blue Dot Badge */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 block w-2 h-2 bg-[#0071E3] border border-white rounded-full" />
                  )}
                  {/* User Initial */}
                  {item.isProfile && isAuthenticated && user?.email && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white uppercase rounded-full"
                      style={{ 
                        backgroundColor: item.isActive ? activeColor : '#86868B',
                        border: '2px solid white' 
                      }}
                    >
                      {user.email[0]}
                    </div>
                  )}
                </div>
                <span
                  className="text-[10px] font-medium tracking-wide transition-colors duration-200"
                  style={{ color: item.isActive ? activeColor : inactiveColor }}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      <MobileMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
