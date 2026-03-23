import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | ORMA',
  description: 'Learn about ORMA — the marketplace connecting people who have items sitting idle with people who need them temporarily.',
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6 tracking-tight">
            About ORMA
          </h1>
          <p className="text-xl text-[#717171] max-w-3xl mx-auto leading-relaxed">
            We&apos;re building the future of renting — making it easy for anyone 
            to rent anything, from anyone, anywhere.
          </p>
        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#222222] mb-6">Our Mission</h2>
          <p className="text-lg text-[#717171] leading-relaxed">
            ORMA was born from a simple idea: why buy when you can rent? We believe 
            that access is better than ownership. Our platform connects people who 
            have items sitting idle with people who need them temporarily. No commissions, 
            no hidden fees — just a simple, transparent marketplace where renters meet owners.
          </p>
        </div>
      </section>

      {/* HOW WE'RE DIFFERENT SECTION */}
      <section className="py-16 px-4 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#222222] text-center mb-12">How We&apos;re Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#DDDDDD] text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">Zero Commission</h3>
              <p className="text-[#717171] leading-relaxed">
                Unlike other platforms, we don&apos;t take a cut. All payments happen 
                directly between you and the owner.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#DDDDDD] text-center">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">Every City, Every Item</h3>
              <p className="text-[#717171] leading-relaxed">
                From metros to small towns, from cars to cameras — ORMA works everywhere 
                for everything.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#DDDDDD] text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">Trust & Transparency</h3>
              <p className="text-[#717171] leading-relaxed">
                Verified profiles, honest reviews, and direct communication build 
                real trust between renters and owners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#222222] text-center mb-6">Our Story</h2>
          <p className="text-lg text-[#717171] leading-relaxed text-center">
            Started in 2025, ORMA (One-place Rental Marketplace Application) was created 
            to solve a real problem — finding reliable rental services in Tier-2 and Tier-3 
            cities. Most rental platforms only serve big cities and charge heavy commissions. 
            We wanted to change that. ORMA is free for everyone, and we&apos;re growing every day.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 bg-[#000000] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="py-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg text-white/90">Items Listed</div>
            </div>
            <div className="py-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg text-white/90">Cities</div>
            </div>
            <div className="py-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-lg text-white/90">Happy Users</div>
            </div>
          </div>
          <div className="text-center mt-12 text-sm text-white/80">
            Built with ❤️ by the ORMA team
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#222222] mb-8">
          Ready to start renting?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="px-8 py-3 bg-[#000000] text-white font-semibold rounded-lg hover:bg-[#333333] transition-colors"
          >
            Browse Items
          </Link>
          <Link 
            href="/list-your-item" 
            className="px-8 py-3 bg-white text-[#222222] font-semibold border border-[#222222] rounded-lg hover:bg-gray-50 transition-colors"
          >
            List Your Item
          </Link>
        </div>
      </section>
    </div>
  )
}
