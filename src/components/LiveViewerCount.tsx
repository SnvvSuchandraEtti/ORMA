'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface LiveViewerCountProps {
  listingId: string
  inquiriesCount: number
}

const MIN_VIEWERS = 2
const MAX_VIEWERS = 15

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function LiveViewerCount({ listingId, inquiriesCount }: LiveViewerCountProps) {
  const storageKey = `orma_live_viewers_${listingId}`
  const [viewerCount, setViewerCount] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = window.sessionStorage.getItem(storageKey)
    const initial = saved ? Number(saved) : Math.floor(Math.random() * (MAX_VIEWERS - MIN_VIEWERS + 1)) + MIN_VIEWERS
    const safeInitial = clamp(Number.isNaN(initial) ? MIN_VIEWERS : initial, MIN_VIEWERS, MAX_VIEWERS)

    setViewerCount(safeInitial)
    window.sessionStorage.setItem(storageKey, String(safeInitial))

    const interval = window.setInterval(() => {
      setViewerCount((current) => {
        const delta = Math.random() < 0.5 ? -1 : 1
        const next = clamp(current + delta, MIN_VIEWERS, MAX_VIEWERS)
        window.sessionStorage.setItem(storageKey, String(next))
        return next
      })
    }, 30_000)

    return () => window.clearInterval(interval)
  }, [storageKey])

  const viewerText = useMemo(
    () => `${viewerCount} ${viewerCount === 1 ? 'person is' : 'people are'} viewing this right now`,
    [viewerCount]
  )

  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#222222] dark:text-white"
      >
        <motion.span
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#0071E3]"
        >
          <Eye size={16} />
        </motion.span>
        <span>{viewerText}</span>
      </motion.div>

      {inquiriesCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="inline-flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300"
        >
          <Zap size={15} />
          <span>
            This item was inquired about {inquiriesCount} {inquiriesCount === 1 ? 'time' : 'times'} in the last 24 hours
          </span>
        </motion.div>
      )}
    </div>
  )
}
