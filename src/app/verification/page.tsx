'use client'

import Link from 'next/link'
import { Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'

function VerificationContent() {
  const { profile, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-[#EBEBEB] dark:border-[#3D3D3D] border-t-[#0071E3] rounded-full animate-spin" />
      </div>
    )
  }

  const verified = profile?.is_verified

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center">
          <Shield className="text-[#0071E3]" size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white">Verification</h1>
          <p className="text-sm text-[#717171] dark:text-[#A0A0A0]">Trust and safety on ORMA</p>
        </div>
      </div>

      {verified ? (
        <div className="rounded-2xl border border-green-200 dark:border-green-900/50 bg-green-50/80 dark:bg-green-950/20 p-6 flex gap-4">
          <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={28} />
          <div>
            <p className="font-semibold text-[#222222] dark:text-white">You&apos;re verified</p>
            <p className="text-sm text-[#717171] dark:text-[#A0A0A0] mt-1">
              Your profile shows the verified badge to renters and owners. Thank you for helping keep ORMA safe.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 text-[#717171] dark:text-[#A0A0A0] leading-relaxed">
          <p>
            Verified members get a badge on their profile and often receive more inquiries. Our team reviews government
            ID and profile details to confirm you are who you say you are.
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Complete your profile with a clear photo and accurate contact information.</li>
            <li>Submit a valid government-issued ID when prompted (coming soon in the app).</li>
            <li>We&apos;ll notify you once verification is complete — usually within 1–2 business days.</li>
          </ol>
          <p className="text-sm">
            Update your profile anytime from{' '}
            <Link href="/profile" className="font-semibold text-[#0071E3] hover:underline">
              Profile settings
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}

export default function VerificationPage() {
  return (
    <ProtectedRoute>
      <VerificationContent />
    </ProtectedRoute>
  )
}
