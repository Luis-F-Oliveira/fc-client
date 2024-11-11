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
  const roles = req.cookies.getAll()

  const routePermissions = {
    '/admin': 'admin',
    '/public': 'visualizador',
    '/scrapping': 'coletador',
  }

  if (!jwt && !path.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  if (jwt && path.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/public/home', req.url))
  }

  for (const [route, role] of Object.entries(routePermissions)) {
    if (path.startsWith(route) && !roles.some(item => item.name === role)) {
      return NextResponse.redirect(new URL('/forbidden', req.url))
    }
  }
}