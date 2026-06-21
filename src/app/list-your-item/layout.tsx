import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Item',
  description: 'Turn your unused gear into extra income by listing it for rent on ORMA.',
}

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
