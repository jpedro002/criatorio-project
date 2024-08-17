import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const response = await db.bird.findMany({
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

export type CreateFullBird = Prisma.BirdCreateInput &
	Prisma.GenealogyCreateInput

export async function POST(request: NextRequest) {
	const data = await request.json()

	const { birth, father, mother, gender, name, ring, visible, child, ...rest } =
		data

	const existingBird = await db.bird.findUnique({
		where: { ring },
	})

	if (existingBird) {
		return NextResponse.json(
			{ message: 'Anilha já cadastrada' },
			{ status: 400 },
		)
	}

	try {
		const { id } = await db.genealogy.create({
			data: { ...rest },
		})

		await db.bird.create({
			data: {
				birth,
				father,
				mother,
				gender,
				name,
				ring,
				visible,
				genealogyId: id,
			},
		})

		revalidateTag('birds')

		return NextResponse.json(
			{ message: 'cadastrado com sucesso' },
			{ status: 201 },
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 400 },
		)
	}
}
