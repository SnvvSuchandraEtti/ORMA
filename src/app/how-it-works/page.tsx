import { Metadata } from 'next'
import Link from 'next/link'
import { Search, Calendar, Shield, CreditCard, Inbox, IndianRupee, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | ORMA',
  description: 'Learn how to rent items or earn money by listing your items on ORMA.',
}

export default function HowItWorksPage() {
  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white dark:from-[#1A1A1A] dark:to-[#121212] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1D1D1F] dark:text-white mb-8 tracking-tight">
            Designed for Trust.
          </h1>
          <p className="text-xl text-[#86868B] dark:text-[#A0A0A0] leading-relaxed max-w-2xl mx-auto">
            ORMA makes peer-to-peer renting as seamless as buying something new. 
            Here is how our ecosystem works for you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
        
        {/* FOR RENTERS SECTION */}
        <section>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 space-y-6">
              <span className="text-[#0071E3] font-bold text-sm uppercase tracking-widest">For Renters</span>
              <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-white leading-tight">Everything you need, <br/>just a tap away.</h2>
              
              <div className="space-y-8 pt-4">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                    <Search size={22} className="text-[#1D1D1F] dark:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1F] dark:text-white text-lg">1. Discover</p>
                    <p className="text-[#86868B] dark:text-[#A0A0A0]">Search thousands of items in your city. Filter by price, category, and real-time availability.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                    <Calendar size={22} className="text-[#1D1D1F] dark:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1F] dark:text-white text-lg">2. Book Instantly</p>
                    <p className="text-[#86868B] dark:text-[#A0A0A0]">Choose your dates and submit a request. Your dates are instantly blocked once the owner approves.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                    <IndianRupee size={22} className="text-[#1D1D1F] dark:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1F] dark:text-white text-lg">3. Secure Payment</p>
                    <p className="text-[#86868B] dark:text-[#A0A0A0]">Pay the rental fee and a refundable security deposit. All transactions are protected by ORMA.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
               <div className="aspect-square bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-[2.5rem] p-8 flex flex-col justify-end">
                  <p className="text-4xl font-bold mb-2">₹0</p>
                  <p className="text-sm text-[#86868B]">Listing fee for owners. Free to join.</p>
               </div>
               <div className="aspect-square bg-[#0071E3] rounded-[2.5rem] p-8 flex flex-col justify-end text-white">
                  <Shield size={40} className="mb-4" />
                  <p className="text-lg font-bold">Safe Deposit</p>
                  <p className="text-sm opacity-80">Money held securely until item return.</p>
               </div>
               <div className="col-span-2 aspect-[2/1] bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  <div className="relative h-full p-8 flex flex-col justify-center items-center text-center">
                    <p className="text-white text-2xl font-bold mb-2">24/7 Support</p>
                    <p className="text-white/60 text-sm max-w-xs">We&apos;re here to help with every step of your rental journey.</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* FOR OWNERS SECTION */}
        <section>
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="md:w-1/2 space-y-6">
              <span className="text-[#0071E3] font-bold text-sm uppercase tracking-widest">For Owners</span>
              <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-white leading-tight">Turn your idle gear <br/>into income.</h2>
              
              <div className="space-y-8 pt-4">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                    <Inbox size={22} className="text-[#1D1D1F] dark:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1F] dark:text-white text-lg">1. List for Free</p>
                    <p className="text-[#86868B] dark:text-[#A0A0A0]">Upload photos, set your daily price, and define your rules. It takes less than 2 minutes.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                    <CreditCard size={22} className="text-[#1D1D1F] dark:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1F] dark:text-white text-lg">2. Manage Requests</p>
                    <p className="text-[#86868B] dark:text-[#A0A0A0]">Review renter profiles and ratings. Approve or decline requests directly from your dashboard.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                    <Star size={22} className="text-[#1D1D1F] dark:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1F] dark:text-white text-lg">3. Get Paid</p>
                    <p className="text-[#86868B] dark:text-[#A0A0A0]">Payments are deposited directly into your bank account once the rental is completed.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
               <div className="rounded-[3rem] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-gray-100 dark:border-white/5 p-10 md:p-14">
                  <h3 className="text-3xl font-bold text-[#1D1D1F] dark:text-white mb-8">Trust is our foundation.</h3>
                  <div className="space-y-6">
                    {[
                      { title: 'Verified Identity', desc: 'We verify every user&apos;s ID before they can book high-value items.' },
                      { title: 'Item Insurance', desc: 'Optional coverage to protect your gear against accidental damage.' },
                      { title: 'Community Ratings', desc: 'Transparent reviews for both renters and owners.' },
                      { title: 'Conflict Resolution', desc: 'Our team mediates in case of disputes or damage claims.' }
                    ].map(item => (
                      <div key={item.title} className="flex gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full bg-[#0071E3] flex-shrink-0 flex items-center justify-center">
                          <CheckCircle className="text-white" size={12} />
                        </div>
                        <div>
                          <p className="font-bold text-[#1D1D1F] dark:text-white text-sm">{item.title}</p>
                          <p className="text-xs text-[#86868B] dark:text-[#A0A0A0] mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="text-center py-20 bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-[3rem]">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] dark:text-white mb-8 tracking-tight">Ready to join the community?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/search" 
              className="px-10 py-4 bg-[#0071E3] text-white font-bold rounded-2xl hover:bg-[#0077ED] transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/20"
            >
              Start Renting
            </Link>
            <Link 
              href="/list-your-item" 
              className="px-10 py-4 bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 transition-all"
            >
              List an Item
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}

function CheckCircle({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
