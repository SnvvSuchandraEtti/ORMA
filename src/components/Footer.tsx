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
    <footer className="bg-[#F8F9FA] dark:bg-[#0F0F0F] border-t border-black/5 dark:border-white/5 mt-auto transition-colors duration-500">
      <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 py-16">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {Object.entries(footerLinks).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h3 className="font-bold text-sm text-[#222222] dark:text-white mb-5 uppercase tracking-widest opacity-90">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#717171] dark:text-[#A0A0A0] hover:text-[#FF385C] dark:hover:text-[#FF385C] transition-all duration-300"
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
        <div className="border-t border-black/5 dark:border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[13px] font-medium text-[#717171] dark:text-[#A0A0A0]">
            <span className="text-[#222222] dark:text-white font-bold opacity-80">© 2025 ORMA, Inc.</span>
            <span className="hidden sm:inline opacity-20">|</span>
            <Link href="/privacy" className="hover:text-[#FF385C] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#FF385C] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#FF385C] transition-colors">Sitemap</Link>
          </div>
          <button className="group flex items-center gap-2.5 text-[13px] font-bold text-[#222222] dark:text-white hover:text-[#FF385C] transition-all" aria-label="Select language: English (IN)">
            <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            <span>English (IN)</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
