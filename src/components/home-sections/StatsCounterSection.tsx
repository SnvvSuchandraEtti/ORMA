'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StatItem {
  label: string
  value: number
  suffix: string
}

const STATS: StatItem[] = [
  { label: 'Items Listed', value: 500, suffix: '+' },
  { label: 'Cities', value: 50, suffix: '+' },
  { label: 'Happy Renters', value: 1200, suffix: '+' },
  { label: 'Rental Value', value: 15, suffix: 'L+' },
  { label: 'Avg Rating', value: 4.8, suffix: '★' },
  { label: 'Satisfaction', value: 98, suffix: '%' },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatsCounterSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 2000

    const tick = (now: number) => {
      const elapsed = now - start
      const raw = Math.min(elapsed / duration, 1)
      setProgress(easeOutCubic(raw))
      if (raw < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView])

  const computed = useMemo(() => {
    return STATS.map((stat) => {
      const value = stat.value * progress
      const display = stat.value % 1 === 0 ? Math.floor(value).toString() : value.toFixed(1)
      return { ...stat, display }
    })
  }, [progress])

  return (
    <section ref={ref} className="mt-16 rounded-3xl border border-[#EBEBEB] bg-[#F7F7F7] px-6 py-10 dark:border-[#3D3D3D] dark:bg-[#1A1A1A] md:px-10">
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-2xl font-semibold text-[#222222] dark:text-white"
      >
        Join thousands of renters across India
      </motion.h3>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3">
        {computed.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-[#FF385C] md:text-3xl">
              {stat.display}
              {stat.suffix}
            </p>
            <p className="mt-1 text-sm text-[#717171] dark:text-[#A0A0A0]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
