import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Listings',
  description: 'Manage your active rentals and listed items on ORMA.',
}

export default function MyListingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
