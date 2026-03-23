import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HowItWorksSection() {
  const steps = [
    {
      icon: '🔍',
      title: 'Find',
      desc: 'Search for anything you need from locals nearby.'
    },
    {
      icon: '📞',
      title: 'Connect',
      desc: 'Contact the owner directly to agree on dates.'
    },
    {
      icon: '🤝',
      title: 'Rent',
      desc: 'Pick up the item safely and enjoy your rental!'
    }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="py-16 my-10 bg-[#F7F7F7] dark:bg-[#1A1A1A] border-y border-[#EBEBEB] dark:border-[#3D3D3D] transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#222222] dark:text-white mb-10">How ORMA works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#222222] dark:text-white mb-2">{step.title}</h3>
              <p className="text-[#717171] dark:text-[#A0A0A0] leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <Link 
          href="/how-it-works"
          className="inline-block px-6 py-3 border border-[#222222] dark:border-white rounded-lg font-semibold text-[#222222] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors"
        >
          Learn more about renting
        </Link>
      </div>
    </motion.section>
  )
}
