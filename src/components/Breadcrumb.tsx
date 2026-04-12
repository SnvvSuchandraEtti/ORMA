'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-[#717171] dark:text-[#A0A0A0]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#222222] dark:hover:text-white hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-[#A0A0A0]' : ''}>{item.label}</span>
              )}
              {!isLast && <span className="text-[#B0B0B0]">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
