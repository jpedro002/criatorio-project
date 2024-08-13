import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

import { db } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const gender = searchParams.get('gender') as any

	try {
		const response = await db.bird.findMany({
			where: {
				gender: gender[0],
				visible: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		})

		return Response.json({ birds: response })
	} catch (error) {
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
