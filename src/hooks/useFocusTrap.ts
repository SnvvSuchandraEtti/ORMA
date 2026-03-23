'use client'

import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Traps keyboard focus inside the referenced container while `isActive` is true.
 * Restores focus to the previously focused element on deactivation.
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, isActive: boolean) {
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    // Save the element that was focused before the trap activated
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const container = containerRef.current
    if (!container) return

    // Focus the first focusable element inside the container
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusables.length > 0) {
      // Small delay to wait for modal animation
      requestAnimationFrame(() => focusables[0]?.focus())
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const currentFocusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (currentFocusables.length === 0) return

      const first = currentFocusables[0]
      const last = currentFocusables[currentFocusables.length - 1]

      if (e.shiftKey) {
        // Shift+Tab — wrap to last
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        // Tab — wrap to first
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus
      previouslyFocused.current?.focus()
    }
  }, [isActive, containerRef])
}
