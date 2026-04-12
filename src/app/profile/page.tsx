'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, MapPin, Phone, Edit3, List, Heart, Star, Calendar, TrendingUp, Shield } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getInitials, formatDate } from '@/lib/utils'
import ProtectedRoute from '@/components/ProtectedRoute'
import toast from '@/lib/toast'

function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="border border-[#DDDDDD] rounded-2xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3" />
            <div className="h-5 bg-gray-200 rounded w-32 mx-auto mb-2" />
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-5" />
            <div className="pt-5 border-t border-[#EBEBEB] space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="border border-[#DDDDDD] rounded-2xl p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-5" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-5 h-5 bg-gray-200 rounded-full" />
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1" />
                    <div className="h-4 bg-gray-200 rounded w-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileContent() {
  const { profile, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [city, setCity] = useState(profile?.city || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [saving, setSaving] = useState(false)

  if (isLoading) {
    return <ProfileSkeleton />
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({ full_name: fullName, phone, city, bio })
      setIsEditing(false)
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold text-[#222222] mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Avatar + Stats */}
        <div className="md:col-span-1">
          <div className="border border-[#DDDDDD] rounded-2xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#717171] flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-3 overflow-hidden">
              {profile?.avatar_url ? (
                <Image src={profile.avatar_url} alt={profile.full_name || 'User'} width={80} height={80} className="object-cover w-full h-full" unoptimized />
              ) : (
                <span>{getInitials(profile?.full_name)}</span>
              )}
            </div>
            <h2 className="font-semibold text-[#222222] text-lg">{profile?.full_name || 'ORMA User'}</h2>
            {profile?.is_verified && <p className="text-sm text-[#222222] mt-0.5">✓ Verified</p>}
            <p className="text-sm text-[#717171] mt-1">
              Member since {profile?.created_at ? formatDate(profile.created_at) : 'N/A'}
            </p>

            {/* Stats */}
            <div className="mt-5 pt-5 border-t border-[#EBEBEB] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#717171]">Listings</span>
                <span className="font-semibold text-[#222222]">{profile?.total_listings || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#717171]">Reviews</span>
                <span className="font-semibold text-[#222222]">{profile?.total_reviews_received || 0}</span>
              </div>
              {(profile?.average_rating || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#717171]">Avg Rating</span>
                  <span className="font-semibold text-[#222222] flex items-center gap-1">
                    <Star size={12} className="fill-[#222222] stroke-[#222222]" />
                    {profile?.average_rating?.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="mt-5 space-y-2">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[#222222] dark:text-white hover:underline justify-center">
                <TrendingUp size={16} className="text-[#717171] dark:text-[#A0A0A0]" />Dashboard
              </Link>
              <Link href="/my-listings" className="flex items-center gap-2 text-sm text-[#222222] dark:text-white hover:underline justify-center">
                <List size={16} className="text-[#717171] dark:text-[#A0A0A0]" />My Listings
              </Link>
              <Link href="/wishlist" className="flex items-center gap-2 text-sm text-[#222222] hover:underline justify-center">
                <Heart size={16} />Wishlist
              </Link>
              <Link href="/verification" className="flex items-center gap-2 text-sm text-[#222222] dark:text-white hover:underline justify-center">
                <Shield size={16} className="text-[#717171] dark:text-[#A0A0A0]" />
                Verification
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: Edit Form */}
        <div className="md:col-span-2">
          <div className="border border-[#DDDDDD] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-[#222222]">Personal Info</h3>
              {!isEditing && (
                <button
                  onClick={() => {
                    setFullName(profile?.full_name || '')
                    setPhone(profile?.phone || '')
                    setCity(profile?.city || '')
                    setBio(profile?.bio || '')
                    setIsEditing(true)
                  }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#222222] hover:underline"
                >
                  <Edit3 size={14} />Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#222222] mb-1">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] mb-1">City</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#222222] mb-1">Bio (optional)</label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={3}
                    placeholder="Tell renters a bit about yourself..."
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] text-[#222222] resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-3 border border-[#DDDDDD] rounded-xl text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-3 bg-[#000000] text-white font-semibold rounded-xl hover:bg-[#333333] transition-colors disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { icon: User, label: 'Name', value: profile?.full_name || '—' },
                  { icon: Phone, label: 'Phone', value: profile?.phone ? `+91 ${profile.phone}` : '—' },
                  { icon: MapPin, label: 'City', value: profile?.city || '—' },
                  { icon: Calendar, label: 'Joined', value: profile?.created_at ? formatDate(profile.created_at) : '—' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <Icon size={20} className="text-[#717171] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#717171]">{label}</p>
                      <p className="text-sm text-[#222222] mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
                {profile?.bio && (
                  <div className="pt-2 border-t border-[#EBEBEB]">
                    <p className="text-xs text-[#717171] mb-1">Bio</p>
                    <p className="text-sm text-[#222222]">{profile.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
