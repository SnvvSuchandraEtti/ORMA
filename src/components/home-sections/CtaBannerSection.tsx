import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CtaBannerSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="max-w-[2520px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 mb-20"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF385C] to-[#FF5A7E] px-8 py-16 md:py-20 lg:p-24 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Aesthetic background patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Have items sitting idle? Start earning today!
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-md">
            List your items for free and connect with renters in your city. Turn your unused gear into extra income.
          </p>
          <Link 
            href="/list-your-item"
            className="inline-block bg-white text-[#FF385C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            List Your Item
          </Link>
        </div>

        {/* Abstract visual on the right */}
        <div className="hidden md:flex relative z-10 w-48 h-48 lg:w-64 lg:h-64 items-center justify-center">
          <div className="w-full h-full border-4 border-white/20 rounded-3xl animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-[80%] h-[80%] bg-white/20 rounded-full backdrop-blur-sm shadow-xl" />
          <div className="absolute text-white font-bold text-6xl shadow-sm">💰</div>
        </div>

      </div>
    </motion.section>
  )
}
