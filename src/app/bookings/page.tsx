'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarCheck, Clock, CheckCircle, XCircle, Package,
  MessageCircle, Loader2, AlertCircle, Star, Shield
} from 'lucide-react'
import { format } from 'date-fns'
import { useAuth } from '@/hooks/useAuth'
import {
  fetchBookingsForOwner,
  fetchBookingsForRenter,
  updateBookingStatus,
  cancelBooking,
} from '@/hooks/useBookings'
import type { Booking, BookingStatus } from '@/types'
import { formatPrice, getInitials } from '@/lib/utils'
import toast from '@/lib/toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import { createClient } from '@/lib/supabase/client'
import ReviewModal from '@/components/ReviewModal'

// ----------------------------------------------------------------
// STATUS HELPERS
// ----------------------------------------------------------------
const statusConfig: Record<BookingStatus, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-100 dark:border-amber-800/30', icon: Clock },
  approved: { label: 'Approved', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800/30', icon: CheckCircle },
  rejected: { label: 'Declined', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-800/30', icon: XCircle },
  cancelled: { label: 'Cancelled', color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-800/20', border: 'border-gray-100 dark:border-gray-700/30', icon: XCircle },
  completed: { label: 'Completed', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800/30', icon: CheckCircle },
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = statusConfig[status] || {
    label: status || 'Unknown',
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-800/20',
    border: 'border-gray-100 dark:border-gray-700/30',
    icon: Clock
  }
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <Icon size={12} />
      {cfg.label}
    </span>
  )
}

// ----------------------------------------------------------------
// BOOKING CARD (shared by both tabs)
// ----------------------------------------------------------------
function BookingCard({
  booking,
  viewAs,
  onAction,
  actionLoading,
}: {
  booking: Booking
  viewAs: 'owner' | 'renter'
  onAction: (bookingId: string, action: string, response?: string) => Promise<void>
  actionLoading: string | null
}) {
  const [showResponse, setShowResponse] = useState(false)
  const [responseText, setResponseText] = useState('')

  const listing = booking.listing
  const otherUser = viewAs === 'owner' ? booking.renter : booking.owner
  const image = listing?.images?.[0] || ''
  const isLoading = actionLoading === booking.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Listing Image */}
        <div className="relative w-full sm:w-40 h-36 sm:h-auto flex-shrink-0 bg-[#F5F5F7] dark:bg-[#2C2C2E]">
          {image ? (
            <Image src={image} alt={listing?.title || 'Listing'} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={32} className="text-[#86868B]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <Link
                href={`/listing/${booking.listing_id}`}
                className="text-base font-bold text-[#222222] dark:text-white hover:text-[#0071E3] dark:hover:text-[#0071E3] transition-colors line-clamp-1"
              >
                {listing?.title || 'Listing'}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-[#86868B] flex items-center justify-center text-white text-[9px] font-bold overflow-hidden flex-shrink-0">
                    <span>{getInitials(otherUser?.full_name)}</span>
                </div>
                <span className="text-xs text-[#717171] dark:text-[#A0A0A0]">
                  {viewAs === 'owner' ? 'From' : 'Owner:'} <span className="font-semibold text-[#222222] dark:text-white">{otherUser?.full_name || 'User'}</span>
                </span>
              </div>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          {/* Dates & Pricing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">From</p>
              <p className="text-sm font-semibold text-[#222222] dark:text-white">{format(new Date(booking.start_date), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">To</p>
              <p className="text-sm font-semibold text-[#222222] dark:text-white">{format(new Date(booking.end_date), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">Duration</p>
              <p className="text-sm font-semibold text-[#222222] dark:text-white">{(booking.total_days || 0)} {(booking.total_days || 0) === 1 ? 'day' : 'days'}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">Total</p>
              <p className="text-sm font-bold text-[#222222] dark:text-white">{formatPrice(booking.total_amount || 0)}</p>
            </div>
          </div>

          {/* Renter Message */}
          {booking.renter_message && (
            <div className="mb-3 px-3 py-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl">
              <p className="text-[10px] font-semibold text-[#86868B] uppercase mb-0.5">
                {viewAs === 'owner' ? 'Renter message' : 'Your message'}
              </p>
              <p className="text-sm text-[#222222] dark:text-white">{booking.renter_message}</p>
            </div>
          )}

          {/* Owner Response */}
          {booking.owner_response && (
            <div className="mb-3 px-3 py-2 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/20">
              <p className="text-[10px] font-semibold text-[#86868B] uppercase mb-0.5">
                {viewAs === 'owner' ? 'Your response' : 'Owner response'}
              </p>
              <p className="text-sm text-[#222222] dark:text-white">{booking.owner_response}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {viewAs === 'owner' && booking.status === 'pending' && (
              <>
                <button
                  onClick={() => onAction(booking.id, 'approve')}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isLoading ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
                  Approve
                </button>
                <button
                  onClick={() => setShowResponse(!showResponse)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-1.5"
                >
                  <XCircle size={13} />
                  Decline
                </button>
              </>
            )}

            {viewAs === 'owner' && booking.status === 'approved' && (
              <>
                <button
                  onClick={() => onAction(booking.id, 'complete')}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isLoading ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
                  Mark Completed
                </button>
                <button
                  onClick={() => onAction(booking.id, 'cancel')}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-[#D2D2D7] dark:border-[#38383A] text-[#222222] dark:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            )}

            {viewAs === 'renter' && booking.status === 'pending' && (
              <button
                onClick={() => onAction(booking.id, 'cancel')}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-[#D2D2D7] dark:border-[#38383A] text-[#222222] dark:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {isLoading ? <Loader2 size={13} className="animate-spin" /> : <XCircle size={13} />}
                Cancel Request
              </button>
            )}

            {/* Message link */}
            <Link
              href={`/messages?listing=${booking.listing_id}`}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#D2D2D7] dark:border-[#38383A] text-[#222222] dark:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle size={13} />
              Message
            </Link>
          </div>

          {/* Review & Refund Actions */}
          {(booking.status === 'completed') && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
              {viewAs === 'renter' && (
                <button
                  onClick={() => onAction(booking.id, 'open-review', booking.listing_id + '|' + booking.owner_id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#222222] dark:bg-white text-white dark:text-[#222222] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Star size={13} className="fill-current" />
                  Leave a Review
                </button>
              )}

              {viewAs === 'owner' && booking.security_deposit > 0 && (
                <button
                  onClick={() => onAction(booking.id, 'refund-deposit')}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors flex items-center gap-1.5"
                >
                  <Shield size={13} />
                  Issue Deposit Refund
                </button>
              )}
            </div>
          )}

          {/* Reject Response Input */}
          <AnimatePresence>
            {showResponse && viewAs === 'owner' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Optional: reason for declining…"
                  rows={2}
                  maxLength={300}
                  className="w-full px-4 py-3 rounded-xl border border-[#D2D2D7] dark:border-[#38383A] bg-[#F5F5F7] dark:bg-[#2C2C2E] text-sm text-[#1D1D1F] dark:text-white placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none"
                />
                <button
                  onClick={async () => {
                    await onAction(booking.id, 'reject', responseText)
                    setShowResponse(false)
                    setResponseText('')
                  }}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Declining…' : 'Confirm Decline'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ----------------------------------------------------------------
// SKELETON
// ----------------------------------------------------------------
function BookingCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-40 h-36 sm:h-auto bg-[#EBEBEB] dark:bg-[#3D3D3D]" />
        <div className="flex-1 p-5 space-y-3">
          <div className="h-5 w-2/3 bg-[#EBEBEB] dark:bg-[#3D3D3D] rounded" />
          <div className="h-4 w-1/3 bg-[#EBEBEB] dark:bg-[#3D3D3D] rounded" />
          <div className="h-4 w-full bg-[#EBEBEB] dark:bg-[#3D3D3D] rounded" />
          <div className="h-8 w-24 bg-[#EBEBEB] dark:bg-[#3D3D3D] rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------
// EMPTY STATE
// ----------------------------------------------------------------
function EmptyState({ viewAs }: { viewAs: 'owner' | 'renter' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] flex items-center justify-center mb-6">
        <CalendarCheck size={36} className="text-[#86868B]" />
      </div>
      <h3 className="text-xl font-bold text-[#222222] dark:text-white mb-2">
        {viewAs === 'owner' ? 'No booking requests yet' : 'No bookings yet'}
      </h3>
      <p className="text-sm text-[#717171] dark:text-[#A0A0A0] max-w-sm">
        {viewAs === 'owner'
          ? 'When renters request to book your items, they\'ll appear here.'
          : 'When you request to book an item, your bookings will show up here.'}
      </p>
      <Link
        href={viewAs === 'owner' ? '/list-your-item' : '/search'}
        className="mt-6 px-6 py-3 bg-[#0071E3] text-white font-semibold rounded-full hover:bg-[#0077ED] transition-colors text-sm"
      >
        {viewAs === 'owner' ? 'List an item' : 'Browse items'}
      </Link>
    </div>
  )
}

// ----------------------------------------------------------------
// MAIN PAGE
// ----------------------------------------------------------------
type TabKey = 'incoming' | 'my-bookings'
type FilterKey = 'all' | BookingStatus

export default function BookingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<TabKey>('incoming')
  const [filter, setFilter] = useState<FilterKey>('all')
  const [ownerBookings, setOwnerBookings] = useState<Booking[]>([])
  const [renterBookings, setRenterBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  
  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewTarget, setReviewTarget] = useState<{listingId: string, ownerId: string} | null>(null)

  const fetchData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const [owner, renter] = await Promise.all([
        fetchBookingsForOwner(user.id),
        fetchBookingsForRenter(user.id),
      ])
      setOwnerBookings(owner)
      setRenterBookings(renter)

      // Auto-select tab: if user has no owner bookings, show renter tab
      if (owner.length === 0 && renter.length > 0) {
        setActiveTab('my-bookings')
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/')
      return
    }
    if (user) {
      fetchData()

      // Realtime subscription for status updates
      const channel = supabase
        .channel(`bookings-realtime-${user.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings',
            filter: `owner_id=eq.${user.id}`,
          },
          () => fetchData()
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings',
            filter: `renter_id=eq.${user.id}`,
          },
          () => fetchData()
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user, isAuthenticated, authLoading, fetchData, router, supabase])

  const handleAction = async (bookingId: string, action: string, response?: string) => {
    if (action === 'open-review') {
      const [listingId, ownerId] = (response || '').split('|')
      setReviewTarget({ listingId, ownerId })
      setReviewModalOpen(true)
      return
    }

    if (action === 'refund-deposit') {
      toast.success('Deposit Refund Initiated', 'The money will be returned to the renter in 3-5 days.')
      return
    }

    setActionLoading(bookingId)
    try {
      switch (action) {
        case 'approve':
          await updateBookingStatus(bookingId, 'approved')
          toast.success('Booking approved!', 'The renter has been notified')
          break
        case 'reject':
          await updateBookingStatus(bookingId, 'rejected', response)
          toast.success('Booking declined', 'The renter has been notified')
          break
        case 'complete':
          await updateBookingStatus(bookingId, 'completed')
          toast.success('Rental completed!', 'Great job!')
          break
        case 'cancel':
          await cancelBooking(bookingId)
          toast.success('Booking cancelled')
          break
      }
      await fetchData()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Action failed'
      toast.error('Action failed', message)
    } finally {
      setActionLoading(null)
    }
  }

  const currentBookings = activeTab === 'incoming' ? ownerBookings : renterBookings
  const filteredBookings = filter === 'all'
    ? currentBookings
    : currentBookings.filter((b) => b.status === filter)

  const pendingCount = ownerBookings.filter((b) => b.status === 'pending').length

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'incoming', label: 'Incoming Requests', count: ownerBookings.length },
    { key: 'my-bookings', label: 'My Bookings', count: renterBookings.length },
  ]

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Declined' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-[calc(100vh-80px)] bg-[#F7F7F7] dark:bg-[#121212] py-8 px-4 md:px-8 pb-28 md:pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">Bookings</h1>
              <p className="text-[#717171] dark:text-[#A0A0A0] mt-1">Manage your rental requests and reservations</p>
            </div>
            {pendingCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  {pendingCount} pending {pendingCount === 1 ? 'request' : 'requests'}
                </span>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl mb-6 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setFilter('all') }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#222222] dark:bg-white text-white dark:text-[#222222] shadow-sm'
                    : 'text-[#717171] dark:text-[#A0A0A0] hover:text-[#222222] dark:hover:text-white'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.key
                      ? 'bg-white/20 dark:bg-black/20'
                      : 'bg-[#EBEBEB] dark:bg-[#3D3D3D]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {filters.map((f) => {
              const count = currentBookings.filter((b) => f.key === 'all' || b.status === f.key).length
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    filter === f.key
                      ? 'bg-[#0071E3] text-white border-[#0071E3]'
                      : 'bg-white dark:bg-[#1E1E1E] text-[#717171] dark:text-[#A0A0A0] border-[#EBEBEB] dark:border-[#3D3D3D] hover:border-[#0071E3] hover:text-[#0071E3]'
                  }`}
                >
                  {f.label} ({count})
                </button>
              )
            })}
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <BookingCardSkeleton key={i} />)}
            </div>
          ) : filteredBookings.length === 0 ? (
            filter !== 'all' ? (
              <div className="text-center py-16">
                <p className="text-[#717171] dark:text-[#A0A0A0]">No {filter} bookings found</p>
                <button onClick={() => setFilter('all')} className="mt-3 text-sm font-semibold text-[#0071E3] hover:underline">
                  Show all bookings
                </button>
              </div>
            ) : (
              <EmptyState viewAs={activeTab === 'incoming' ? 'owner' : 'renter'} />
            )
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  viewAs={activeTab === 'incoming' ? 'owner' : 'renter'}
                  onAction={handleAction}
                  actionLoading={actionLoading}
                />
              ))}
            </div>
          )}
          {/* Modals */}
          {reviewModalOpen && reviewTarget && (
            <ReviewModal
              isOpen={reviewModalOpen}
              onClose={() => { setReviewModalOpen(false); setReviewTarget(null) }}
              listingId={reviewTarget.listingId}
              ownerId={reviewTarget.ownerId}
              onReviewSubmitted={() => {
                toast.success('Review published!')
                fetchData()
              }}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
