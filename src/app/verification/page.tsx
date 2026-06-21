'use client'

import Link from 'next/link'
import { Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useState } from 'react'

function VerificationContent() {
  const { profile, isLoading } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-[#EBEBEB] dark:border-[#3D3D3D] border-t-[#0071E3] rounded-full animate-spin" />
      </div>
    )
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
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
        <div className="rounded-3xl border border-green-200 dark:border-green-900/50 bg-green-50/80 dark:bg-green-950/20 p-8 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
            <CheckCircle size={32} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#222222] dark:text-white">You&apos;re verified</p>
            <p className="text-sm text-[#717171] dark:text-[#A0A0A0] mt-1 max-w-sm">
              Your profile shows the verified badge to renters and owners. Thank you for helping keep ORMA safe.
            </p>
          </div>
          <Link href="/profile" className="mt-2 text-sm font-semibold text-[#0071E3] hover:underline">
            View Profile
          </Link>
        </div>
      ) : submitted ? (
        <div className="rounded-3xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/10 p-8 text-center animate-in fade-in zoom-in duration-500">
           <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-500/20">
             <CheckCircle size={32} />
           </div>
           <h2 className="text-xl font-bold text-[#222222] dark:text-white mb-2">Request Submitted</h2>
           <p className="text-sm text-[#717171] dark:text-[#A0A0A0] max-w-sm mx-auto">
             We&apos;ve received your verification request. Our team will review your profile details within 24–48 hours.
           </p>
           <Link href="/dashboard" className="mt-8 inline-block px-8 py-3 bg-[#222222] dark:bg-white text-white dark:text-[#222222] rounded-xl font-bold text-sm">
              Back to Dashboard
           </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-6 text-[#717171] dark:text-[#A0A0A0] leading-relaxed">
            <p className="text-lg text-[#222222] dark:text-white font-medium">Why get verified?</p>
            <p>
              Verified members get a badge on their profile and often receive 3x more inquiries. Our team reviews 
              your profile details to confirm your identity and build trust in the community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { title: 'Build Trust', desc: 'Renters feel safer booking from you.' },
                 { title: 'Higher Visibility', desc: 'Appear higher in search results.' },
                 { title: 'Fast Approvals', desc: 'Get your listings approved faster.' },
                 { title: 'Priority Support', desc: 'Get help when you need it.' }
               ].map(benefit => (
                 <div key={benefit.title} className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-gray-100 dark:border-white/5">
                   <p className="font-bold text-[#222222] dark:text-white text-sm mb-1">{benefit.title}</p>
                   <p className="text-xs">{benefit.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#EBEBEB] dark:border-[#38383A]">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-4 bg-[#0071E3] text-white font-bold rounded-2xl hover:bg-[#0077ED] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : 'Submit for Verification'}
            </button>
            <p className="text-center text-[11px] text-[#86868B] mt-4">
              By submitting, you agree to our verification terms and privacy policy.
            </p>
          </div>
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
