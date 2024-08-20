import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const gender = (searchParams.get('gender') || '') as any
	const name = searchParams.get('name') || ''
	const page = parseInt(searchParams.get('page') || '1', 10)
	const limit = parseInt(searchParams.get('limit') || '10', 10)

	// Cálculo do offset para paginação
	const skip = (page - 1) * limit

	try {
		const birds = await db.bird.findMany({
			where: {
				gender: gender || undefined,
				name: {
					startsWith: name,
				},
				visible: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
			skip,
			take: limit,
		})

		const totalBirds = await db.bird.count({
			where: {
				gender: gender,
				name: {
					startsWith: name,
				},
				visible: true,
			},
		})

		return NextResponse.json({
			birds,
			page,
			totalPages: Math.ceil(totalBirds / limit),
			totalBirds,
		})
	} catch (error) {
		console.error('Error fetching birds:', error)

		return NextResponse.json({ message: 'Algo deu errado' }, { status: 500 })
	}
}
