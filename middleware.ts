import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const jwt = req.cookies.get('jwt')?.value

  if (!jwt && !path.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  if (jwt && path.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }
}