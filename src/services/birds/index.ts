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
	gender?: 'machos' | 'femeas',
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
