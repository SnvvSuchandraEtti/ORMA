import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const isNextIncluded = next.includes('?') ? '&' : '?'
      return NextResponse.redirect(`${origin}${next}${isNextIncluded}logged_in=true`)
    }
  }

  // Return to home with error indicator
  return NextResponse.redirect(`${origin}/?error=auth`)
}
