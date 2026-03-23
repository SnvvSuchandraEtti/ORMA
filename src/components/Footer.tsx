import Link from 'next/link'
import { Globe } from 'lucide-react'

const footerLinks = {
  About: [
    { label: 'About ORMA', href: '/about' },
    { label: 'How ORMA works', href: '/how-it-works' },
    { label: 'Newsroom', href: '#' },
    { label: 'Investors', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Community: [
    { label: 'ORMA Blog', href: '#' },
    { label: 'Topics', href: '#' },
    { label: 'Accessibility', href: '#' },
    { label: 'Referrals', href: '#' },
    { label: 'Gift cards', href: '#' },
  ],
  Renting: [
    { label: 'List your item', href: '/list-your-item' },
    { label: 'Renter resources', href: '#' },
    { label: 'Community forum', href: '#' },
    { label: 'Responsible renting', href: '#' },
    { label: 'Trust & Safety', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Safety information', href: '#' },
    { label: 'Contact us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#F7F7F7] dark:bg-[#121212] border-t border-[#DDDDDD] dark:border-[#3D3D3D] mt-auto transition-colors duration-300">
      <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h3 className="font-semibold text-[14px] text-[#222222] dark:text-white mb-3">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#222222] dark:text-[#A0A0A0] hover:underline dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#DDDDDD] dark:border-[#3D3D3D] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#717171] dark:text-[#A0A0A0]">
            <span>© 2025 ORMA, Inc.</span>
            <span>·</span>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
          <button className="flex items-center gap-2 text-[13px] font-semibold text-[#222222] dark:text-white hover:underline transition-colors" aria-label="Select language: English (IN)">
            <Globe size={16} />
            English (IN)
          </button>
        </div>
      </div>
    </footer>
  )
}
