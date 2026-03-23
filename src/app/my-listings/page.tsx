'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, MapPin, Star, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ListingWithDetails } from '@/types'
import { getRentalPriceDisplay, formatDate } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'
import toast from 'react-hot-toast'

type TabFilter = 'all' | 'active' | 'rented' | 'inactive'

function MyListingsContent() {
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [tab, setTab] = useState<TabFilter>('all')
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchListings = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*, owner:profiles(*), category:categories(*)')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      setListings((data as ListingWithDetails[]) || [])
    } catch (err) { console.error(err) }
    finally { setIsLoading(false) }
  }, [user, supabase])

  useEffect(() => { fetchListings() }, [fetchListings])

  const filtered = tab === 'all' ? listings : listings.filter(l => l.status === tab)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return
    try {
      await supabase.from('listings').delete().eq('id', id)
      setListings(prev => prev.filter(l => l.id !== id))
      toast.success('Listing deleted')
    } catch { toast.error('Delete failed') }
  }

  const handleToggleAvailability = async (id: string, current: boolean) => {
    try {
      await supabase
        .from('listings')
        .update({ is_available: !current, status: !current ? 'active' : 'inactive' })
        .eq('id', id)
      setListings(prev => prev.map(l => l.id === id ? { ...l, is_available: !current, status: !current ? 'active' : 'inactive' } : l))
      toast.success(!current ? 'Listing now active' : 'Listing set to inactive')
    } catch { toast.error('Update failed') }
  }

  const tabs: { value: TabFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'rented', label: 'Currently Rented' },
    { value: 'inactive', label: 'Inactive' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#222222]">My Listings</h1>
        <Link
          href="/list-your-item"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FF385C] text-white font-semibold rounded-xl hover:bg-[#E31C5F] transition-colors text-sm"
        >
          <Plus size={16} />Add Listing
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#EBEBEB] mb-6">
        {tabs.map(t => {
          const count = t.value === 'all' ? listings.length : listings.filter(l => l.status === t.value).length
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.value ? 'border-[#222222] text-[#222222]' : 'border-transparent text-[#717171] hover:text-[#222222]'
              }`}
            >
              {t.label} {count > 0 && `(${count})`}
            </button>
          )
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="text-[#B0B0B0] mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-[#222222] mb-2">No listings here</h2>
          <p className="text-[#717171] mb-5">
            {tab === 'all' ? "You haven't listed anything yet." : `No ${tab} listings.`}
          </p>
          {tab === 'all' && (
            <Link href="/list-your-item" className="px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-xl hover:bg-[#E31C5F] inline-flex items-center gap-2">
              <Plus size={16} />List Your First Item
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(listing => (
            <div key={listing.id} className="flex gap-4 border border-[#DDDDDD] rounded-2xl p-4 hover:border-[#222222] transition-colors">
              {/* Thumbnail */}
              <Link href={`/listing/${listing.id}`} className="flex-shrink-0">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-gray-100">
                  {listing.images?.[0] && (
                    <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" unoptimized />
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/listing/${listing.id}`}>
                      <h3 className="font-semibold text-[#222222] hover:underline line-clamp-1">{listing.title}</h3>
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5 text-sm text-[#717171]">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        listing.status === 'active' ? 'bg-green-100 text-green-700'
                          : listing.status === 'rented' ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>{listing.status}</span>
                      <span className="flex items-center gap-0.5"><MapPin size={12} />{listing.city}</span>
                      {listing.total_reviews > 0 && (
                        <span className="flex items-center gap-0.5"><Star size={12} className="fill-[#FFC107] stroke-[#FFC107]" />{listing.average_rating.toFixed(1)}</span>
                      )}
                    </div>
                    <p className="font-semibold text-[#222222] text-sm mt-1">{getRentalPriceDisplay(listing)}</p>
                    <p className="text-xs text-[#B0B0B0] mt-0.5">Listed {formatDate(listing.created_at)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleAvailability(listing.id, listing.is_available)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title={listing.is_available ? 'Mark as inactive' : 'Mark as active'}
                    >
                      {listing.is_available
                        ? <ToggleRight size={20} className="text-green-500" />
                        : <ToggleLeft size={20} className="text-[#B0B0B0]" />
                      }
                    </button>
                    <Link
                      href={`/listing/${listing.id}`}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="View listing"
                    >
                      <Edit2 size={18} className="text-[#717171]" />
                    </Link>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete listing"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MyListingsPage() {
  return (
    <ProtectedRoute>
      <MyListingsContent />
    </ProtectedRoute>
  )
}
