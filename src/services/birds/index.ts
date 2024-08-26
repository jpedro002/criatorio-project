import { Prisma, PrismaPromise } from '@prisma/client'
import { toast } from 'sonner'

import { CreateFullBird } from '@/app/api/birds/route'
import { GetBirdsReturnType } from '@/server-actions/crudTree'

import { api } from '../api'

interface BirdsResponseSuccess {
	birds: GetBirdsReturnType[]
	page: number
	totalPages: number
	totalBirds: number
}

interface BirdsResponseError {
	birds?: never
	page: never
	totalPages: never
	totalBirds: never
}

type FetchBirdsResponse = BirdsResponseSuccess | BirdsResponseError

export const fetchBirdsByGender = async (
	gender: 'machos' | 'femeas' | '' = '',
	name: string = '',
	page: number = 1,
	limit: number = 10,
): Promise<FetchBirdsResponse> => {
	try {
		const queryParams = new URLSearchParams({
			gender: gender[0],
			name,
			page: String(page),
			limit: String(limit),
		})

		const response = await api(`/birds/gender?${queryParams.toString()}`, {
			next: {
				tags: ['birds'],
			},
		})

		const data: BirdsResponseSuccess | BirdsResponseError =
			await response.json()

		if ('birds' in data) {
			return data as BirdsResponseSuccess
		} else {
			return {} as BirdsResponseError
		}
	} catch (error) {
		return {} as BirdsResponseError
	}
}

export const fetchAllBirds = async ({
	ring = '',
	birdName = '',
	page = 1,
	limit = 10,
}: {
	ring?: string
	birdName?: string
	page?: number
	limit?: number
}): Promise<FetchBirdsResponse> => {
	try {
		const queryParams = new URLSearchParams({
			ring,
			birdName,
			page: String(page),
			limit: String(limit),
		})

		const response = await api(`/birds?${queryParams.toString()}`, {
			next: {
				tags: ['birds'],
			},
		})

		const data: BirdsResponseSuccess | BirdsResponseError =
			await response.json()

		if ('birds' in data) {
			return data as BirdsResponseSuccess
		} else {
			return {} as BirdsResponseError
		}
	} catch (error) {
		console.error('Error fetching birds:', error)
		return {} as BirdsResponseError
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

interface dataResponseAvaliableParents {
	name: string
	gender: string
	id: number
}

export interface parentsResponse {
	males: dataResponseAvaliableParents[]
	females: dataResponseAvaliableParents[]
}

export const useFetchAvaliableParents = async (): Promise<parentsResponse> => {
	try {
		const response = await api('/birds/info')
		const result: parentsResponse = await response.json()
		return result
	} catch (error) {
		console.error('Error fetching parents data:', error)
		return { males: [], females: [] }
	}
}
