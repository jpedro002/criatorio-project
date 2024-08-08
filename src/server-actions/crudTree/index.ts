'use server'
import { Prisma } from '@prisma/client'

import { db } from '@/lib/prisma'

export const create = async (
	data: (Prisma.BirdCreateInput & Prisma.GenealogyCreateInput) | any,
) => {
	const { birth, father, mother, gender, name, ring, visible, child, ...rest } =
		data

	try {
		const responseTree = await db.genealogy.create({
			data: { ...rest },
		})

		await db.bird.create({
			data: {
				birth,
				father,
				mother,
				gender,
				name: child,
				ring,
				visible,
				genealogyId: responseTree.id,
			},
		})

		return {
			message: 'Árvore criada com sucesso',
		}
	} catch (error) {
		console.log(error)
		return { message: 'Erro ao criar árvore' }
	}
}

export const getBirds = async () => {
	const response = await db.bird.findMany({})

	return response
}

export type GetBirdsReturnType = ReturnType<typeof getBirds>

export const getGenealogy = async (id: number) => {
	try {
		const response = await db.bird.findUnique({
			where: { id },
			include: { genealogy: true },
		})

		if (!response) {
			return { message: 'Árvore não encontrada' }
		}

		const { birth, father, gender, mother, visible, name, ring } = response

		return {
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
		}
	} catch (error) {
		return { message: 'Erro ao buscar árvore' }
	}
}
