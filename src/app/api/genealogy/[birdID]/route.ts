import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = ''

export async function GET(
	request: NextRequest,
	{ params: { birdID } }: { params: { birdID: string } },
) {
	console.log(birdID, 'shablau')

	try {
		const response = await db.bird.findUnique({
			where: { id: Number(birdID) },
			include: { genealogy: true },
		})
		console.log('log', 1)

		if (!response) {
			return { message: 'Árvore não encontrada' }
		}
		console.log('log', 2)

		console.log(response, 'response')

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
		console.log(3)

		return { message: 'Erro ao buscar árvore' }
	}
}

// TODO implementar PUT and revalidate cache with revalidateTag

export async function PUT(
	request: NextRequest,
	{ params: { birdID } }: { params: { birdID: string } },
) {
	revalidateTag('genealogy' + birdID)
	return Response.json({ message: 'PUT request' })
}
