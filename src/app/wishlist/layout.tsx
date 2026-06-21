import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'View your saved items and favorite rentals on ORMA.',
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
