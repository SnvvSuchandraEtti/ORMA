'use client'

import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export default function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white text-sm font-medium shadow-md animate-[slideDown_0.3s_ease-out]"
      role="alert"
    >
      <WifiOff size={16} />
      <span>You&apos;re offline. Some features may not work.</span>
    </div>
  )
}
