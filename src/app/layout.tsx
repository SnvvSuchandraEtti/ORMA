import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/providers/AuthProvider'
import ClientLayout from '@/components/ClientLayout'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ORMA — Rent Anything, From Anyone, Anywhere',
  description:
    'ORMA is a one-place rental marketplace where you can find and list anything for rent — cars, bikes, cameras, laptops, furniture, and more.',
  keywords: 'rental, rent, marketplace, cars, bikes, cameras, laptops, furniture, ORMA',
  openGraph: {
    title: 'ORMA — Rent Anything, From Anyone, Anywhere',
    description: 'Find and list anything for rent on ORMA — the one-place rental marketplace.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'inherit',
                borderRadius: '8px',
                fontSize: '14px',
              },
              success: { style: { background: '#008A05', color: '#fff' } },
              error: { style: { background: '#C13515', color: '#fff' } },
            }}
          />
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
