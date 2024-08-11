import { Prisma } from '@prisma/client'
import { toast } from 'sonner'

import { GetBirdsReturnType } from '@/server-actions/crudTree'

import { api } from '../api'

interface BirdsResponseSuccess {
	birds: GetBirdsReturnType[]
	message?: never
}

interface BirdsResponseError {
	birds?: never
	message: string
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
			return { message: 'dados incompletos', birds: undefined as never }
		}
	} catch (error) {
		return { message: 'algo deu errado', birds: undefined as never }
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
