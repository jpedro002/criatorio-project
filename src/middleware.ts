import { env } from '@/env'
import AuthService from '@/server-actions/auth/actions /authService'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
	matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname

	const session = await AuthService.isSessionValid()

	// console.log(
	// 	'session',
	// 	session,
	// 	Math.random(),
	// 	pathname.split('/').includes('/admin'),
	// 	123,
	// )

	if (!session && pathname.split('/').includes('admin')) {
		return NextResponse.redirect(new URL('/auth', req.url))
	} else if (session && pathname === '/auth') {
		return NextResponse.redirect(new URL('/admin/plantel', req.url))
	}

	// retrieve the current response
	const res = NextResponse.next()

	// add the CORS headers to the response
	res.headers.append('Access-Control-Allow-Credentials', 'true')
	res.headers.append(
		'Access-Control-Allow-Origin',
		env.NEXT_PUBLIC_API_BASE_URL || '*',
	) // replace this your actual origin
	res.headers.append(
		'Access-Control-Allow-Methods',
		'GET,DELETE,PATCH,POST,PUT',
	)
	res.headers.append(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	)

	return res
}

// specify the path regex to apply the middleware to
