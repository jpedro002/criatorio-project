import { NextRequest, NextResponse } from 'next/server'
import AuthService from '../authService'

export async function POST(req: NextRequest) {
	AuthService.destroySession()

	return NextResponse.rewrite(new URL('/', req.url))
}
