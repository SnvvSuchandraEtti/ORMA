import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MessageSquare, Heart, ArrowRight } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#FF385C]" />,
      title: 'Find',
      desc: 'Search for anything you need from locals nearby.'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#E31C5F]" />,
      title: 'Connect',
      desc: 'Contact the owner directly to agree on dates.'
    },
    {
      icon: <Heart className="w-8 h-8 text-[#FF385C]" />,
      title: 'Rent',
      desc: 'Pick up the item safely and enjoy your rental!'
    }
  ]

  return (
    <section className="relative py-24 my-20 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#FF385C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#E31C5F]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#222222] dark:text-white mb-4 tracking-tight">How ORMA works</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">Experience the future of local rentals with a seamless, secure, and community-driven platform.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center p-8 rounded-3xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-black/[0.03] dark:border-white/[0.05] hover:border-black/[0.08] dark:hover:border-white/[0.1] transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black/40 shadow-xl shadow-black/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#222222] dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Learn more about renting
            <ArrowRight size={18} className="text-[#FF385C]" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
