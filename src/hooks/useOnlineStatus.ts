'use client'

import { useState, useEffect, useCallback } from 'react'
import toast from '@/lib/toast'

/**
 * Returns whether the browser is currently online.
 * Shows a "You're back online!" toast on reconnection.
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  const handleOnline = useCallback(() => {
    setIsOnline(true)
    toast.success("You're back online!")
  }, [])

  const handleOffline = useCallback(() => {
    setIsOnline(false)
  }, [])

  useEffect(() => {
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [handleOnline, handleOffline])

  return isOnline
}
