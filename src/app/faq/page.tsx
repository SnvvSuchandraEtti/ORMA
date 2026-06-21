'use client'

import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  q: string
  a: string
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

const faqs: FAQCategory[] = [
  {
    title: 'GENERAL',
    items: [
      {
        q: 'What is ORMA?',
        a: 'ORMA (One-place Rental Marketplace Application) is a free platform where anyone can list items for rent or find items to rent. Think of it as Airbnb, but for everything — cars, bikes, cameras, laptops, furniture, and more.'
      },
      {
        q: 'Is ORMA free to use?',
        a: "Yes! ORMA is completely free. We don't charge any commission or listing fees. All payments happen directly between the renter and the owner."
      },
      {
        q: 'How does payment work?',
        a: "ORMA does not handle any payments. When you find an item you want to rent, you contact the owner directly via phone or WhatsApp. You and the owner agree on the price and payment method privately."
      }
    ]
  },
  {
    title: 'FOR RENTERS',
    items: [
      {
        q: 'How do I rent an item?',
        a: "Browse our listings, find what you need, click 'Contact Owner,' and reach out via phone or WhatsApp. The owner will share the details for pickup and payment."
      },
      {
        q: 'Is it safe to rent from strangers?',
        a: "We recommend always meeting in public places, verifying the owner's ID, checking the item's condition before paying, and taking photos for reference. Check owner reviews and ratings before renting."
      },
      {
        q: 'What if the item is damaged or not as described?',
        a: "Since ORMA is a listing platform, disputes are resolved directly between the renter and owner. We recommend agreeing on terms (including damage policy) before the rental begins."
      }
    ]
  },
  {
    title: 'FOR OWNERS',
    items: [
      {
        q: 'How do I list an item for rent?',
        a: "Sign up for free, click 'List Your Item,' follow the simple 7-step process to add photos, set pricing, and publish. Your listing goes live immediately!"
      },
      {
        q: 'Can I list multiple items?',
        a: "Yes! There's no limit to the number of items you can list."
      },
      {
        q: 'How do I get paid?',
        a: "You collect payment directly from the renter — via cash, UPI, bank transfer, or any method you prefer. ORMA doesn't take any commission."
      },
      {
        q: 'Can I choose who rents my item?',
        a: "Absolutely. You're in full control. When someone contacts you, you decide whether to rent to them or not."
      }
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      {
        q: 'Do I need an account to browse?',
        a: "No! Anyone can browse listings without signing up. You only need an account to list items, save to wishlist, or contact owners."
      },
      {
        q: 'How do I delete my account?',
        a: "Contact us at support@orma.in and we'll help you delete your account and all associated data."
      }
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0')

  const toggleFAQ = (indexId: string) => {
    setOpenIndex(openIndex === indexId ? null : indexId)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-[#717171] leading-relaxed">
            Find answers to common questions about ORMA
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqs.map((category, catIndex) => (
            <div key={category.title}>
              <h2 className="text-xl font-bold text-[#222222] mb-6 tracking-wide text-sm border-b border-[#DDDDDD] pb-2">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const id = `${catIndex}-${itemIndex}`
                  const isOpen = openIndex === id

                  return (
                    <div 
                      key={item.q}
                      className={`border border-[#DDDDDD] rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'shadow-md border-transparent ring-1 ring-[#000000]/20' : 'hover:border-gray-400'}`}
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white"
                        aria-expanded={isOpen}
                      >
                        <span className="font-medium text-[#222222] pr-4">{item.q}</span>
                        <ChevronDown 
                          size={20} 
                          className={`text-[#717171] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#000000]' : ''}`} 
                        />
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="px-6 pb-6 text-[#717171] leading-relaxed border-t border-gray-50 pt-3">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* STILL HAVE QUESTIONS */}
        <div className="mt-20 text-center bg-[#F7F7F7] p-10 rounded-3xl border border-[#DDDDDD]">
          <h2 className="text-2xl font-semibold text-[#222222] mb-3">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="text-[#717171] mb-8">Our support team is here to help with any specific inquiries.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#222222] text-white font-semibold rounded-xl hover:bg-black transition-colors"
          >
            Contact us <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
