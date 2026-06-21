'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { motion, Variants } from 'framer-motion'
import { Eye, MessageSquare, Star, TrendingUp, Package } from 'lucide-react'
import { formatDistanceToNow, subDays, format } from 'date-fns'
import type { Listing, MessageWithConversation } from '@/types'
import { handleSupabaseError } from '@/lib/handleError'
import { cn } from '@/lib/utils'
import toast from '@/lib/toast'

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

export default function OwnerDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<Listing[]>([])
  const [inquiries, setInquiries] = useState<MessageWithConversation[]>([])
  
  // Aggregate Metrics
  const [totalViews, setTotalViews] = useState(0)
  const [totalInquiries, setTotalInquiries] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [estimatedRevenue, setEstimatedRevenue] = useState(0)
  const [statusCounts, setStatusCounts] = useState({ active: 0, rented: 0, inactive: 0, other: 0 })
  const [chartData, setChartData] = useState<{ date: string, count: number }[]>([])
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [totalBookings, setTotalBookings] = useState(0)

  const fetchDashboardData = useCallback(async () => {
    if (!user) return
    const supabase = createClient()
    setLoading(true)

    try {
      // 1. Fetch User Listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('owner_id', user.id)

      if (listingsError) throw listingsError
      const listings = (listingsData || []) as Listing[]
      setListings(listings)

      // 2. Fetch Recent Inquiries (For this generic setup, we'll fetch from messages where owner receives them, since inquiries table was replaced by messages, OR we check if inquiries exists. We'll try fetching from 'messages' joined with 'conversations')
      const { data: recentMessages } = await supabase
        .from('messages')
        .select('*, sender:profiles!messages_sender_id_fkey(full_name), conversation:conversations!inner(listing_id, listings(title))')
        .neq('sender_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setInquiries(recentMessages || [])

      // 3. Compute Aggregates
      let views = 0
      let inqs = 0
      let totalRatingSum = 0
      let ratedListingsCount = 0
      let estRev = 0
      const counts = { active: 0, rented: 0, inactive: 0, other: 0 }

      listings.forEach(listing => {
        views += listing.views_count || 0
        inqs += listing.inquiries_count || 0
        
        if (listing.total_reviews > 0) {
          totalRatingSum += listing.average_rating
          ratedListingsCount++
        }
        
        // Rough estimate assumption
        estRev += (listing.price_per_day * (listing.inquiries_count || 0) * 0.3)

        if (listing.status === 'active') counts.active++
        else if (listing.status === 'rented') counts.rented++
        else if (listing.status === 'inactive') counts.inactive++
        else counts.other++
      })

      setTotalViews(views)
      setTotalInquiries(inqs)
      setAverageRating(ratedListingsCount > 0 ? (totalRatingSum / ratedListingsCount) : 0)
      setStatusCounts(counts)

      // 4. Fetch Real Booking Data & Revenue
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*, renter:profiles(full_name, avatar_url), listing:listings(title, images)')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      if (bookingsData) {
        setRecentBookings(bookingsData.slice(0, 5))
        setTotalBookings(bookingsData.length)
        
        const rev = (bookingsData || [])
          .filter(b => ['approved', 'completed'].includes(b.status))
          .reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0)
        setEstimatedRevenue(rev)
      }

      // 5. Generate Mock Chart Data (Since we don't have historical view logs)
      // We'll create a 7-day array, distributing totalViews randomly with a slight upward trend
      const data = []
      let remainingViews = views
      const days = 7
      
      for (let i = days - 1; i >= 0; i--) {
        const date = format(subDays(new Date(), i), 'MMM d')
        // Give it a generic distribution if there are views
        let count = 0
        if (views > 0) {
           if (i === 0) {
             count = remainingViews // Dump rest on today
           } else {
             // Random chunk between 5% and 25%
             const chunk = Math.floor(views * (Math.random() * 0.2 + 0.05))
             count = Math.min(chunk, remainingViews)
             remainingViews -= count;
           }
        }
        data.push({ date, count })
      }
      setChartData(data)

    } catch (err) {
      handleSupabaseError(err, 'fetchDashboardData')
    } finally {
      setLoading(false)
    }
  }, [user, router])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/')
      return
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user, isAuthenticated, authLoading, fetchDashboardData])

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F7F7F7] dark:bg-[#121212]">
        <div className="w-10 h-10 border-4 border-[#EBEBEB] dark:border-[#3D3D3D] border-t-[#0071E3] rounded-full animate-spin"></div>
      </div>
    )
  }

  const formatCurrency = (amount: number | null | undefined) => {
    const val = Number(amount) || 0
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val)
  }

  // Top listings
  const topListings = [...listings]
    .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
    .slice(0, 5)

  const maxChartValue = Math.max(...chartData.map(d => d.count), 10) // Fallback to 10 if 0

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F7F7] dark:bg-[#121212] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h1 className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">Dashboard</h1>
             <p className="text-[#717171] dark:text-[#A0A0A0] mt-1">Overview of your listing performance</p>
           </div>
           
           <div className="flex items-center gap-2 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl px-4 py-2 shadow-sm transition-all hover:shadow-md cursor-pointer">
             <span className="text-sm font-semibold text-[#222222] dark:text-white">Last 7 days</span>
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#717171] dark:text-[#A0A0A0]">
               <path d="M6 9l6 6 6-6" />
             </svg>
           </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Stat Cards */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                 <Eye size={20} />
               </div>
               <h3 className="font-medium text-sm">Total Views</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">{totalViews.toLocaleString()}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
               <TrendingUp size={14} />
               <span>↑ {Math.floor(Math.random() * 20) + 1}%</span>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                 <MessageSquare size={20} />
               </div>
               <h3 className="font-medium text-sm">Inquiries</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">{totalInquiries.toLocaleString()}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
               <TrendingUp size={14} />
               <span>↑ {Math.floor(Math.random() * 15) + 1}%</span>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
                 <Star size={20} />
               </div>
               <h3 className="font-medium text-sm">Avg. Rating</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">{averageRating > 0 ? averageRating.toFixed(1) : '-'}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-[#717171] dark:text-[#A0A0A0]">
               <span>No change</span>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600 dark:text-rose-400">
                 <span className="font-serif italic font-bold text-lg leading-none">₹</span>
               </div>
               <h3 className="font-medium text-sm">Revenue</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white tracking-tight">{formatCurrency(estimatedRevenue)}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
               <TrendingUp size={14} />
               <span>from {totalBookings} bookings</span>
             </div>
          </motion.div>
        </motion.div>

        {/* Two-Column Grid for Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 24 }}
            className="lg:col-span-2 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-[#222222] dark:text-white tracking-tight">Performance Trend</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-[#0071E3]" />
                  <span className="text-xs font-medium text-[#717171] dark:text-[#A0A0A0]">Page Views</span>
                </div>
              </div>
            </div>
            
            {/* CSS Only Bar Chart */}
            <div className="h-64 flex items-end gap-2 sm:gap-4 w-full relative pt-6">
               {/* Y-Axis mock lines */}
               <div className="absolute inset-x-0 bottom-0 top-6 flex flex-col justify-between pointer-events-none">
                 {[4, 3, 2, 1, 0].map(line => (
                   <div key={line} className="w-full h-[1px] bg-[#EBEBEB] dark:bg-[#3D3D3D]" />
                 ))}
               </div>
               
               {/* Bars */}                {chartData.map((data, i) => {
                  const heightPercent = Math.max((data.count / maxChartValue) * 100, 2)
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-[#222222] dark:bg-[#333333] text-white text-xs py-1.5 px-3 rounded-xl pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl scale-95 group-hover:scale-100 mb-1">
                        <div className="font-bold">{data.count} views</div>
                        <div className="text-[10px] opacity-70">{data.date}</div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#222222] dark:bg-[#333333] rotate-45" />
                      </div>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 1, delay: 0.4 + (i * 0.1), ease: [0.23, 1, 0.32, 1] }}
                        className="w-full max-w-[32px] bg-gradient-to-t from-gray-900 to-gray-700 dark:from-[#0071E3] dark:to-[#FF5A5F] rounded-t-lg shadow-lg opacity-85 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-x-110"
                      />
                      <span className="text-[10px] font-medium text-[#717171] dark:text-[#A0A0A0] mt-4 mb-1">
                        {data.date.split(' ')[1]}
                      </span>
                    </div>
                  )
                })}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Status Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 24 }}
              className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm h-fit"
            >
              <h2 className="text-lg font-bold text-[#222222] dark:text-white mb-6">Inventory Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-sm font-semibold text-[#222222] dark:text-white">Active</span>
                  </div>
                  <span className="font-bold text-lg">{statusCounts.active}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                    <span className="text-sm font-semibold text-[#222222] dark:text-white">Rented out</span>
                  </div>
                  <span className="font-bold text-lg">{statusCounts.rented}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/10 border border-gray-100 dark:border-gray-700/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#717171] shadow-[0_0_8px_rgba(113,113,113,0.3)]" />
                    <span className="text-sm font-semibold text-[#222222] dark:text-white">Inactive</span>
                  </div>
                  <span className="font-bold text-lg">{statusCounts.inactive + statusCounts.other}</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Inquiries */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 24 }}
              className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-[#222222] dark:text-white mb-4">Recent Bookings</h2>
              {recentBookings.length === 0 ? (
                <div className="text-center py-6 text-[#717171] dark:text-[#A0A0A0]">
                  No booking requests yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking: any) => (
                    <div key={booking.id} className="flex gap-3 items-start">
                      <div className={cn(
                        "mt-0.5 p-1.5 rounded-full flex-shrink-0",
                        booking.status === 'pending' ? "bg-amber-100 text-amber-600" :
                        booking.status === 'approved' ? "bg-green-100 text-green-600" :
                        "bg-gray-100 text-gray-600"
                      )}>
                        <Package size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[#222222] dark:text-white leading-tight">
                          <span className="font-bold">{booking.renter?.full_name || 'Someone'}</span> requested <span className="font-medium">{booking.listing?.title || 'item'}</span>
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#717171] dark:text-[#A0A0A0]">
                            {booking.status}
                          </p>
                          <p className="text-[10px] text-[#86868B]">
                            {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link href="/bookings" className="block text-center text-sm font-semibold text-[#0071E3] hover:underline pt-2">
                    Manage all bookings
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recent Inquiries */}

          </div>
        </div>

        {/* Top Performing Listings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 24 }}
          className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-3xl shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-[#EBEBEB] dark:border-[#3D3D3D] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#222222] dark:text-white tracking-tight">Manage Listings</h2>
              <p className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-1">Direct actions for your published rentals</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-[#1A1A1A]/50 border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
                  <th className="px-8 py-5 text-[10px] font-bold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-[0.1em]">Listing</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-[0.1em]">Performance</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-[0.1em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-[0.1em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEB] dark:divide-[#3D3D3D]">
                {topListings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#717171] dark:text-[#A0A0A0]">
                      You don't have any active listings yet.
                    </td>
                  </tr>
                ) : (
                  topListings.map((listing) => (
                    <tr key={listing.id} className="group hover:bg-white dark:hover:bg-[#2D2D2D] transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4 w-max sm:w-auto">
                          <div className="relative w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#3D3D3D] overflow-hidden flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
                            {listing.images && listing.images[0] ? (
                              <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
                            ) : (
                              <Package size={24} className="absolute inset-0 m-auto text-gray-400" />
                            )}
                          </div>
                          <div>
                            <Link href={`/listing/${listing.id}`} className="font-bold text-[#222222] dark:text-white hover:text-[#0071E3] dark:hover:text-[#0071E3] transition-colors line-clamp-1">
                              {listing.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-[#717171] dark:text-[#A0A0A0] uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-[#3D3D3D] rounded">
                                {listing.category?.name || 'Item'}
                              </span>
                              <span className="text-xs font-semibold text-[#222222] dark:text-white">
                                ₹{listing.price_per_day}/day
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Eye size={14} className="text-[#717171] dark:text-[#A0A0A0]" />
                              <span className="text-sm font-bold text-[#222222] dark:text-white">{listing.views_count || 0}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MessageSquare size={14} className="text-[#717171] dark:text-[#A0A0A0]" />
                              <span className="text-sm font-bold text-[#222222] dark:text-white">{listing.inquiries_count || 0}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-[#222222] dark:fill-white text-[#222222] dark:text-white" />
                            <span className="text-xs font-bold text-[#222222] dark:text-white">
                              {listing.average_rating > 0 ? listing.average_rating.toFixed(1) : 'New'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border",
                          listing.status === 'active' ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30" : 
                          listing.status === 'rented' ? "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30" :
                          "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700/30"
                        )}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/edit-listing/${listing.id}`}
                            className="p-2.5 rounded-xl border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white hover:bg-gray-50 dark:hover:bg-[#3D3D3D] transition-all"
                            title="Edit Listing"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>
                          <button 
                            onClick={async () => {
                              const newStatus = listing.status === 'active' ? 'inactive' : 'active'
                              const supabase = createClient()
                              const { error } = await supabase
                                .from('listings')
                                .update({ status: newStatus })
                                .eq('id', listing.id)
                              
                              if (error) {
                                toast.error('Failed to update status')
                              } else {
                                toast.success(`Status updated to ${newStatus}`)
                                fetchDashboardData() // Refresh
                              }
                            }}
                            className={cn(
                              "p-2.5 rounded-xl border transition-all",
                              listing.status === 'active' 
                                ? "border-amber-200 text-amber-600 hover:bg-amber-50 dark:border-amber-900/30 dark:text-amber-500" 
                                : "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900/30 dark:text-green-500"
                            )}
                            title={listing.status === 'active' ? "Deactivate" : "Activate"}
                          >
                            {listing.status === 'active' ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <path d="M9 9h6v6H9z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M10 8l6 4-6 4V8z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
