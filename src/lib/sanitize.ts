import DOMPurify from 'dompurify'

export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  // If we are on the server side where window is not defined, use a basic regex replace
  // For full SSR sanitization, consider isomorphic-dompurify in the future
  if (typeof window === 'undefined') {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  // Client-side execution
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags, only allow text
    ALLOWED_ATTR: []
  })
}
