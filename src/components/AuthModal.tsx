'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
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

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()
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
    setIsGoogleLoading(true)
    setError('')
    try {
      // For Google, it redirects to the callback route.
      // We'll set a flag so the callback route or layout knows they logged in,
      // but without knowing if signup/login, we just say Welcome.
      localStorage.setItem('orma_google_auth', 'true')
      await signInWithGoogle()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign in failed.'
      setError(message)
      setIsGoogleLoading(false)
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white/80 dark:bg-black/60 backdrop-blur-3xl w-full sm:max-w-[568px] sm:rounded-[3rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)] z-10 overflow-hidden border border-white/40 dark:border-white/10"
      >
        {/* Aesthetic Highlights */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#FF385C]/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#FF385C]/5 to-transparent rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 relative z-10">
          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-all hover:scale-110 active:scale-90"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-[#FF385C] uppercase tracking-[0.2em] mb-1">
              ORMA PLATFORM
            </span>
            <span id="auth-modal-title" className="text-xl font-black text-black dark:text-white tracking-tight">
              {activeTab === 'login' ? 'Welcome Back' : 'Get Started'}
            </span>
          </div>
          <div className="w-10" />
        </div>

        {/* Body */}
        <div className="px-8 pb-10 pt-4 overflow-y-auto max-h-[85vh] sm:max-h-none relative z-10 custom-scrollbar">
          {/* Tabs */}
          <div className="flex bg-black/[0.03] dark:bg-white/[0.03] p-1.5 rounded-[1.5rem] mb-10 border border-black/[0.05] dark:border-white/[0.05]">
            <button
              onClick={() => { setActiveTab('login'); setError('') }}
              className={`flex-1 py-3 text-sm font-bold rounded-[1.1rem] transition-all duration-300 relative z-10 ${
                activeTab === 'login'
                  ? 'text-black dark:text-white'
                  : 'text-[#717171] dark:text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {activeTab === 'login' && (
                <motion.div 
                  layoutId="tab-bg-v2"
                  className="absolute inset-0 bg-white dark:bg-[#222222] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.4)] rounded-[1.1rem] -z-10 border border-black/[0.05] dark:border-white/[0.1]"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              Log in
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError('') }}
              className={`flex-1 py-3 text-sm font-bold rounded-[1.1rem] transition-all duration-300 relative z-10 ${
                activeTab === 'signup'
                  ? 'text-black dark:text-white'
                  : 'text-[#717171] dark:text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {activeTab === 'signup' && (
                <motion.div 
                  layoutId="tab-bg-v2"
                  className="absolute inset-0 bg-white dark:bg-[#333333] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.4)] rounded-[1.1rem] -z-10 border border-black/[0.05] dark:border-white/[0.1]"
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
                  className="mb-8 p-4 bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30 rounded-2xl text-red-600 dark:text-red-400 text-[13px] font-bold shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {error}
                  </div>
                </motion.div>
              )}

              {/* Form Content */}
              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="block text-[11px] font-black text-[#717171] dark:text-gray-400 uppercase tracking-widest ml-1">
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 group-focus-within:text-[#FF385C] transition-colors" />
                      <input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-black dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-[#FF385C]/5 focus:border-[#FF385C] transition-all"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="login-password" className="block text-[11px] font-black text-[#717171] dark:text-gray-400 uppercase tracking-widest ml-1">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 group-focus-within:text-[#FF385C] transition-colors" />
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-black dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-[#FF385C]/5 focus:border-[#FF385C] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isEmailLoading}
                    className="w-full py-5 bg-gradient-to-br from-[#FF385C] to-[#E31C5F] text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 text-lg shadow-2xl shadow-[#FF385C]/30"
                  >
                    {isEmailLoading ? (
                      <span className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                    ) : 'Continue'}
                  </button>

                  <div className="flex justify-center">
                    <button type="button" className="text-xs font-bold text-[#717171] dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-black/20 dark:hover:border-white/20 pb-0.5">
                      Forgot password?
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="block text-[11px] font-black text-[#717171] dark:text-gray-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 group-focus-within:text-[#FF385C] transition-colors" />
                      <input
                        id="signup-name"
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-black dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-[#FF385C]/5 focus:border-[#FF385C] transition-all"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="block text-[11px] font-black text-[#717171] dark:text-gray-400 uppercase tracking-widest ml-1">
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 group-focus-within:text-[#FF385C] transition-colors" />
                      <input
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={e => setSignupEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-black dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-[#FF385C]/5 focus:border-[#FF385C] transition-all"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="block text-[11px] font-black text-[#717171] dark:text-gray-400 uppercase tracking-widest ml-1">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 group-focus-within:text-[#FF385C] transition-colors" />
                        <input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={e => setSignupPassword(e.target.value)}
                          placeholder="••••••"
                          className="w-full pl-12 pr-12 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-black dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-[#FF385C]/5 focus:border-[#FF385C] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 hover:text-black transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="block text-[11px] font-black text-[#717171] dark:text-gray-400 uppercase tracking-widest ml-1">
                        Confirm
                      </label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 group-focus-within:text-[#FF385C] transition-colors" />
                        <input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="••••••"
                          className="w-full pl-12 pr-12 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-black dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-[#FF385C]/5 focus:border-[#FF385C] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717171] dark:text-gray-500 hover:text-black transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isEmailLoading}
                    className="w-full py-5 bg-gradient-to-br from-[#FF385C] to-[#E31C5F] text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 text-lg shadow-2xl shadow-[#FF385C]/30"
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
          <div className="flex items-center my-10 relative">
            <div className="flex-1 border-t border-black/[0.08] dark:border-white/[0.08]" />
            <span className="px-6 text-[10px] font-black text-[#717171] dark:text-gray-500 uppercase tracking-[0.2em] bg-white/0">or continue with</span>
            <div className="flex-1 border-t border-black/[0.08] dark:border-white/[0.08]" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-4 border border-black/[0.08] dark:border-white/[0.1] bg-white/40 dark:bg-white/[0.02] py-4 rounded-2xl font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {isGoogleLoading ? (
                <span className="w-5 h-5 border-[3px] border-[#FF385C] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <div className="p-1.5 bg-white rounded-lg shadow-sm border border-black/[0.05]">
                    <Chrome size={18} className="text-[#EA4335]" fill="#EA4335" />
                  </div>
                  Google Account
                </>
              )}
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-[10px] text-[#717171] dark:text-gray-500 mt-10 leading-relaxed uppercase tracking-widest font-bold opacity-80">
            Secure authentication by ORMA. By continuing, you agree to our{' '}
            <a href="#" className="text-black dark:text-white border-b border-black/20 dark:border-white/20 hover:border-[#FF385C] transition-colors">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-black dark:text-white border-b border-black/20 dark:border-white/20 hover:border-[#FF385C] transition-colors">Privacy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
