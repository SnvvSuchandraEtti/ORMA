import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Rentals',
  description: 'Search for cameras, laptops, bikes, and more on ORMA.',
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
