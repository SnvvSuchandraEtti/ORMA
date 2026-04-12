// ================================================================
// ORMA — TypeScript Type Definitions
// ================================================================

// ----------------------------------------------------------------
// PROFILE
// ----------------------------------------------------------------
export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  phone: string | null
  city: string | null
  state: string | null
  bio: string
  is_verified: boolean
  is_owner: boolean
  total_listings: number
  total_reviews_received: number
  average_rating: number
  created_at: string
  updated_at: string
}

// ----------------------------------------------------------------
// CATEGORY
// ----------------------------------------------------------------
export interface Category {
  id: number
  name: string
  slug: string
  icon_name: string
  description: string
  display_order: number
  is_active: boolean
  created_at: string
}

// ----------------------------------------------------------------
// LISTING
// ----------------------------------------------------------------
export type ListingCondition = 'excellent' | 'good' | 'fair'
export type ListingStatus = 'active' | 'rented' | 'inactive' | 'pending' | 'rejected'
export type PreferredContact = 'phone' | 'whatsapp' | 'email' | 'all'

export interface Listing {
  id: string
  owner_id: string
  category_id: number

  // Basic Info
  title: string
  description: string
  condition: ListingCondition
  brand: string
  model: string

  // Images
  images: string[]

  // Pricing
  price_per_hour: number | null
  price_per_day: number
  price_per_week: number | null
  price_per_month: number | null
  security_deposit: number

  // Location
  city: string
  area: string
  state: string
  pincode: string
  full_address: string
  latitude: number | null
  longitude: number | null

  // Contact
  contact_phone: string
  contact_whatsapp: string
  contact_email: string
  preferred_contact: PreferredContact

  // Terms
  terms_and_conditions: string
  id_proof_required: boolean
  delivery_available: boolean
  minimum_rental_period: string
  maximum_rental_period: string

  // Status & Metrics
  status: ListingStatus
  is_available: boolean
  is_featured: boolean
  views_count: number
  inquiries_count: number

  // Ratings
  average_rating: number
  total_reviews: number

  // Timestamps
  created_at: string
  updated_at: string
  available_from: string
  available_until: string | null

  // Optional joined relations
  owner?: Profile
  category?: Category
}

// Listing with guaranteed joined relations
export interface ListingWithDetails extends Listing {
  owner: Profile
  category: Category
}

// ----------------------------------------------------------------
// REVIEW
// ----------------------------------------------------------------
export interface Review {
  id: string
  listing_id: string
  reviewer_id: string
  owner_id: string
  rating: number
  title: string
  comment: string
  is_verified_rental: boolean
  created_at: string
  updated_at: string

  // Optional joined
  reviewer?: Profile
}

// ----------------------------------------------------------------
// WISHLIST
// ----------------------------------------------------------------
export interface WishlistItem {
  id: string
  user_id: string
  listing_id: string
  created_at: string

  // Optional joined
  listing?: ListingWithDetails
}

// ----------------------------------------------------------------
// INQUIRY
// ----------------------------------------------------------------
export interface Inquiry {
  id: string
  listing_id: string
  sender_id: string
  owner_id: string
  message: string
  status: 'sent' | 'read' | 'replied'
  created_at: string
}

// ----------------------------------------------------------------
// CREATE LISTING FORM STATE
// ----------------------------------------------------------------
export interface CreateListingFormData {
  category_id: number | null
  category_name: string
  images: File[]
  imageUrls: string[]
  title: string
  description: string
  condition: ListingCondition
  brand: string
  model: string
  price_per_hour: string
  price_per_day: string
  price_per_week: string
  price_per_month: string
  security_deposit: string
  city: string
  area: string
  state: string
  pincode: string
  contact_phone: string
  contact_whatsapp: string
  contact_email: string
  preferred_contact: PreferredContact
  terms_and_conditions: string
  id_proof_required: boolean
  delivery_available: boolean
  minimum_rental_period: string
}

// ----------------------------------------------------------------
// SEARCH FILTERS
// ----------------------------------------------------------------
export interface SearchFilters {
  q?: string
  category?: string
  city?: string
  minPrice?: string
  maxPrice?: string
  condition?: string
  sort?: SortOption
}

// ----------------------------------------------------------------
// SORT OPTIONS
// ----------------------------------------------------------------
export type SortOption = 'newest' | 'recommended' | 'popular' | 'price_asc' | 'price_desc' | 'rating'

// ----------------------------------------------------------------
// MESSAGING
// ----------------------------------------------------------------
export interface Conversation {
  id: string
  listing_id: string
  participant_1: string
  participant_2: string
  last_message_text: string
  last_message_at: string
  created_at: string
  
  // Relations
  listing?: ListingWithDetails
  participant1_profile?: Profile
  participant2_profile?: Profile
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  message: string
  is_read: boolean
  created_at: string

  // Relations
  sender?: Profile
}

export interface MessageWithConversation extends Omit<Message, 'sender'> {
  sender?: { full_name: string }
  conversation: {
    listing_id: string
    listings: { title: string }
  }
}

// ----------------------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------------------
export type NotificationType = 'inquiry' | 'review' | 'system' | 'milestone' | 'welcome'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  link: string
  is_read: boolean
  created_at: string
}
