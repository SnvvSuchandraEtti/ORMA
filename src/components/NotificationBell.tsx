'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { Notification } from '@/types'
import { useAuth } from '@/hooks/useAuth'

const iconMap: Record<string, string> = {
  inquiry: '🔵',
  review: '⭐',
  system: '⚪',
  milestone: '🔥',
  welcome: '🎉',
}

function formatRelativeTime(dateIso: string) {
  const diff = Date.now() - new Date(dateIso).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

export default function NotificationBell() {
  const supabase = createClient()
  const { user, isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const panelRef = useRef<HTMLDivElement | null>(null)

  const fetchNotifications = useCallback(async () => {
    if (!user) return
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(8)

    if (data) setNotifications(data as Notification[])
  }, [supabase, user])

  useEffect(() => {
    if (!isAuthenticated || !user) return
    fetchNotifications()
  }, [fetchNotifications, isAuthenticated, user])

  useEffect(() => {
    if (!open) return
    const onClickAway = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [open])

  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        () => fetchNotifications()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchNotifications, supabase, user])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.is_read).length, [notifications])

  const markAllRead = async () => {
    if (!user || unreadCount === 0) return
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false)
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
  }

  const markSingleRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
  }

  if (!isAuthenticated) return null

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-full p-2 text-[#222222] transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-[#2D2D2D]"
        aria-label="Notifications"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF385C] px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-[110%] z-50 w-[360px] rounded-2xl border border-black/10 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-[#1E1E1E]"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-[#222222] dark:text-white">Notifications</h3>
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs font-semibold text-[#717171] hover:text-[#222222] dark:text-[#A0A0A0] dark:hover:text-white"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-[#717171] dark:text-[#A0A0A0]">No notifications yet</p>
              ) : (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.link || '/dashboard'}
                    onClick={() => {
                      markSingleRead(notification.id)
                      setOpen(false)
                    }}
                    className="block rounded-xl px-2 py-2.5 hover:bg-[#F7F7F7] dark:hover:bg-[#2D2D2D]"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base">{iconMap[notification.type] || '⚪'}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#222222] dark:text-white">{notification.title}</p>
                        <p className="mt-0.5 text-xs text-[#717171] dark:text-[#A0A0A0]">{notification.message}</p>
                        <p className="mt-1 text-[11px] text-[#9A9A9A]">{formatRelativeTime(notification.created_at)}</p>
                      </div>
                      {!notification.is_read && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />}
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-2 border-t border-[#EBEBEB] pt-2 dark:border-[#3D3D3D]">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-2 py-1.5 text-sm font-medium text-[#222222] hover:underline dark:text-white"
              >
                See all notifications →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
