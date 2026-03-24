'use client'

import { motion } from 'framer-motion'
import type { Profile } from '@/types'

interface TrustScoreProps {
  profile: Profile
  listingsCount?: number
  reviewsCount?: number
}

function getTrustLabel(score: number) {
  if (score <= 20) return 'New Member'
  if (score <= 50) return 'Active Member'
  if (score <= 75) return 'Trusted Member'
  return 'Highly Trusted Member'
}

function getTrustBarColor(score: number) {
  if (score <= 30) return 'bg-red-500'
  if (score <= 60) return 'bg-yellow-500'
  if (score <= 80) return 'bg-green-500'
  return 'bg-[#FF385C]'
}

export default function TrustScore({ profile, listingsCount, reviewsCount }: TrustScoreProps) {
  const checks = {
    emailVerified: Boolean(profile.email),
    phoneVerified: Boolean(profile.phone),
    idVerified: profile.is_verified,
    hasProfilePhoto: Boolean(profile.avatar_url),
    hasBio: Boolean(profile.bio?.trim()),
    hasListings: (listingsCount ?? profile.total_listings ?? 0) >= 1,
    enoughReviews: (reviewsCount ?? profile.total_reviews_received ?? 0) >= 5,
    strongRating: (profile.average_rating ?? 0) > 4.0,
  }

  const score =
    (checks.emailVerified ? 20 : 0) +
    (checks.phoneVerified ? 20 : 0) +
    (checks.idVerified ? 20 : 0) +
    (checks.hasProfilePhoto ? 10 : 0) +
    (checks.hasBio ? 5 : 0) +
    (checks.hasListings ? 5 : 0) +
    (checks.enoughReviews ? 10 : 0) +
    (checks.strongRating ? 10 : 0)

  const label = getTrustLabel(score)
  const barColor = getTrustBarColor(score)

  const rows = [
    { ok: checks.emailVerified, text: 'Email verified' },
    { ok: checks.phoneVerified, text: 'Phone verified' },
    { ok: checks.idVerified, text: 'ID verified' },
    { ok: checks.hasListings, text: `${listingsCount ?? profile.total_listings ?? 0} completed listings` },
    { ok: checks.strongRating, text: `${(profile.average_rating || 0).toFixed(1)} average rating` },
  ]

  return (
    <div className="rounded-2xl border border-[#EBEBEB] bg-[#F7F7F7] p-5 dark:border-[#3D3D3D] dark:bg-[#1A1A1A]">
      <h3 className="text-lg font-semibold text-[#222222] dark:text-white">Trust Score</h3>

      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#E5E5E5] dark:bg-[#2D2D2D]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${score}%` }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className={`h-full ${barColor}`}
          />
        </div>
        <p className="mt-2 text-sm font-semibold text-[#222222] dark:text-white">
          {score}/100
        </p>
      </div>

      <div className="mt-4 space-y-1.5 text-sm">
        {rows.map((row) => (
          <p key={row.text} className={row.ok ? 'text-[#222222] dark:text-white' : 'text-[#717171] dark:text-[#A0A0A0]'}>
            {row.ok ? '✅' : '⬜'} {row.text}
          </p>
        ))}
      </div>

      <p className="mt-4 text-sm font-semibold text-[#222222] dark:text-white">{label}</p>
    </div>
  )
}
