import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)

		const ring = searchParams.get('ring') ?? ''
		const birdName = searchParams.get('birdName') ?? ''
		const page = parseInt(searchParams.get('page') ?? '1', 10)
		const limit = parseInt(searchParams.get('limit') ?? '10', 10)

		const skip = (page - 1) * limit

		const birds = await db.bird.findMany({
			where: {
				ring: {
					startsWith: ring,
				},
				name: {
					startsWith: birdName,
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
			skip,
			take: limit,
		})

		const totalBirds = await db.bird.count({
			where: {
				ring: {
					startsWith: ring,
				},
				name: {
					startsWith: birdName,
				},
			},
		})

		return NextResponse.json({
			birds,
			page,
			totalPages: Math.ceil(totalBirds / limit),
			totalBirds,
		})
	} catch (error) {
		console.error(error)

		return NextResponse.json({ message: 'algo deu errado' }, { status: 500 })
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
