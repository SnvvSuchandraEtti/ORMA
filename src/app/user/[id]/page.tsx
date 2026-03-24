'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, MapPin, Calendar, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Profile, ListingWithDetails } from '@/types'
import { getInitials, formatDate } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'
import TrustScore from '@/components/TrustScore'
import { SkeletonGrid } from '@/components/ListingCardSkeleton'
import { handleSupabaseError } from '@/lib/handleError'

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
      handleSupabaseError(err, 'fetchUserProfile')
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
      <div className="relative mb-12">
        {/* Banner Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#FF385C]/10 via-[#E31C5F]/5 to-transparent rounded-3xl -z-10 dark:from-[#FF385C]/20 dark:via-[#E31C5F]/10 dark:to-transparent" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-8 px-4 md:px-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-[#1E1E1E] p-1 shadow-xl shadow-black/5 ring-1 ring-black/5 dark:ring-white/10 transition-transform group-hover:scale-105 duration-300">
              <div className="w-full h-full rounded-full bg-[#717171] text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
                {owner.avatar_url ? (
                  <Image src={owner.avatar_url} alt={owner.full_name || 'User'} width={96} height={96} className="object-cover w-full h-full" unoptimized />
                ) : (
                  <span>{getInitials(owner.full_name)}</span>
                )}
              </div>
            </div>
            {owner.is_verified && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1E1E1E] p-1 rounded-full shadow-md">
                <div className="bg-[#008A05] text-white rounded-full p-1">
                  <span className="text-[10px] font-bold px-1">✓</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">
                {owner.full_name || 'ORMA Member'}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
              {owner.city && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1E1E1E] rounded-full border border-black/[0.05] dark:border-white/[0.05] shadow-sm text-[#222222] dark:text-white">
                  <MapPin size={14} className="text-[#FF385C]" />
                  <span className="font-medium">{owner.city}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1E1E1E] rounded-full border border-black/[0.05] dark:border-white/[0.05] shadow-sm text-[#717171] dark:text-[#A0A0A0]">
                <Calendar size={14} />
                <span>Joined {formatDate(owner.created_at)}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1E1E1E] rounded-full border border-black/[0.05] dark:border-white/[0.05] shadow-sm text-[#222222] dark:text-white font-semibold">
                <Package size={14} className="text-[#FF385C]" />
                <span>{owner.total_listings} Listings</span>
              </div>
              {owner.average_rating > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1E1E1E] rounded-full border border-black/[0.05] dark:border-white/[0.05] shadow-sm text-[#222222] dark:text-white">
                  <Star size={14} className="fill-[#FFB400] text-[#FFB400]" />
                  <span className="font-bold">{owner.average_rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {owner.bio && (
              <p className="mt-6 text-[#717171] dark:text-[#A0A0A0] max-w-2xl leading-relaxed">
                {owner.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <TrustScore profile={owner} listingsCount={owner.total_listings} reviewsCount={owner.total_reviews_received} />
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
