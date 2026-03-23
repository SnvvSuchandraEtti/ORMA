import { create } from 'zustand'
import type { CreateListingFormData } from '@/types'

interface ListingFormState {
  currentStep: number
  formData: CreateListingFormData
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<CreateListingFormData>) => void
  resetForm: () => void
}

const initialFormData: CreateListingFormData = {
  category_id: null,
  category_name: '',
  images: [],
  imageUrls: [],
  title: '',
  description: '',
  condition: 'good',
  brand: '',
  model: '',
  price_per_hour: '',
  price_per_day: '',
  price_per_week: '',
  price_per_month: '',
  security_deposit: '',
  city: '',
  area: '',
  state: '',
  pincode: '',
  contact_phone: '',
  contact_whatsapp: '',
  contact_email: '',
  preferred_contact: 'phone',
  terms_and_conditions: '',
  id_proof_required: true,
  delivery_available: false,
  minimum_rental_period: '1 day',
}

export const useListingFormStore = create<ListingFormState>((set) => ({
  currentStep: 1,
  formData: { ...initialFormData },

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 7) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ currentStep: 1, formData: { ...initialFormData } }),
}))
