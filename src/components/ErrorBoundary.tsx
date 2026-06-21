'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  showDetails: boolean
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, showDetails: false }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', error, info.componentStack)
    }
  }

  handleRefresh = () => window.location.reload()
  handleGoHome = () => { window.location.href = '/' }
  toggleDetails = () => this.setState(s => ({ showDetails: !s.showDetails }))

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="max-w-md w-full text-center">
          {/* Emoji */}
          <div className="text-6xl mb-6">😕</div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#222222] dark:text-white mb-3">
            Something went wrong
          </h2>

          {/* Description */}
          <p className="text-[#717171] dark:text-[#A0A0A0] text-sm leading-relaxed mb-8">
            We&apos;re sorry — an unexpected error occurred.<br />
            Please try refreshing the page.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={this.handleRefresh}
              className="px-6 py-3 bg-[#0071E3] text-white font-semibold rounded-xl hover:bg-[#0055B3] transition-colors"
            >
              Refresh Page
            </button>
            <button
              onClick={this.handleGoHome}
              className="px-6 py-3 border border-[#222222] dark:border-[#6B6B6B] text-[#222222] dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors"
            >
              Go to Home
            </button>
          </div>

          {/* Error details (expandable) */}
          <button
            onClick={this.toggleDetails}
            className="text-sm text-[#717171] dark:text-[#A0A0A0] hover:text-[#222222] dark:hover:text-white transition-colors inline-flex items-center gap-1"
          >
            Error details
            <span className={`inline-block transition-transform ${this.state.showDetails ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {this.state.showDetails && this.state.error && (
            <div className="mt-3 p-4 bg-[#F7F7F7] dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-xl text-left">
              <p className="text-xs font-mono text-[#717171] dark:text-[#A0A0A0] break-words whitespace-pre-wrap">
                {this.state.error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
