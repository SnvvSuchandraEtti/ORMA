import { motion } from 'framer-motion'
import { PackageOpen } from 'lucide-react'

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        <div className="text-[#0071E3] mb-4">
          {/* Using the ORMA logo icon concept */}
          <PackageOpen size={64} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0071E3] to-[#0055B3] mb-2 tracking-tight">
          ORMA
        </h1>
        <p className="text-[#717171] text-sm animate-pulse">Loading...</p>
      </motion.div>
    </div>
  )
}
