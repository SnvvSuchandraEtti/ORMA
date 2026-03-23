import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ClientLayout from '@/components/ClientLayout'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://orma.app'),
  title: {
    template: '%s | ORMA',
    default: 'ORMA - Rent anything from anyone anywhere',
  },
  description: 'The premier peer-to-peer rental marketplace for electronics, cameras, vehicles, and more.',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  keywords: 'rental, rent, marketplace, cars, bikes, cameras, laptops, furniture, ORMA',
  openGraph: {
    title: {
      template: '%s | ORMA',
      default: 'ORMA — Rent Anything, From Anyone, Anywhere',
    },
    description: 'Find and list anything for rent on ORMA — the one-place rental marketplace.',
    type: 'website',
  },
}

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('orma-theme');
      if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'))}` }} />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white dark:bg-[#121212] transition-colors duration-300">
        <ThemeProvider>
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
      </ThemeProvider>
    </body>
    </html>
  )
}
