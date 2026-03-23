import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how easy it is to rent items or list your own on ORMA.',
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
