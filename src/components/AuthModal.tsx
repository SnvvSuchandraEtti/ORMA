'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup form
  const [fullName, setFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isGoogleLoading } = useAuth()
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab)
  }, [isOpen, initialTab])

  if (!isOpen) return null

  const handleClose = () => {
    setError('')
    setLoginEmail('')
    setLoginPassword('')
    setFullName('')
    setSignupEmail('')
    setSignupPassword('')
    setConfirmPassword('')
    onClose()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields')
      return
    }
    setIsEmailLoading(true)
    try {
      await signInWithEmail(loginEmail, loginPassword)
      const redirectTo = localStorage.getItem('orma_post_login_redirect')
      if (redirectTo) {
        router.push(redirectTo)
        localStorage.removeItem('orma_post_login_redirect')
      }
      handleClose()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(message)
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!fullName || !signupEmail || !signupPassword || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setIsEmailLoading(true)
    try {
      await signUpWithEmail(signupEmail, signupPassword, fullName)
      localStorage.setItem('orma_new_signup', 'true')
      const redirectTo = localStorage.getItem('orma_post_login_redirect')
      if (redirectTo) {
        router.push(redirectTo)
        localStorage.removeItem('orma_post_login_redirect')
      }
      handleClose()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed. Please try again.'
      setError(message)
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    try {
      localStorage.setItem('orma_google_auth', 'true')
      await signInWithGoogle()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign in failed.'
      setError(message)
    }
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/48 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white dark:bg-[#1C1C1E] w-full sm:max-w-[400px] rounded-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 relative z-10">
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] flex items-center justify-center hover:bg-[#E8E8ED] dark:hover:bg-[#38383A] text-[#1D1D1F] dark:text-white transition-all"
            aria-label="Close modal"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-[0.15em] mb-1">
              ORMA PLATFORM
            </span>
            <span id="auth-modal-title" className="text-[24px] font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              {activeTab === 'login' ? 'Welcome Back' : 'Get Started'}
            </span>
          </div>
          <div className="w-7" />
        </div>

        {/* Body */}
        <div className="px-8 pb-8 pt-4 overflow-y-auto max-h-[85vh] sm:max-h-none relative z-10 custom-scrollbar">
          {/* Tabs */}
          <div className="flex border-b border-[#E8E8ED] dark:border-[#38383A] mb-8">
            <button
              onClick={() => { setActiveTab('login'); setError('') }}
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 relative ${
                activeTab === 'login'
                  ? 'text-[#1D1D1F] dark:text-white'
                  : 'text-[#86868B] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {activeTab === 'login' && (
                <motion.div 
                  layoutId="auth-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071E3]"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              Log in
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError('') }}
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 relative ${
                activeTab === 'signup'
                  ? 'text-[#1D1D1F] dark:text-white'
                  : 'text-[#86868B] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {activeTab === 'signup' && (
                <motion.div 
                  layoutId="auth-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071E3]"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              Sign up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Error message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert" 
                  className="mb-6 p-4 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-xl text-[#FF3B30] text-[13px] font-medium"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" />
                    {error}
                  </div>
                </motion.div>
              )}

              {/* Form Content */}
              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider ml-1">
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0071E3] transition-colors" />
                      <input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[17px] text-[#1D1D1F] dark:text-white font-normal placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="login-password" className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider ml-1">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0071E3] transition-colors" />
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[17px] text-[#1D1D1F] dark:text-white font-normal placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isEmailLoading}
                    className="w-full h-12 bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0055B3] active:scale-[0.98] text-white font-semibold rounded-full transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 text-[17px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  >
                    {isEmailLoading ? (
                      <span className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                    ) : 'Continue'}
                  </button>

                  <div className="flex justify-center">
                    <button type="button" className="text-[14px] font-medium text-[#0071E3] hover:underline transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0071E3] transition-colors" />
                      <input
                        id="signup-name"
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[17px] text-[#1D1D1F] dark:text-white font-normal placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider ml-1">
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0071E3] transition-colors" />
                      <input
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={e => setSignupEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[17px] text-[#1D1D1F] dark:text-white font-normal placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider ml-1">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0071E3] transition-colors" />
                        <input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={e => setSignupPassword(e.target.value)}
                          placeholder="••••••"
                          className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[17px] text-[#1D1D1F] dark:text-white font-normal placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="block text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wider ml-1">
                        Confirm
                      </label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0071E3] transition-colors" />
                        <input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="••••••"
                          className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-xl text-[17px] text-[#1D1D1F] dark:text-white font-normal placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isEmailLoading}
                    className="w-full h-12 bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0055B3] active:scale-[0.98] text-white font-semibold rounded-full transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 text-[17px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  >
                    {isEmailLoading ? (
                      <span className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                    ) : 'Register Account'}
                  </button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center my-8 relative">
            <div className="flex-1 border-t border-[#E8E8ED] dark:border-[#38383A]" />
            <span className="px-4 text-[12px] font-medium text-[#86868B]">or</span>
            <div className="flex-1 border-t border-[#E8E8ED] dark:border-[#38383A]" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isGoogleLoading}
              className="w-full h-[48px] flex items-center justify-center gap-3 bg-white dark:bg-[#2C2C2E] border border-[#D2D2D7] dark:border-[#38383A] rounded-full text-[17px] font-medium text-[#1D1D1F] dark:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#38383A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-[12px] text-[#86868B] mt-8 leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/terms" onClick={onClose} className="text-[#0071E3] hover:underline">
              Terms
            </Link>
            {' '}and{' '}
            <Link href="/privacy" onClick={onClose} className="text-[#0071E3] hover:underline">
              Privacy
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  )
}
