import Link from 'next/link'
import { Globe } from 'lucide-react'

const footerLinks = {
  About: [
    { label: 'How ORMA works', href: '#' },
    { label: 'Newsroom', href: '#' },
    { label: 'Investors', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'ORMA Luxe', href: '#' },
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
    { label: 'Contact us', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#DDDDDD] mt-auto">
      <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-[14px] text-[#222222] mb-3">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#222222] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#DDDDDD] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#717171]">
            <span>© 2025 ORMA, Inc.</span>
            <span>·</span>
            <Link href="#" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
          <button className="flex items-center gap-2 text-[13px] font-semibold text-[#222222] hover:underline">
            <Globe size={16} />
            English (IN)
          </button>
        </div>
      </div>
    </footer>
  )
}
