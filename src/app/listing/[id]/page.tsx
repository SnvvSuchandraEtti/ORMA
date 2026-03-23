import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ListingClient from './ListingClient'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const id = params.id
  
  const { data: listing } = await supabase
    .from('listings')
    .select('title, description, price_per_day, images')
    .eq('id', id)
    .single()

  if (!listing) {
    return { title: 'Listing Not Found — ORMA' }
  }

  const imageUrl = listing.images?.[0] || 'https://orma.app/og-image.jpg'
  const desc = listing.description.length > 160 ? listing.description.substring(0, 160) + '...' : listing.description

  return {
    title: `${listing.title} — Rent on ORMA`,
    description: desc,
    openGraph: {
      title: listing.title,
      description: `Rent ${listing.title} for ₹${listing.price_per_day}/day on ORMA`,
      images: [imageUrl],
      type: 'website',
      siteName: 'ORMA',
    },
    twitter: {
      card: 'summary_large_image',
      title: listing.title,
      description: `Rent for ₹${listing.price_per_day}/day`,
      images: [imageUrl],
    },
  }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select('title, description, price_per_day, images, average_rating, total_reviews')
    .eq('id', params.id)
    .single()

  let jsonLd = null
  if (listing) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: listing.title,
      description: listing.description,
      image: listing.images || [],
      offers: {
        '@type': 'Offer',
        price: listing.price_per_day,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      ...(listing.total_reviews > 0 && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: listing.average_rating,
          reviewCount: listing.total_reviews,
        }
      })
    }
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ListingClient />
    </>
  )
}
