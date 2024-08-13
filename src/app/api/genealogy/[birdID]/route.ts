import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

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

export async function PUT(
	request: NextRequest,
	{ params: { birdID } }: { params: { birdID: string } },
) {
	const body = (await request.json()) as Prisma.GenealogyUpdateInput

	try {
		const response = await db.genealogy.update({
			where: {
				id: Number(birdID),
			},
			data: body,
		})

		revalidateTag('genealogy' + birdID)

		return Response.json({ success: true })
	} catch (error) {
		console.log(error)

		return Response.json({ success: false })
	}
}
