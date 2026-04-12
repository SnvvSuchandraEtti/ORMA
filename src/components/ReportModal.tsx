'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from '@/lib/toast'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  listingId: string
  reporterId: string
}

const REPORT_REASONS = [
  'Fake or misleading listing',
  'Inappropriate content',
  'Scam or fraud',
  'Item is not available',
  'Wrong pricing information',
  'Duplicate listing',
  'Other'
]

export default function ReportModal({ isOpen, onClose, listingId, reporterId }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    if (!selectedReason) {
      toast.error('Please select a reason for reporting')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('reports')
        .insert({
          listing_id: listingId,
          reporter_id: reporterId,
          reason: selectedReason,
          details: details.trim()
        })

      if (error) {
        if (error.code === '23505') {
          // unique violation -> already reported
          toast.info('You have already reported this listing. Our team is reviewing it.')
        } else {
          throw error
        }
      } else {
        toast.success("Report submitted. We'll review it shortly.")
        onClose()
        setSelectedReason('')
        setDetails('')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
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
          aria-labelledby="report-modal-title"
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
            className="relative bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50 dark:border-white/10">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-[#0055B3]" />
                <h2 id="report-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">Report Listing</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Why are you reporting this?</h3>
              <form id="report-form" onSubmit={handleSubmit} className="space-y-3">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedReason === reason
                        ? 'border-[#222222] dark:border-white bg-[#222222]/5 dark:bg-white/10 shadow-sm'
                        : 'border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50/50 dark:hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="report_reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="sr-only"
                    />
                    <div className="pt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedReason === reason ? 'border-[#222222] dark:border-white' : 'border-gray-300 dark:border-white/20'
                      }`}>
                        {selectedReason === reason && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-[#222222] dark:bg-white" 
                          />
                        )}
                      </div>
                    </div>
                    <span className="text-gray-800 dark:text-white text-sm font-medium">{reason}</span>
                  </label>
                ))}

                <div className="pt-4 mt-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 ml-1">
                    Additional details (optional)
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide any additional context to help our investigation..."
                    className="w-full h-28 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[#222222] dark:focus:ring-white transition-all resize-none text-gray-900 dark:text-white text-sm placeholder-gray-400"
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200/50 dark:border-white/10 bg-gray-50/50 dark:bg-black/40 backdrop-blur-xl mt-auto">
              <button
                type="submit"
                form="report-form"
                disabled={isSubmitting || !selectedReason}
                className="w-full py-4 bg-[#222222] dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-black/5 dark:shadow-white/5"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : 'Submit Report'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
