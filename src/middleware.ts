/**
 * Korumalı rotalar: oturum çerezi (AuthContext girişte set eder).
 * localStorage ile senkron için ilk yüklemede /login üzerinden yönlendirme olabilir.
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME } from '@/config/constants'

const PROTECTED_PREFIXES = ['/dashboard', '/analysis']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (!isProtected) return NextResponse.next()

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!session) {
    const login = new URL('/login', request.url)
    login.searchParams.set('next', pathname)
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/analysis/:path*'],
}
