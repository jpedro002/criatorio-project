import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = ''

export async function GET(
	request: NextRequest,
	{ params: { birdID } }: { params: { birdID: string } },
) {
	try {
		const response = await db.bird.findUnique({
			where: { id: Number(birdID) },
			include: { genealogy: true },
		})

		if (!response) {
			return NextResponse.json({ message: 'Árvore não encontrada' })
		}

		const { birth, father, gender, mother, visible, name, ring } = response

		return NextResponse.json({
			bird: {
				birth,
				father,
				gender,
				mother,
				visible,
				name,
				ring,
			},
			genealogy: response.genealogy,
		})
	} catch (error) {
		return NextResponse.json(
			{ message: 'Árvore não encontrada' },
			{
				status: 404,
			},
		)
	}
}

// TODO implementar PUT and revalidate cache with revalidateTag

// export async function PUT(
// 	request: NextRequest,
// 	{ params: { birdID } }: { params: { birdID: string } },
// ) {
// 	revalidateTag('genealogy' + birdID)
// 	return Response.json({ message: 'PUT request' })
// }
