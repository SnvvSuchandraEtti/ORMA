'use client'

import { useState, Suspense, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import CategoryBar from './CategoryBar'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'
import dynamic from 'next/dynamic'

const AuthModal = dynamic(() => import('./AuthModal'), { ssr: false })
import TopLoadingBar from './TopLoadingBar'
import SkipToContent from './SkipToContent'
import ErrorBoundary from './ErrorBoundary'
import OfflineBanner from './OfflineBanner'
import WelcomeModal from './WelcomeModal'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const openAuth = (mode?: 'login' | 'signup') => {
    if (typeof window !== 'undefined') {
      const currentPath = `${window.location.pathname}${window.location.search}`
      localStorage.setItem('orma_post_login_redirect', currentPath)
    }
    setAuthInitialTab(mode ?? 'login')
    setIsAuthOpen(true)
  }

  return (
    <>
      <SkipToContent />
      <OfflineBanner />
      <Suspense fallback={null}>
        <TopLoadingBar />
      </Suspense>
      <Navbar onOpenAuth={openAuth} />
      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      {/* Main content area — offset for sticky navbar (~80px desktop) + category bar (~72px) */}
      <main id="main-content" className="min-h-screen pt-[148px] md:pt-[160px] pb-20 md:pb-0">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      <Footer />

      {/* Auth Modal at layout level */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authInitialTab}
      />

      {/* Mobile Bottom Layout */}
      <MobileBottomNav openAuthModal={() => openAuth('login')} />

      {/* First-time Welcome Modal */}
      <WelcomeModal />
    </>
  )
}
