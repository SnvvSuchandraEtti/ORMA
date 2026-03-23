'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import AuthModal from './AuthModal'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useAuth()
  const [showAuth, setShowAuth] = useState(true)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="text-3xl font-bold text-[#FF385C] mb-4">ORMA</span>
        <div className="w-8 h-8 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#717171] mt-3 text-sm">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold text-[#222222] mb-2">Please log in</h2>
          <p className="text-[#717171] mb-6">You need to be logged in to access this page.</p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors"
          >
            Log in to continue
          </button>
        </div>
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </>
    )
  }

  return <>{children}</>
}
