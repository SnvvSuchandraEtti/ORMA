import toast from '@/lib/toast'

interface SupabaseError {
  message?: string
  code?: string
  details?: string
  hint?: string
  status?: number
}

/**
 * Categorises a Supabase / network error and shows an appropriate toast.
 * Returns the user-facing message string for callers that need it.
 */
export function handleSupabaseError(
  error: unknown,
  context?: string
): string {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[handleSupabaseError]${context ? ` (${context})` : ''}`, error)
  }

  const err = error as SupabaseError
  const code = err?.code ?? ''
  const message = err?.message ?? ''
  const status = err?.status ?? 0

  // Network errors
  if (
    message.includes('Failed to fetch') ||
    message.includes('NetworkError') ||
    message.includes('Load failed') ||
    message.includes('net::ERR_')
  ) {
    const msg = 'Check your internet connection'
    toast.error('Network error', msg)
    return msg
  }

  // Auth errors
  if (
    code === 'PGRST301' ||
    status === 401 ||
    status === 403 ||
    message.includes('JWT') ||
    message.includes('not authenticated') ||
    message.includes('Invalid login')
  ) {
    const msg = 'Please log in again'
    toast.error('Authentication error', msg)
    return msg
  }

  // Not found
  if (code === 'PGRST116' || status === 404) {
    const msg = "This item doesn't exist"
    toast.error('Not found', msg)
    return msg
  }

  // Rate limit
  if (status === 429 || message.includes('rate limit')) {
    const msg = 'Too many requests. Please wait.'
    toast.error('Slow down', msg)
    return msg
  }

  // Unique violation (already exists)
  if (code === '23505') {
    const msg = 'This already exists'
    toast.info('Duplicate', msg)
    return msg
  }

  // Foreign key violation
  if (code === '23503') {
    const msg = 'A related item was not found'
    toast.error('Reference error', msg)
    return msg
  }

  // Fallback
  const msg = message || 'Something went wrong'
  toast.error('Error', msg)
  return msg
}
