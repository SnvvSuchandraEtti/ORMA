'use client'

import { Suspense } from 'react'
import { useListingFormStore } from '@/store/listingFormStore'
import type { CreateListingFormData } from '@/types'
import ProtectedRoute from '@/components/ProtectedRoute'
import StepCategory from '@/components/listing-steps/StepCategory'
import StepPhotos from '@/components/listing-steps/StepPhotos'
import StepDetails from '@/components/listing-steps/StepDetails'
import StepPricing from '@/components/listing-steps/StepPricing'
import StepLocation from '@/components/listing-steps/StepLocation'
import StepContact from '@/components/listing-steps/StepContact'
import StepReview from '@/components/listing-steps/StepReview'

const STEPS = [
  { number: 1, title: 'Category', component: StepCategory },
  { number: 2, title: 'Photos', component: StepPhotos },
  { number: 3, title: 'Details', component: StepDetails },
  { number: 4, title: 'Pricing', component: StepPricing },
  { number: 5, title: 'Location', component: StepLocation },
  { number: 6, title: 'Contact', component: StepContact },
  { number: 7, title: 'Review', component: StepReview },
]

function canProceed(step: number, formData: CreateListingFormData): boolean {
  switch (step) {
    case 1: return !!formData.category_id
    case 2: return formData.imageUrls.length > 0
    case 3: return !!formData.title.trim() && !!formData.description.trim()
    case 4: return !!formData.price_per_day
    case 5: return !!formData.city.trim() && !!formData.state
    case 6: return !!(formData.contact_phone || formData.contact_whatsapp || formData.contact_email)
    default: return true
  }
}

function ListYourItemContent() {
  const { currentStep, nextStep, prevStep, formData } = useListingFormStore()
  const progress = (currentStep / STEPS.length) * 100
  const CurrentStepComponent = STEPS[currentStep - 1].component
  const isLastStep = currentStep === STEPS.length
  const canGoNext = canProceed(currentStep, formData)

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Progress Bar */}
      <div className="fixed top-[64px] md:top-[80px] left-0 right-0 z-30 bg-white dark:bg-[#121212] border-b border-[#EBEBEB] dark:border-[#3D3D3D]">
        <div className="h-1 bg-[#EBEBEB] dark:bg-[#3D3D3D]">
          <div
            className="h-full bg-[#000000] dark:bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-[#717171] dark:text-[#A0A0A0]">
            Step {currentStep} of {STEPS.length} · <span className="font-medium text-[#222222] dark:text-white dark:text-[#121212]">{STEPS[currentStep - 1].title}</span>
          </span>
          {/* Step dots */}
          <div className="flex gap-1.5">
            {STEPS.map(s => (
              <div
                key={s.number}
                className={`w-2 h-2 rounded-full transition-all ${
                  s.number < currentStep ? 'bg-[#222222] dark:bg-white'
                    : s.number === currentStep ? 'bg-[#000000] dark:bg-white scale-125'
                    : 'bg-[#DDDDDD] dark:bg-[#3D3D3D]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 pt-[52px] pb-36 md:pb-10">
        <div className="py-8">
          <CurrentStepComponent />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#121212] border-t border-[#DDDDDD] dark:border-[#3D3D3D] px-4 py-4 z-30">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-[#DDDDDD] dark:border-[#3D3D3D] text-[#222222] dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:bg-[#1A1A1A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {!isLastStep && (
            <button
              onClick={nextStep}
              disabled={!canGoNext}
              className="flex-1 sm:flex-none sm:px-8 py-3 bg-[#000000] dark:bg-white text-white font-semibold rounded-xl hover:bg-[#333333] dark:hover:bg-[#EBEBEB] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ListYourItemPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={null}>
        <ListYourItemContent />
      </Suspense>
    </ProtectedRoute>
  )
}
