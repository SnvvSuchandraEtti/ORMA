import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { supabaseResponse } = await updateSession(request)
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
