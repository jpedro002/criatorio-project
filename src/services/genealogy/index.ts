import { Prisma } from '@prisma/client'

import { api } from '../api'

type BirdWithGenealogy = Prisma.BirdGetPayload<{
	include: { genealogy: true }
}>

interface BirdResponse {
	bird: Omit<BirdWithGenealogy, 'genealogy'>
	genealogy: BirdWithGenealogy['genealogy']
	message: never
}

interface ErrorResponse {
	message: string
	bird: never
	genealogy: never
}

type FetchGenealogyResponse = BirdResponse | ErrorResponse

export const fetchGenealogy = async (
	id: string,
): Promise<FetchGenealogyResponse> => {
	try {
		const response = await api('/genealogy/' + id, {
			next: {
				tags: ['genealogy' + id],
			},
		})

		const data: BirdResponse = await response.json()

		if (data.bird && data.genealogy) {
			return data
		} else {
			return {
				message: 'dados incompletos',
				bird: undefined as never,
				genealogy: undefined as never,
			}
		}
	} catch (error) {
		return {
			message: 'algo deu errado',
			bird: undefined as never,
			genealogy: undefined as never,
		}
	}
}
