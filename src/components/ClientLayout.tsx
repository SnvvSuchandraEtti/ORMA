'use client'

import { useState, Suspense } from 'react'
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

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <>
      <SkipToContent />
      <OfflineBanner />
      <Suspense fallback={null}>
        <TopLoadingBar />
      </Suspense>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Mobile Bottom Layout */}
      <MobileBottomNav openAuthModal={() => setIsAuthOpen(true)} />
    </>
  )
}
