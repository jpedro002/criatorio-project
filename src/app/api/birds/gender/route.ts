import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const gender = searchParams.get('gender') as any

	try {
		const response = await db.bird.findMany({
			where: {
				gender: gender[0] || undefined,
				visible: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		})

		return Response.json({ birds: response })
	} catch (error) {
		console.log(error)

		return Response.json({ message: 'algo deu errado' })
	}
}
