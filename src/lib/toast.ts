import hotToast from 'react-hot-toast'
import React from 'react'
import CustomToast from '@/components/ui/CustomToast'

type ToastFunction = {
  (message: string, options?: any): void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
  dismiss: (id?: string) => void
}

const toast: ToastFunction = Object.assign(
  (title: string, options?: any) => {
    return hotToast.custom((t) => React.createElement(CustomToast, { t, title, type: 'info' }), { duration: 4000 })
  },
  {
    success: (title: string, message?: string) => {
      return hotToast.custom((t) => React.createElement(CustomToast, { t, title, message, type: 'success' }), { duration: 4000 })
    },
    error: (title: string, message?: string) => {
      return hotToast.custom((t) => React.createElement(CustomToast, { t, title, message, type: 'error' }), { duration: 4000 })
    },
    info: (title: string, message?: string) => {
      return hotToast.custom((t) => React.createElement(CustomToast, { t, title, message, type: 'info' }), { duration: 4000 })
    },
    dismiss: (id?: string) => {
      hotToast.dismiss(id)
    }
  }
)

export default toast
