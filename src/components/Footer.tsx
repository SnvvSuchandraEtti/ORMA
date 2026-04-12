'use client'

import Link from 'next/link'
import { Globe, Instagram, Linkedin, Youtube } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useAuth } from '@/hooks/useAuth'

const INSPIRE_CATEGORIES = [
  { label: 'Cars', slug: 'cars' },
  { label: 'Bikes', slug: 'bikes' },
  { label: 'Cameras', slug: 'cameras' },
  { label: 'Laptops', slug: 'laptops' },
  { label: 'Furniture', slug: 'furniture' },
  { label: 'Gaming', slug: 'gaming' },
] as const

const linkClass =
  'text-[14px] text-[#424245] dark:text-[#98989D] hover:text-[#0071E3] dark:hover:text-[#0071E3] transition-all duration-300'

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  const { isAuthenticated } = useAuth()
  const verificationHref = isAuthenticated ? '/verification' : '/about'

  return (
    <footer className="bg-[#F5F5F7] dark:bg-[#1C1C1E] border-t border-[#D2D2D7] dark:border-[#38383A] mt-auto transition-colors duration-500">
      {/* Top: Get inspired */}
      <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 pt-12 pb-10 border-b border-[#D2D2D7] dark:border-[#38383A]">
        <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white mb-5 tracking-tight">
          Get inspired for your next rental
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 hide-scrollbar scroll-smooth">
          {INSPIRE_CATEGORIES.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/search?category=${slug}`}
              className="flex-shrink-0 rounded-2xl border border-[#D2D2D7] dark:border-[#38383A] bg-white dark:bg-[#2C2C2E] px-6 py-4 min-w-[120px] text-center font-semibold text-sm text-[#1D1D1F] dark:text-white hover:border-[#0071E3]/40 hover:shadow-sm transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <nav aria-label="ORMA">
            <h3 className="text-[12px] font-semibold text-[#86868B] mb-4 uppercase tracking-wider">
              ORMA
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className={linkClass}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about#team" className={linkClass}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  Press
                </Link>
              </li>
              <li>
                <Link href="/about#blog" className={linkClass}>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Discover">
            <h3 className="text-[12px] font-semibold text-[#86868B] mb-4 uppercase tracking-wider">
              Discover
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className={linkClass}>
                  Rent Items
                </Link>
              </li>
              <li>
                <Link href="/list-your-item" className={linkClass}>
                  List Your Items
                </Link>
              </li>
              <li>
                <Link href="/search" className={linkClass}>
                  Popular Categories
                </Link>
              </li>
              <li>
                <Link href="/search" className={linkClass}>
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/search?sort=popular" className={linkClass}>
                  Trending
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Renting">
            <h3 className="text-[12px] font-semibold text-[#86868B] mb-4 uppercase tracking-wider">
              Renting
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className={linkClass}>
                  Trust &amp; Safety
                </Link>
              </li>
              <li>
                <Link href={verificationHref} className={linkClass}>
                  Verification
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  Rental Tips
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  Insurance
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="text-[12px] font-semibold text-[#86868B] mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className={linkClass}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Report a Problem
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Give Feedback
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  Accessibility
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#D2D2D7] dark:border-[#38383A] pt-10 space-y-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2 text-[12px] text-[#86868B]">
            <span className="text-[#6E6E73] dark:text-[#98989D] font-medium">© 2025 ORMA, Inc.</span>
            <span className="opacity-40">·</span>
            <Link href="/privacy" className="hover:text-[#0071E3] transition-colors">
              Privacy
            </Link>
            <span className="opacity-40">·</span>
            <Link href="/terms" className="hover:text-[#0071E3] transition-colors">
              Terms
            </Link>
            <span className="opacity-40">·</span>
            <a href="/sitemap.xml" className="hover:text-[#0071E3] transition-colors">
              Sitemap
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[13px] font-medium text-[#1D1D1F] dark:text-white">
            <span className="inline-flex items-center gap-2" aria-hidden>
              <Globe size={18} className="text-[#86868B]" />
              English (IN)
            </span>
            <span className="text-[#86868B] font-medium">₹ INR</span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-[13px] font-medium text-[#1D1D1F] dark:text-white">Follow us:</span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#D2D2D7] dark:border-[#38383A] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:border-[#1D1D1F] dark:hover:border-white transition-colors"
                aria-label="ORMA on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#D2D2D7] dark:border-[#38383A] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:border-[#1D1D1F] dark:hover:border-white transition-colors"
                aria-label="ORMA on X"
              >
                <TwitterIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#D2D2D7] dark:border-[#38383A] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:border-[#1D1D1F] dark:hover:border-white transition-colors"
                aria-label="ORMA on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#D2D2D7] dark:border-[#38383A] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:border-[#1D1D1F] dark:hover:border-white transition-colors"
                aria-label="ORMA on YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
