'use client'

import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import toast, { Toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface CustomToastProps {
  t: Toast
  title: string
  message?: string
  type: ToastType
}

export default function CustomToast({ t, title, message, type }: CustomToastProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const icons = {
    success: <CheckCircle2 className="text-[#008A05] flex-shrink-0" size={24} />,
    error: <XCircle className="text-[#C13515] flex-shrink-0" size={24} />,
    info: <Info className="text-[#222222] flex-shrink-0" size={24} />,
  }

  // Airbnb style slide in from top-right on desktop, bottom-center on mobile
  const animations = isMobile 
    ? { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 20 } }
    : { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, scale: 0.9, x: 20 } }

  return (
    <motion.div
      layout
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-white shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border border-[#EBEBEB]`}
      role="status"
      aria-live="polite"
      style={{
        transform: `translate3d(0, ${t.visible ? 0 : isMobile ? 20 : -20}px, 0)`
      }}
    >
      <div className="flex w-full p-4 relative">
        <div className="flex items-start flex-1 gap-3">
          {icons[type]}
          <div className="flex-1 pt-0.5 min-w-0">
            <p className="text-sm font-semibold text-[#222222] truncate">
              {title}
            </p>
            {message && (
              <p className="mt-1 text-sm text-[#717171] leading-relaxed break-words">
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-full inline-flex text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1.5 transition-colors"
          >
            <span className="sr-only">Close</span>
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
