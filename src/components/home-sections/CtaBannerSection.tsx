import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CtaBannerSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="mb-32"
    >
      <div className="relative rounded-[3rem] overflow-hidden bg-[#222222] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] px-8 py-20 md:py-24 lg:p-28 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
        
        {/* Aesthetic background patterns */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#0071E3]/20 to-[#0055B3]/20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0071E3]/10 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white dark:text-white mb-6 leading-[1.1] tracking-tight">
            Have items sitting idle? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#0077ED]">Start earning</span> today!
          </h2>
          <p className="text-gray-400 dark:text-gray-400 text-lg md:text-xl mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
            List your items for free and connect with locals. Turn your unused gear into consistent extra income.
          </p>
          <Link 
            href="/list-your-item"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-extrabold text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            Start Renting
            <ArrowRight size={20} className="text-[#0071E3]" />
          </Link>
        </div>

        {/* Abstract visual on the right */}
        <div className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0071E3]/20 to-transparent rounded-full blur-2xl animate-pulse" />
          <div className="w-full h-full border border-white/10 rounded-[3rem] rotate-12 animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[85%] h-[85%] border border-white/20 rounded-[2.5rem] -rotate-12 animate-[spin_15s_linear_reverse_infinite]" />
          <div className="absolute w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
            <span className="text-5xl">💰</span>
          </div>
        </div>

      </div>
    </motion.section>
  )
}
