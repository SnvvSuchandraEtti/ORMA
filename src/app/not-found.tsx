import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      {/* Big 404 */}
      <h1 className="text-8xl md:text-9xl font-bold text-[#000000] leading-none mb-4">404</h1>
      <span className="text-5xl mb-6">🏚️</span>
      <h2 className="text-2xl md:text-3xl font-semibold text-[#222222] mb-3">
        Page not found
      </h2>
      <p className="text-[#717171] text-base max-w-sm mb-8">
        Looks like this page doesn&apos;t exist or was moved. Let&apos;s get you back to finding something awesome to rent!
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-[#000000] text-white font-semibold rounded-xl hover:bg-[#333333] transition-colors"
        >
          <Home size={18} />
          Go Home
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 px-6 py-3 border border-[#222222] text-[#222222] font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Search size={18} />
          Search Listings
        </Link>
      </div>
    </div>
  )
}
