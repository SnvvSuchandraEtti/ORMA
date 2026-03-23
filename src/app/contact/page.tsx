'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Instagram, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast from '@/lib/toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    toast.success("Message sent! We'll get back to you within 24 hours.")
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-[#717171] leading-relaxed">
            We&apos;re here to help! Reach out to us for any questions or feedback.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* CONTACT FORM SECTION */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDDDDD] p-8">
              <h2 className="text-2xl font-semibold text-[#222222] mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#222222] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#222222] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-shadow"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#222222] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-shadow"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Report a Problem">Report a Problem</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#222222] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-shadow resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-[#000000] text-white font-semibold rounded-xl hover:bg-[#333333] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* CONTACT INFO SECTION */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#222222] mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#222222]">Email</h3>
                    <a href="mailto:support@orma.in" className="text-[#000000] hover:underline">support@orma.in</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#222222]">Phone</h3>
                    <a href="tel:+919876543210" className="text-[#717171] hover:text-[#222222]">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#222222]">Location</h3>
                    <p className="text-[#717171]">Hyderabad, Telangana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#222222]">Hours</h3>
                    <p className="text-[#717171]">Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div>
              <h2 className="text-xl font-semibold text-[#222222] mb-4">Follow Us</h2>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] hover:bg-[#EBEBEB] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] hover:bg-[#EBEBEB] transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] hover:bg-[#EBEBEB] transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#222222] hover:bg-[#EBEBEB] transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* FAQ LINK */}
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <h3 className="font-semibold text-[#222222] mb-2">Have a question?</h3>
              <p className="text-[#717171] text-sm mb-4">You might find the answer you need in our Knowledge Base.</p>
              <Link 
                href="/faq"
                className="inline-flex items-center gap-2 text-[#000000] font-medium hover:underline"
              >
                Check our FAQ page <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
