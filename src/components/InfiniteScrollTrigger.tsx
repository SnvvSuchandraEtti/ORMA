'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void
  hasMore: boolean
  isLoadingMore: boolean
}

export default function InfiniteScrollTrigger({
  onLoadMore,
  hasMore,
  isLoadingMore
}: InfiniteScrollTriggerProps) {
  const { ref, inView } = useInView({
    rootMargin: '200px',
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      onLoadMore()
    }
  }, [inView, hasMore, isLoadingMore, onLoadMore])

  if (!hasMore) {
    return (
      <div className="py-12 flex justify-center w-full">
        <p className="text-[#717171] text-sm font-medium">You've seen all items!</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="py-10 flex justify-center w-full">
      {isLoadingMore && (
        <div className="w-8 h-8 rounded-full border-2 border-[#EBEBEB] border-t-[#222222] animate-spin" />
      )}
    </div>
  )
}
