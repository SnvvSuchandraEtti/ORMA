'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">😕</div>

        <h2 className="text-2xl font-bold text-[#222222] dark:text-white mb-3">
          Something went wrong
        </h2>

        <p className="text-[#717171] dark:text-[#A0A0A0] text-sm leading-relaxed mb-8">
          We&apos;re sorry — an unexpected error occurred.<br />
          Please try again or go back to the home page.
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-xl hover:bg-[#E31C5F] transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-[#222222] dark:border-[#6B6B6B] text-[#222222] dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors"
          >
            Go to Home
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="p-4 bg-[#F7F7F7] dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#3D3D3D] rounded-xl text-left">
            <p className="text-xs font-mono text-[#717171] dark:text-[#A0A0A0] break-words whitespace-pre-wrap">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
