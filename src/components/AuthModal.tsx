'use client'

import { useState } from 'react'
import { X, Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

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
      handleClose()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed. Please try again.'
      setError(message)
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleGoogle = async () => {
    // This function ONLY handles Google OAuth — completely separate from email signup
    setIsGoogleLoading(true)
    setError('')
    try {
      await signInWithGoogle()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign in failed.'
      setError(message)
      setIsGoogleLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Authentication modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-backdrop"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-[568px] sm:rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] z-10 overflow-hidden animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBEBEB] px-6 py-4">
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors -ml-2"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
          <span className="font-semibold text-[16px] text-[#222222]">
            {activeTab === 'login' ? 'Log in' : 'Sign up'}
          </span>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          {/* ORMA Logo/Title */}
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-[#FF385C]">ORMA</span>
            <p className="text-[#717171] text-sm mt-1">
              {activeTab === 'login' ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border border-[#DDDDDD] rounded-full p-1 mb-6">
            <button
              onClick={() => { setActiveTab('login'); setError('') }}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'login'
                  ? 'bg-[#222222] text-white'
                  : 'text-[#717171] hover:text-[#222222]'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError('') }}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'signup'
                  ? 'bg-[#222222] text-white'
                  : 'text-[#717171] hover:text-[#222222]'
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-[#222222] mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-[#222222] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#222222]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isEmailLoading}
                className="w-full py-3 bg-[#FF385C] text-white font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isEmailLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : 'Log In'}
              </button>

              <p className="text-center text-sm text-[#717171]">
                <button type="button" className="underline hover:text-[#222222]">
                  Forgot password?
                </button>
              </p>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-[#222222] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                  <input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-[#222222] mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                  <input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-[#222222] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#222222]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-[#222222] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171]" />
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-10 py-3 border border-[#DDDDDD] rounded-lg text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#222222]"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isEmailLoading}
                className="w-full py-3 bg-[#FF385C] text-white font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isEmailLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : 'Create Account'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-[#DDDDDD]" />
            <span className="px-4 text-sm text-[#717171]">or</span>
            <div className="flex-1 border-t border-[#DDDDDD]" />
          </div>

          {/* Google Sign In — completely separate from the email forms above */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 border border-[#222222] py-3 rounded-lg font-semibold text-[#222222] hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <span className="w-5 h-5 border-2 border-[#222222] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Chrome size={20} />
                Continue with Google
              </>
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-[#717171] mt-5">
            By continuing, you agree to ORMA&apos;s{' '}
            <a href="#" className="underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
