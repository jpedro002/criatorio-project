import { Prisma } from '@prisma/client'
import { toast } from 'sonner'

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

interface UpdateGenealogyBody extends Prisma.GenealogyUpdateInput {
	id: string | number
}

export const updateGenealogy = async (body: UpdateGenealogyBody) => {
	const { id, ...rest } = body

	try {
		const response = await api('/genealogy/' + id, {
			method: 'PUT',
			body: JSON.stringify({ ...rest }),
		})

		// TODO: make a toast

		const data: { success: boolean } = await response.json()

		if (!data.success) {
			toast.error('erro ao atualizar')
			return data.success
		}
		toast.success('atualizado com sucesso')

		return data.success
	} catch (error) {
		return false
	}
}
