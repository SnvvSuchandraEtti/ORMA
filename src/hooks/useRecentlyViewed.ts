'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'orma_recently_viewed'
const MAX_ITEMS = 10

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useState<string[]>([])

  // Only run in the browser
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setViewedIds(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load recently viewed items', e)
    }
  }, [])

  const addToRecentlyViewed = (listingId: string) => {
    setViewedIds((prevIds) => {
      // Remove the id if it already exists to move it to the front
      const filteredIds = prevIds.filter((id) => id !== listingId)
      // Add to front, cap at MAX_ITEMS
      const newIds = [listingId, ...filteredIds].slice(0, MAX_ITEMS)
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds))
      } catch (e) {
        console.error('Failed to save recently viewed item', e)
      }
      
      return newIds
    })
  }

  const getRecentlyViewed = () => viewedIds

  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setViewedIds([])
    } catch (e) {
      console.error('Failed to clear recently viewed items', e)
    }
  }

  return {
    viewedIds,
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed
  }
}
