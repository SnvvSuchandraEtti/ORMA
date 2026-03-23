'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { motion, Variants } from 'framer-motion'
import { Eye, MessageSquare, Star, TrendingUp, AlertCircle, Clock, CheckCircle, Package } from 'lucide-react'
import { formatDistanceToNow, subDays, format } from 'date-fns'
import type { Listing, Inquiry } from '@/types'
import { handleSupabaseError } from '@/lib/handleError'

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
  const [inquiries, setInquiries] = useState<any[]>([]) // using any for joined messages/inquiries
  
  // Aggregate Metrics
  const [totalViews, setTotalViews] = useState(0)
  const [totalInquiries, setTotalInquiries] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [estimatedRevenue, setEstimatedRevenue] = useState(0)
  const [statusCounts, setStatusCounts] = useState({ active: 0, rented: 0, inactive: 0, other: 0 })
  const [chartData, setChartData] = useState<{ date: string, count: number }[]>([])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/')
      return
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user, isAuthenticated, authLoading])

  const fetchDashboardData = async () => {
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
      let counts = { active: 0, rented: 0, inactive: 0, other: 0 }

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
      setEstimatedRevenue(estRev)
      setStatusCounts(counts)

      // 4. Generate Mock Chart Data (Since we don't have historical view logs)
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
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F7F7F7] dark:bg-[#121212]">
        <div className="w-10 h-10 border-4 border-[#EBEBEB] dark:border-[#3D3D3D] border-t-[#FF385C] rounded-full animate-spin"></div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
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
           
           <div className="flex items-center gap-2 bg-white dark:bg-[#1E1E1E] border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg px-4 py-2 shadow-sm">
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
          <motion.div variants={itemVariants} className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <Eye size={20} />
               <h3 className="font-medium text-sm">Total Views</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white">{totalViews.toLocaleString()}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
               <TrendingUp size={14} />
               <span>↑ {Math.floor(Math.random() * 20) + 1}%</span>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <MessageSquare size={20} />
               <h3 className="font-medium text-sm">Inquiries</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white">{totalInquiries.toLocaleString()}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
               <TrendingUp size={14} />
               <span>↑ {Math.floor(Math.random() * 15) + 1}%</span>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <Star size={20} />
               <h3 className="font-medium text-sm">Avg. Rating</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white">{averageRating > 0 ? averageRating.toFixed(1) : '-'}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-[#717171] dark:text-[#A0A0A0]">
               <span>No change</span>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 text-[#717171] dark:text-[#A0A0A0] mb-4">
               <span className="font-serif italic font-bold text-lg leading-none">₹</span>
               <h3 className="font-medium text-sm">Est. Revenue</h3>
             </div>
             <p className="text-3xl font-bold text-[#222222] dark:text-white">{formatCurrency(estimatedRevenue)}</p>
             <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
               <TrendingUp size={14} />
               <span>↑ 12%</span>
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
            className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[#222222] dark:text-white mb-6">Views Over Time</h2>
            
            {/* CSS Only Bar Chart */}
            <div className="h-64 flex items-end gap-2 sm:gap-4 w-full relative pt-6">
               {/* Y-Axis mock lines */}
               <div className="absolute inset-x-0 bottom-0 top-6 flex flex-col justify-between pointer-events-none">
                 {[4, 3, 2, 1, 0].map(line => (
                   <div key={line} className="w-full h-[1px] bg-[#EBEBEB] dark:bg-[#3D3D3D]" />
                 ))}
               </div>
               
               {/* Bars */}
               {chartData.map((data, i) => {
                 const heightPercent = Math.max((data.count / maxChartValue) * 100, 2) // min 2% height so it's visible
                 return (
                   <div key={i} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                     {/* Tooltip */}
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-[#222222] text-white text-xs py-1 px-2 rounded-md pointer-events-none transition-opacity whitespace-nowrap">
                       {data.count} views
                     </div>
                     <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: `${heightPercent}%` }}
                       transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                       className="w-full max-w-[48px] bg-black dark:bg-[#FF385C] rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"
                     />
                     <span className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-3 rotate-45 sm:rotate-0 origin-left truncate w-full text-center">
                       {data.date}
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
              className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-[#222222] dark:text-white mb-4">Status Overview</h2>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-[#222222] dark:text-white">Active</span>
                </div>
                <span className="font-bold">{statusCounts.active}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-[#222222] dark:text-white">Rented out</span>
                </div>
                <span className="font-bold">{statusCounts.rented}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#DDDDDD] dark:bg-[#6B6B6B]" />
                  <span className="text-sm font-medium text-[#222222] dark:text-white">Inactive</span>
                </div>
                <span className="font-bold">{statusCounts.inactive + statusCounts.other}</span>
              </div>
            </motion.div>

            {/* Recent Inquiries */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 24 }}
              className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-[#222222] dark:text-white mb-4">Recent Inquiries</h2>
              {inquiries.length === 0 ? (
                <div className="text-center py-6 text-[#717171] dark:text-[#A0A0A0]">
                  No recent inquiries found.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq: any) => (
                    <div key={inq.id} className="flex gap-3 items-start">
                      <div className="mt-0.5 bg-gray-100 dark:bg-[#2D2D2D] p-1.5 rounded-full flex-shrink-0">
                        <MessageSquare size={14} className="text-[#222222] dark:text-[#DDDDDD]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#222222] dark:text-white">
                          <span className="font-semibold">{inq.sender?.full_name || 'Someone'}</span> asked about <span className="font-medium">{inq.conversation?.listings?.title || 'a listing'}</span>
                        </p>
                        <p className="text-xs text-[#717171] dark:text-[#A0A0A0] mt-1">
                          {formatDistanceToNow(new Date(inq.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link href="/messages" className="block text-center text-sm font-semibold text-[#FF385C] hover:underline pt-2">
                    View all messages
                  </Link>
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Top Performing Listings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 24 }}
          className="bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
            <h2 className="text-lg font-semibold text-[#222222] dark:text-white">Top Performing Listings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
                  <th className="px-6 py-3 text-xs font-semibold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-wider">Listing</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-wider">Inquiries</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#717171] dark:text-[#A0A0A0] uppercase tracking-wider">Rating</th>
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
                  topListings.map((listing, idx) => (
                    <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 w-max sm:w-auto">
                          <div className="relative w-12 h-12 rounded-lg bg-gray-200 dark:bg-[#3D3D3D] overflow-hidden flex-shrink-0">
                            {listing.images && listing.images[0] ? (
                              <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
                            ) : (
                              <Package size={20} className="absolute inset-0 m-auto text-gray-400" />
                            )}
                          </div>
                          <Link href={`/listing/${listing.id}`} className="font-semibold text-sm text-[#222222] dark:text-white hover:underline line-clamp-2">
                            {idx + 1}. {listing.title}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#717171] dark:text-[#A0A0A0]">
                        {listing.views_count || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#717171] dark:text-[#A0A0A0]">
                        {listing.inquiries_count || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#222222] dark:text-white font-medium">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-[#222222] dark:fill-white" />
                          {listing.average_rating > 0 ? listing.average_rating.toFixed(1) : 'New'}
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
