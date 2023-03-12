import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // const session = request.cookies.get('next-auth.session-token')
  //   ?.value as string

  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  })

  if (!token) {
    request.nextUrl.pathname = '/login'
    return NextResponse.redirect(request.nextUrl)
  }

  if (
    request.nextUrl.pathname.startsWith('/settings') ||
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    if (
      !['GUEST', 'MEMBER', 'PARTNER', 'ADMIN'].includes(
        (token?.user as unknown as { role: string })?.role
      )
    ) {
      request.nextUrl.pathname = '/login'
      return NextResponse.redirect(request.nextUrl)
    }

    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (
      !['ADMIN'].includes((token?.user as unknown as { role: string })?.role)
    ) {
      request.nextUrl.pathname = '/login'
      return NextResponse.redirect(request.nextUrl)
    }

    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/settings/:path*', '/admin/:path*'],
}
