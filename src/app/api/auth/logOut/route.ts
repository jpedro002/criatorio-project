import { NextRequest, NextResponse } from 'next/server'

import AuthService from '../authService'

export async function POST(req: NextRequest) {
	AuthService.destroySession()

	return NextResponse.redirect(new URL('/', req.url))
}
