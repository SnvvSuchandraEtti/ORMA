'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import toast from '@/lib/toast'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { sanitizeInput } from '@/lib/sanitize'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  listingId: string
  ownerId: string
  onReviewSubmitted: () => void
}

export default function ReviewModal({ isOpen, onClose, listingId, ownerId, onReviewSubmitted }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const supabase = createClient()
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }
    if (comment.length < 10) {
      toast.error('Review must be at least 10 characters')
      return
    }
    if (!user) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('reviews').insert({
        listing_id: listingId,
        reviewer_id: user.id,
        owner_id: ownerId,
        rating,
        title: sanitizeInput(title.trim()),
        comment: sanitizeInput(comment.trim()),
      })
      if (error) throw error
      toast.success('Review submitted! Thank you.')
      onReviewSubmitted()
      onClose()
      // Reset form
      setRating(0)
      setTitle('')
      setComment('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit review'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={modalRef} 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="review-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50 dark:border-white/10">
              <h2 id="review-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">Write a Review</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Star Rating */}
              <div className="flex flex-col items-center py-2 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-200/50 dark:border-white/5">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Overall Rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform active:scale-90"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        size={40}
                        className={`transition-all duration-200 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-[#222222] dark:fill-white stroke-[#222222] dark:stroke-white drop-shadow-sm'
                            : 'stroke-gray-300 dark:stroke-white/20 fill-none'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="h-6 mt-3">
                  <AnimatePresence mode="wait">
                    {(hoveredRating || rating) > 0 && (
                      <motion.p
                        key={hoveredRating || rating}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm font-bold text-[#222222] dark:text-white"
                      >
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][hoveredRating || rating]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="review-title" className="block text-sm font-bold text-gray-900 dark:text-white ml-1">
                  Title <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="review-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Summarize your experience"
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[#222222] dark:focus:ring-white transition-all text-gray-900 dark:text-white"
                />
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label htmlFor="review-comment" className="block text-sm font-bold text-gray-900 dark:text-white ml-1">
                  Your Review *
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Tell others about your experience renting this item..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[#222222] dark:focus:ring-white transition-all text-gray-900 dark:text-white resize-none"
                />
                <div className="flex justify-end">
                  <span className={`text-xs font-medium ${comment.length < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                    {comment.length}/500
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || rating === 0 || comment.length < 10}
                className="w-full py-4 bg-[#222222] dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-black/5 dark:shadow-white/5 mt-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : 'Submit Review'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
