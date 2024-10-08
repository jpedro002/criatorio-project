import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'

import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function PUT(
	request: NextRequest,
	{ params: { birdID } }: { params: { birdID: string } },
) {
	const body = (await request.json()) as Prisma.BirdUpdateInput

	try {
		const response = await db.bird.update({
			where: {
				id: Number(birdID),
			},
			data: body,
		})

		revalidateTag('birds')
		revalidateTag('genealogy' + birdID)

		return Response.json({ success: true })
	} catch (error) {
		console.log(error)

		return Response.json({ success: false })
	}
}
