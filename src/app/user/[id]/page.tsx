'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, MapPin, Calendar, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Profile, ListingWithDetails } from '@/types'
import { getInitials, formatDate } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'

export default function UserProfilePage() {
  const params = useParams()
  const userId = params?.id as string
  const supabase = createClient()
  const [owner, setOwner] = useState<Profile | null>(null)
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserData = useCallback(async () => {
    try {
      const [{ data: profileData }, { data: listingsData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase
          .from('listings')
          .select('*, owner:profiles(*), category:categories(*)')
          .eq('owner_id', userId)
          .eq('status', 'active')
          .order('created_at', { ascending: false }),
      ])
      if (profileData) setOwner(profileData as Profile)
      if (listingsData) setListings(listingsData as ListingWithDetails[])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [userId, supabase])

  useEffect(() => { fetchUserData() }, [fetchUserData])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="h-28 w-1/2 shimmer rounded-2xl mb-8" />
        <SkeletonGrid count={6} />
      </div>
    )
  }

  if (!owner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[#717171]">User not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      {/* Owner Header */}
      <div className="flex items-start gap-5 mb-8 pb-8 border-b border-[#EBEBEB]">
        <div className="w-20 h-20 rounded-full bg-[#717171] text-white flex items-center justify-center text-2xl font-semibold flex-shrink-0 overflow-hidden">
          {owner.avatar_url ? (
            <Image src={owner.avatar_url} alt={owner.full_name || 'User'} width={80} height={80} className="object-cover w-full h-full" unoptimized />
          ) : (
            <span>{getInitials(owner.full_name)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-[#222222]">{owner.full_name || 'ORMA Member'}</h1>
          {owner.is_verified && <span className="text-sm text-green-600 font-medium">✓ Verified</span>}

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#717171]">
            {owner.city && (
              <span className="flex items-center gap-1"><MapPin size={14} />{owner.city}</span>
            )}
            <span className="flex items-center gap-1"><Calendar size={14} />Joined {formatDate(owner.created_at)}</span>
            <span className="flex items-center gap-1"><Package size={14} />{owner.total_listings} listings</span>
            {owner.average_rating > 0 && (
              <span className="flex items-center gap-1"><Star size={14} className="fill-[#FFC107] stroke-[#FFC107]" />{owner.average_rating.toFixed(1)} avg rating</span>
            )}
          </div>

          {owner.bio && <p className="mt-3 text-sm text-[#717171] line-clamp-3">{owner.bio}</p>}
        </div>
      </div>

      {/* Listings Grid */}
      <div>
        <h2 className="text-xl font-semibold text-[#222222] mb-5">
          {owner.full_name?.split(' ')[0]}&apos;s Listings ({listings.length})
        </h2>
        {listings.length === 0 ? (
          <p className="text-[#717171]">This user has no active listings right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
