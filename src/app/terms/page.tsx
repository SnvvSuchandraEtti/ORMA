import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions | ORMA',
  description: 'Terms and Conditions for using the ORMA rental marketplace platform.',
}

export default function TermsPage() {
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'description', title: '2. Description of Service' },
    { id: 'accounts', title: '3. User Accounts' },
    { id: 'listing', title: '4. Listing Items' },
    { id: 'renting', title: '5. Renting Items' },
    { id: 'conduct', title: '6. User Conduct' },
    { id: 'disclaimer', title: '7. Disclaimer of Warranties' },
    { id: 'liability', title: '8. Limitation of Liability' },
    { id: 'ip', title: '9. Intellectual Property' },
    { id: 'termination', title: '10. Termination' },
    { id: 'changes', title: '11. Changes to Terms' },
    { id: 'contact', title: '12. Contact Us' },
  ]

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#222222] mb-4 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-lg text-[#717171]">
            Last updated: June 2025
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-12 relative">
        
        {/* TABLE OF CONTENTS - DESKTOP STICKY */}
        <aside className="md:w-1/3 hidden md:block">
          <div className="sticky top-28 bg-[#F7F7F7] p-6 rounded-2xl border border-[#DDDDDD]">
            <h3 className="font-semibold text-[#222222] mb-4 uppercase text-xs tracking-wider">Table of Contents</h3>
            <ul className="space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`} 
                    className="text-sm text-[#717171] hover:text-[#000000] transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MOBILE TABLE OF CONTENTS */}
        <div className="md:hidden bg-[#F7F7F7] p-5 rounded-xl border border-[#DDDDDD] mb-8">
          <h3 className="font-semibold text-[#222222] mb-3">Table of Contents</h3>
          <ul className="space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-[#717171] hover:text-[#000000]">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENT */}
        <div className="md:w-2/3 prose prose-gray max-w-none text-[#484848]">
          <p className="lead text-lg mb-8">
            Welcome to ORMA (One-place Rental Marketplace Application). These Terms and Conditions govern your use of our website and services. By accessing or using ORMA, you agree to be bound by these Terms.
          </p>

          <div id="acceptance" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using the ORMA platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use our services.
            </p>
          </div>

          <div id="description" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">2. Description of Service</h2>
            <p>
              ORMA is an online listing and discovery platform that connects individuals who wish to rent out their personal items ("Owners") with individuals seeking to rent such items ("Renters"). 
            </p>
            <p className="font-semibold bg-gray-50 text-gray-800 p-4 rounded-lg mt-4 border border-gray-200">
              IMPORTANT: ORMA is strictly a listing and messaging facilitator. We do not participate in, mediate, or guarantee any transactions, rentals, agreements, or physical exchanges between Users. All rental agreements are made directly between the Owner and the Renter.
            </p>
          </div>

          <div id="accounts" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">3. User Accounts</h2>
            <p>
              To list items or contact owners, you must register for an account. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years old to create an account on ORMA.
            </p>
          </div>

          <div id="listing" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">4. Listing Items</h2>
            <p>As an Owner listing an item on ORMA, you represent and warrant that:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>You are the legal owner of the item or have the legal right to rent it out.</li>
              <li>The item is accurately described, safe to use, and functions precisely as stated in the listing.</li>
              <li>You will not list illegal, hazardous, stolen, or strictly prohibited items (including weapons, adult content, or controlled substances).</li>
            </ul>
          </div>

          <div id="renting" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">5. Renting Items</h2>
            <p>As a Renter, when you contact an Owner and agree to rent an item, you agree to:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Use the item carefully and exclusively for its intended purpose.</li>
              <li>Return the item in the exact same condition it was received, subject strictly to normal wear and tear.</li>
              <li>Compensate the Owner directly for any damage, loss, or theft that occurs during your rental period in accordance with your mutual agreement.</li>
            </ul>
          </div>

          <div id="conduct" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">6. User Conduct</h2>
            <p>
              Users agree not to use ORMA to harass, abuse, or engage in any unlawful activities. You will not scrape our data, attempt to bypass our security features, or spam other users. We reserve the right to suspend or terminate accounts that violate these guidelines without notice.
            </p>
          </div>

          <div id="disclaimer" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">7. Disclaimer of Warranties</h2>
            <p>
              ORMA AND ITS SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. ORMA MAKES NO WARRANTY REGARDING THE QUALITY, SAFETY, LEGALITY, OR ACCURACY OF ANY LISTINGS OR THE ABILITY OF OWNERS TO RENT ITEMS OR RENTERS TO PAY FOR THEM.
            </p>
          </div>

          <div id="liability" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ORMA, ITS FOUNDERS, AND EMPLOYEES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR USE RESULTING FROM ANY INTERACTIONS BETWEEN USERS, PROPERTY DAMAGE, PERSONAL INJURY, OR THE UNAVAILABILITY OF THE SERVICE.
            </p>
          </div>

          <div id="ip" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">9. Intellectual Property</h2>
            <p>
              All content on the platform—including logos, source code, text, graphics, and UI design—is the property of ORMA. By uploading content (such as item photos and descriptions), you grant ORMA a worldwide, non-exclusive, royalty-free license to use, reproduce, and display that content in connection with providing our services.
            </p>
          </div>

          <div id="termination" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">10. Termination</h2>
            <p>
              We may terminate or suspend your access to ORMA at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </div>

          <div id="changes" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of ORMA following the posting of revised Terms means you accept and agree to the changes.
            </p>
          </div>

          <div id="contact" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-4">
              <Link href="/contact" className="text-[#000000] hover:underline font-medium">support@orma.in</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
