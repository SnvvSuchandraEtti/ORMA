import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Listing',
  description: 'Update the details of your rental listing on ORMA.',
}

export default function EditListingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
