import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ORMA',
  description: 'Learn about ORMA — the one-place rental marketplace connecting people with unused items to those who need them.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
