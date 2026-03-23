import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | ORMA',
  description: 'How ORMA collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  const sections = [
    { id: 'collection', title: '1. Information We Collect' },
    { id: 'usage', title: '2. How We Use Your Information' },
    { id: 'sharing', title: '3. Information Sharing' },
    { id: 'security', title: '4. Data Storage & Security' },
    { id: 'cookies', title: '5. Cookies & Tracking' },
    { id: 'rights', title: '6. Your Rights' },
    { id: 'third-party', title: '7. Third-Party Services' },
    { id: 'children', title: '8. Children\'s Privacy' },
    { id: 'changes', title: '9. Changes to This Policy' },
    { id: 'contact', title: '10. Contact Us' },
  ]

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F7F7F7] to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#222222] mb-4 tracking-tight">
            Privacy Policy
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
            At ORMA, we take your privacy seriously. This Privacy Policy outlines what data we collect, why we collect it, how we use it, and how we protect it when you use our rental marketplace platform.
          </p>

          <div id="collection" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">1. Information We Collect</h2>
            <p>We collect information to provide better services to all our users. Information we collect includes:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Personal details:</strong> Name, email address, phone number, and profile picture when you register.</li>
              <li><strong>Listing Data:</strong> Titles, descriptions, condition logs, pricing, and images of items you list.</li>
              <li><strong>Usage Data:</strong> Information about how you navigate our site, which listings you view, search queries, and timestamps.</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
            </ul>
          </div>

          <div id="usage" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">2. How We Use Your Information</h2>
            <p>We use the data we collect for the following purposes:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>To provide, maintain, and improve the ORMA platform.</li>
              <li>To facilitate communication between renters and owners.</li>
              <li>To personalize your experience and show you relevant search results.</li>
              <li>To notify you about changes to our service, account updates, and security alerts.</li>
              <li>To detect and prevent fraud, spam, abuse, and security incidents.</li>
            </ul>
          </div>

          <div id="sharing" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">3. Information Sharing</h2>
            <p>ORMA does not sell your personal data. We only share your information in the following circumstances:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>With other users:</strong> When you list an item, your public profile name, avatar, and listing details are visible to the public.</li>
              <li><strong>Service Providers:</strong> We use third-party tools (like Supabase for database and auth) who process data on our behalf under strict confidentiality agreements.</li>
              <li><strong>Legal Requirements:</strong> If required by law, subpoena, or to protect the rights and safety of ORMA and its users.</li>
            </ul>
          </div>

          <div id="security" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">4. Data Storage & Security</h2>
            <p>
              We implement industry-standard security measures (including SSL encryption and secure database architecture via Supabase) to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security. Data is hosted in secure server regions primarily located in India or corresponding secure zones.
            </p>
          </div>

          <div id="cookies" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">5. Cookies & Tracking</h2>
            <p>
              ORMA uses cookies, sessions, and similar tracking technologies to keep you logged in securely and analyze site traffic. You can instruct your browser to refuse all cookies; however, if you do not accept cookies, you may not be able to use certain features (such as logging in or maintaining a wishlist) of our Service.
            </p>
          </div>

          <div id="rights" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">6. Your Rights</h2>
            <p>Depending on your location, you have rights regarding your personal data:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Access:</strong> You can request a copy of your personal data.</li>
              <li><strong>Correction:</strong> You can edit your profile information directly in your account settings.</li>
              <li><strong>Deletion ("Right to be forgotten"):</strong> You can request that we delete your account and associated data by contacting support.</li>
            </ul>
          </div>

          <div id="third-party" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">7. Third-Party Services</h2>
            <p>
              When you choose to authenticate via Google or other social login providers, we receive certain profile information as permitted by those providers. Our website may contain links to external sites not operated by us. We have no control over and assume no responsibility for the content or privacy practices of third-party sites.
            </p>
          </div>

          <div id="children" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">8. Children's Privacy</h2>
            <p>
              Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If a parent or guardian becomes aware that their child has provided us with Personal Data, please contact us so we can take steps to remove that information and terminate the child's account.
            </p>
          </div>

          <div id="changes" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">9. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any material changes by sending an email or by placing a prominent notice on our website prior to the change becoming effective. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div id="contact" className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">10. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or our data practices, please reach out to our privacy team:
            </p>
            <p className="mt-4">
              <Link href="/contact" className="text-[#000000] hover:underline font-medium">privacy@orma.in</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
