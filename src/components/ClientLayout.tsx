'use client'

import { useState, Suspense } from 'react'
import Navbar from './Navbar'
import CategoryBar from './CategoryBar'
import Footer from './Footer'
import AuthModal from './AuthModal'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      {/* Main content area — offset for sticky navbar (~80px desktop) + category bar (~72px) */}
      <main className="min-h-screen pt-[148px] md:pt-[160px]">
        {children}
      </main>

      <Footer />

      {/* Auth Modal at layout level */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}
