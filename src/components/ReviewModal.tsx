'use client'

import { useState } from 'react'
import { X, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

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

  if (!isOpen) return null

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
        title,
        comment,
      })
      if (error) throw error
      toast.success('Review submitted! Thank you.')
      onReviewSubmitted()
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit review'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 modal-backdrop" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-[480px] sm:rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] z-10 overflow-hidden animate-[slideUp_0.3s_ease-out]">
        <div className="flex items-center justify-between border-b border-[#EBEBEB] px-6 py-4">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close">
            <X size={16} />
          </button>
          <span className="font-semibold text-[16px]">Write a Review</span>
          <div className="w-8" />
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-[#222222] mb-2">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-[#FFC107] stroke-[#FFC107]'
                        : 'stroke-[#DDDDDD] fill-none'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-[#717171] mt-1">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="review-title" className="block text-sm font-semibold text-[#222222] mb-1">
              Title (optional)
            </label>
            <input
              id="review-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
              className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="review-comment" className="block text-sm font-semibold text-[#222222] mb-1">
              Your Review *
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Tell others about your experience renting this item..."
              rows={4}
              minLength={10}
              maxLength={500}
              className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] resize-none"
            />
            <p className="text-xs text-[#B0B0B0] mt-1">{comment.length}/500</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full py-3 bg-[#FF385C] text-white font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  )
}
