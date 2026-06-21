import { format, formatDistanceToNow } from 'date-fns'
import type { Listing } from '@/types'

/**
 * Format a number as Indian Rupee currency
 * e.g., 1500 → "₹1,500"
 */
export function formatPrice(amount: number | null | undefined): string {
  const numericAmount = Number(amount)
  if (isNaN(numericAmount)) return '₹0'
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount)
}

/**
 * Format a date string to "Jan 2024" format
 */
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM yyyy')
}

/**
 * Returns time ago string: "2 days ago", "3 months ago"
 */
export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/**
 * Truncate text to maxLength with "..." suffix
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Convert "Canon EOS R5" to "canon-eos-r5"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Get full image URL - if path starts with http return as-is,
 * otherwise construct Supabase storage URL
 */
export function getImageUrl(path: string): string {
  if (!path) return '/placeholder-image.jpg'
  if (path.startsWith('http')) return path
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/listing-images/${path}`
}

/**
 * Get initials from a name: "John Doe" → "JD", "Alice" → "A"
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Conditionally join class names
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Get most relevant price display for a listing
 * Prioritizes: per_day > per_hour > per_week > per_month
 */
export function getRentalPriceDisplay(listing: Listing): string {
  if (listing.price_per_day) {
    return `${formatPrice(listing.price_per_day)}/day`
  }
  if (listing.price_per_hour) {
    return `${formatPrice(listing.price_per_hour)}/hr`
  }
  if (listing.price_per_week) {
    return `${formatPrice(listing.price_per_week)}/week`
  }
  if (listing.price_per_month) {
    return `${formatPrice(listing.price_per_month)}/month`
  }
  return 'Price on request'
}

/**
 * Get Tailwind color classes for item condition badge
 */
export function getConditionBadgeColor(condition: string): string {
  switch (condition) {
    case 'excellent':
      return 'bg-green-100 text-green-800'
    case 'good':
      return 'bg-blue-100 text-blue-800'
    case 'fair':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Format phone number for WhatsApp link
 * Strips all non-digits, ensures starts with country code
 */
export function formatWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('91') && digits.length === 12) return digits
  if (digits.length === 10) return `91${digits}`
  return digits
}

/**
 * Generate WhatsApp link with pre-filled message
 */
export function getWhatsAppLink(phone: string, itemTitle: string): string {
  const number = formatWhatsAppNumber(phone)
  const message = encodeURIComponent(
    `Hi, I'm interested in renting your ${itemTitle} listed on ORMA.`
  )
  return `https://wa.me/${number}?text=${message}`
}
