import { Metadata } from 'next'
import Link from 'next/link'
import { Search, FileText, Phone, Camera, Inbox, IndianRupee, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | ORMA',
  description: 'Learn how to rent items or earn money by listing your items on ORMA.',
}

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6 tracking-tight">
            How ORMA Works
          </h1>
          <p className="text-xl text-[#717171] leading-relaxed">
            Renting made simple — in just 3 steps
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* FOR RENTERS SECTION */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#222222] mb-4">Looking to rent something?</h2>
            <p className="text-[#717171]">Need gear for a weekend trip? We&apos;ve got you covered.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7F7F7] text-[#000000] rounded-full flex items-center justify-center mb-6">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">1. Browse & Search</h3>
              <p className="text-[#717171] leading-relaxed">
                Search for any item you need — cars, cameras, laptops, furniture, and more. 
                Filter by category, city, price, and availability.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7F7F7] text-[#000000] rounded-full flex items-center justify-center mb-6">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">2. View & Compare</h3>
              <p className="text-[#717171] leading-relaxed">
                Check item details, photos, pricing, and owner reviews. 
                Compare options to find the perfect match.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7F7F7] text-[#000000] rounded-full flex items-center justify-center mb-6">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">3. Contact & Rent</h3>
              <p className="text-[#717171] leading-relaxed">
                Contact the owner directly via phone or WhatsApp. Agree on terms, 
                pick up the item, and you&apos;re all set! No platform fees, no middleman.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-[#DDDDDD]" />

        {/* FOR OWNERS SECTION */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#222222] mb-4">Want to earn by renting your items?</h2>
            <p className="text-[#717171]">Turn your idle gear into a steady income stream.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7F7F7] text-[#222222] rounded-full flex items-center justify-center mb-6 border border-[#DDDDDD]">
                <Camera size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">1. Create a Free Listing</h3>
              <p className="text-[#717171] leading-relaxed">
                Sign up and list your item in minutes. Add photos, set your price, 
                and describe your terms.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7F7F7] text-[#222222] rounded-full flex items-center justify-center mb-6 border border-[#DDDDDD]">
                <Inbox size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">2. Get Inquiries</h3>
              <p className="text-[#717171] leading-relaxed">
                Interested renters will contact you directly via the platform, phone, or WhatsApp. 
                You choose who to rent to.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7F7F7] text-[#222222] rounded-full flex items-center justify-center mb-6 border border-[#DDDDDD]">
                <IndianRupee size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">3. Earn Money</h3>
              <p className="text-[#717171] leading-relaxed">
                Hand over the item, collect your rental fee, and earn from things 
                you already own!
              </p>
            </div>
          </div>
        </section>

        {/* TRUST & SAFETY SECTION */}
        <section className="bg-[#F7F7F7] rounded-3xl p-8 md:p-12 border border-[#DDDDDD]">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg text-[#000000]">
                <ShieldCheck size={64} />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold text-[#222222] mb-6">Your Safety Matters</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#000000]">•</span>
                  <p className="text-[#717171]">Always verify the person&apos;s ID before renting.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#000000]">•</span>
                  <p className="text-[#717171]">Meet in public places during daylight hours for pickups and returns.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#000000]">•</span>
                  <p className="text-[#717171]">Take detailed photos of the item&apos;s condition before handover.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#000000]">•</span>
                  <p className="text-[#717171]">Agree on terms in writing (even a WhatsApp chat works as proof).</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#000000]">•</span>
                  <p className="text-[#717171]">Report any suspicious behavior to our support team immediately.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="text-center pt-8">
          <h2 className="text-3xl font-semibold text-[#222222] mb-8">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="px-8 py-3 bg-[#000000] text-white font-semibold rounded-lg hover:bg-[#333333] transition-colors"
            >
              Find Items
            </Link>
            <Link 
              href="/list-your-item" 
              className="px-8 py-3 bg-white text-[#222222] font-semibold border border-[#222222] rounded-lg hover:bg-gray-50 transition-colors"
            >
              List an Item
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
