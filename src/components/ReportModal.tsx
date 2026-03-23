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

  if (!isOpen) return null

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
      }
      onClose()
      setSelectedReason('')
      setDetails('')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-[#E31C5F]" />
              <h2 id="report-modal-title" className="text-lg font-semibold text-[#222222] dark:text-white">Report Listing</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-[#2D2D2D] rounded-full transition-colors"
            >
              <X size={20} className="text-[#222222] dark:text-white" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto overflow-x-hidden">
            <h3 className="font-semibold text-[#222222] dark:text-white mb-4">Why are you reporting this listing?</h3>
            <form id="report-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedReason === reason
                        ? 'border-[#222222] dark:border-[#6B6B6B] bg-gray-50 dark:bg-[#1A1A1A]'
                        : 'border-[#DDDDDD] dark:border-[#3D3D3D] hover:border-[#222222] dark:border-[#6B6B6B]'
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
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedReason === reason ? 'border-[#222222] dark:border-[#6B6B6B]' : 'border-gray-300 dark:border-[#3D3D3D]'
                      }`}>
                        {selectedReason === reason && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                        )}
                      </div>
                    </div>
                    <span className="text-[#222222] dark:text-white text-sm font-medium">{reason}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-[#EBEBEB] dark:border-[#3D3D3D] mt-6">
                <label className="block text-sm font-semibold text-[#222222] dark:text-white mb-2">
                  Additional details (optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any additional context to help our investigation..."
                  className="w-full h-24 p-3 rounded-xl border border-[#DDDDDD] dark:border-[#3D3D3D] focus:border-[#222222] dark:border-[#6B6B6B] focus:outline-none resize-none text-[#222222] dark:text-white text-sm"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-[#EBEBEB] dark:border-[#3D3D3D] bg-white dark:bg-[#1E1E1E] mt-auto">
            <button
              type="submit"
              form="report-form"
              disabled={isSubmitting || !selectedReason}
              className="w-full py-3.5 bg-[#222222] text-white font-semibold rounded-xl hover:bg-[#000000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
