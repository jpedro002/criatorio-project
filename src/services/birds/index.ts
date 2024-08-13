import { Prisma } from '@prisma/client'
import { toast } from 'sonner'

import { GetBirdsReturnType } from '@/server-actions/crudTree'

import { api } from '../api'
import { CreateFullBird } from '@/app/api/birds/route'

interface BirdsResponseSuccess {
	birds: GetBirdsReturnType[]
}

interface BirdsResponseError {
	birds?: never
}

type FetchBirdsResponse = BirdsResponseSuccess | BirdsResponseError

export const fetchBirds = async (
	gender?: 'machos' | 'femeas' | '',
): Promise<FetchBirdsResponse> => {
	try {
		const response = await api('/birds?gender=' + gender, {
			next: {
				tags: ['birds'],
			},
		})

		const data: BirdsResponseSuccess | BirdsResponseError =
			await response.json()

		if ('birds' in data) {
			return data as BirdsResponseSuccess
		} else {
			return { birds: undefined as never }
		}
	} catch (error) {
		return { birds: undefined as never }
	}
}

interface UpdateBirdBody extends Prisma.BirdUpdateInput {
	id: number
}

export const updateBird = async (body: UpdateBirdBody) => {
	const { createdAt, updatedAt, genealogy, id, ...rest } = body

	try {
		const response = await api('/birds/' + id, {
			method: 'PUT',
			body: JSON.stringify({ ...rest }),
		})

		const data: { success: boolean } = await response.json()

		if (data.success === false) {
			return toast.error('Erro ao atualizar ave', {
				action: {
					label: 'Tentar novamente',
					onClick: () => updateBird(body),
				},
			})
		}

		return toast.success('Ave atualizada com sucesso')
	} catch (error) {
		return toast.error('Erro ao atualizar ave', {
			action: {
				label: 'Tentar novamente',
				onClick: () => updateBird(body),
			},
		})
	}
}

export const useCreateFullBird = async (
	birdInput: CreateFullBird,
): Promise<{
	success: boolean
	redirect: boolean
}> => {
	try {
		const response = await api('/birds', {
			method: 'POST',
			body: JSON.stringify(birdInput),
		})

		const { message } = await response.json()

		if (response.status === 400) {
			toast.error(message)
			return { success: false, redirect: false }
		}

		toast.success('Ave criada com sucesso')
		return { success: true, redirect: true }
	} catch (error) {
		toast.error('Erro ao criar ave')
		return { success: false, redirect: false }
	}
}

// TODO make this function work and the route too

// export const deleteBird = async (id: number) => {
// 	try {
// 		const response = await api('/birds/' + id, {
// 			method: 'DELETE',
// 		})

// 		const data: { success: boolean } = await response.json()

// 		if (data.success === false) {
// 			return toast.error('Erro ao deletar ave', {
// 				action: {
// 					label: 'Tentar novamente',
// 					onClick: () => deleteBird(id),
// 				},
// 			})
// 		}

// 		return toast.success('Ave deletada com sucesso')
// 	} catch (error) {
// 		return toast.error('Erro ao deletar ave', {
// 			action: {
// 				label: 'Tentar novamente',
// 				onClick: () => deleteBird(id),
// 			},
// 		})
// 	}
// }
