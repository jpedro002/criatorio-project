import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const response = await db.bird.findMany({
			orderBy: {
				createdAt: 'asc',
			},
			select: {
				id: true,
				name: true,
				gender: true,
			},
		})

		const males = response.filter(({ gender }) => gender === 'm')
		const females = response.filter(({ gender }) => gender === 'f')

		return Response.json({ males, females }, { status: 200 })
	} catch (error) {
		console.log(error)

		return Response.json({ message: 'algo deu errado' }, { status: 500 })
	}
}
