import { env } from '@/env'
import AuthService from '@/app/api/auth/authService'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
	matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname
	const session = await AuthService.isSessionValid()

	const isAdminPath = () => pathname.split('/').includes('admin')

	const isApiPath = () => pathname.split('/').includes('api')

	const isAuthPath = () =>
		pathname === '/auth' ||
		pathname === '/api/auth/login' ||
		pathname === '/api/auth/logout'

	console.log('pathname', pathname)

	if (!session && isAdminPath()) {
		return NextResponse.redirect(new URL('/auth', req.url))
	} else if (session && pathname === '/auth') {
		return NextResponse.redirect(new URL('/admin/plantel', req.url))
	} else if (isAuthPath()) {
		return NextResponse.next()
	} else if (!session && isApiPath()) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
}
