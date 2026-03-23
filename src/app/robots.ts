import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/edit-listing/', '/my-listings', '/profile', '/wishlist'],
    },
    sitemap: 'https://orma.app/sitemap.xml',
  }
}
