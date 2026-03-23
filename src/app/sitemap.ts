import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = 'https://orma.app'

  // Core static marketing and index routes
  const routes = [
    '',
    '/about',
    '/how-it-works',
    '/contact',
    '/faq',
    '/terms',
    '/privacy',
    '/search',
  ]

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch active listings for direct indexation
  const { data: listings } = await supabase
    .from('listings')
    .select('id, created_at')
    .eq('status', 'active')

  const listingRoutes: MetadataRoute.Sitemap = (listings || []).map((listing) => ({
    url: `${baseUrl}/listing/${listing.id}`,
    lastModified: new Date(listing.created_at),
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  // Fetch all public user profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, created_at')

  const profileRoutes: MetadataRoute.Sitemap = (profiles || []).map((profile) => ({
    url: `${baseUrl}/user/${profile.id}`,
    lastModified: new Date(profile.created_at || new Date()),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...listingRoutes, ...profileRoutes]
}
