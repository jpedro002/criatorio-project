import { CombinedTypes } from '@/app/admin/schema'
import { fetchGenealogy } from '@/services/genealogy'
import { useFormContext } from 'react-hook-form'

export const useFillGenealogy = () => {
	const { setValue } = useFormContext<CombinedTypes>()

	const fillFatherGenealogy = async ({ id }: { id: string }) => {
		const { bird, genealogy, message } = await fetchGenealogy(id)

		if (message) {
			console.error(message)
			return
		}

		console.log(genealogy.paternalGrandfather)

		setValue('father', bird.name)
		setValue('paternalGrandfather', bird.father)
		setValue('paternalGrandmother', bird.mother)
		setValue('paternalGreatGrandfather1', genealogy.paternalGrandfather || '')
		setValue('paternalGreatGrandmother1', genealogy.paternalGrandmother || '')
		setValue('paternalGreatGrandfather2', genealogy.maternalGrandfather || '')
		setValue('paternalGreatGrandmother2', genealogy.maternalGrandmother || '')
		setValue(
			'paternalGreatGreatGrandfather1',
			genealogy.maternalGreatGreatGrandfather1 || '',
		)
		setValue(
			'paternalGreatGreatGrandmother1',
			genealogy.paternalGreatGreatGrandmother1 || '',
		)
		setValue(
			'paternalGreatGreatGrandfather2',
			genealogy.paternalGreatGreatGrandfather2 || '',
		)
		setValue(
			'paternalGreatGreatGrandmother2',
			genealogy.paternalGreatGreatGrandmother2 || '',
		)
		setValue(
			'paternalGreatGreatGrandfather3',
			genealogy.maternalGreatGreatGrandfather3 || '',
		)
		setValue(
			'paternalGreatGreatGrandmother3',
			genealogy.maternalGreatGreatGrandmother3 || '',
		)
		setValue(
			'paternalGreatGreatGrandfather4',
			genealogy.maternalGreatGreatGrandfather4 || '',
		)
		setValue(
			'paternalGreatGreatGrandmother4',
			genealogy.maternalGreatGreatGrandmother4 || '',
		)
	}

	const fillMotherGenealogy = async ({ id }: { id: string }) => {
		const { bird, genealogy, message } = await fetchGenealogy(id)

		if (message) {
			console.error(message)
			return
		}

		console.log(genealogy.maternalGrandfather)

		setValue('mother', bird.name)
		setValue('maternalGrandfather', bird.father)
		setValue('maternalGrandmother', bird.mother)
		setValue('maternalGreatGrandfather1', genealogy.paternalGrandfather || '')
		setValue('maternalGreatGrandmother1', genealogy.paternalGrandmother || '')
		setValue('maternalGreatGrandfather2', genealogy.maternalGrandfather || '')
		setValue('maternalGreatGrandmother2', genealogy.maternalGrandmother || '')
		setValue(
			'maternalGreatGreatGrandfather1',
			genealogy.maternalGreatGreatGrandfather1 || '',
		)
		setValue(
			'maternalGreatGreatGrandmother1',
			genealogy.paternalGreatGreatGrandmother1 || '',
		)
		setValue(
			'maternalGreatGreatGrandfather2',
			genealogy.paternalGreatGreatGrandfather2 || '',
		)
		setValue(
			'maternalGreatGreatGrandmother2',
			genealogy.paternalGreatGreatGrandmother2 || '',
		)
		setValue(
			'maternalGreatGreatGrandfather3',
			genealogy.maternalGreatGreatGrandfather3 || '',
		)
		setValue(
			'maternalGreatGreatGrandmother3',
			genealogy.maternalGreatGreatGrandmother3 || '',
		)
		setValue(
			'maternalGreatGreatGrandfather4',
			genealogy.maternalGreatGreatGrandfather4 || '',
		)
		setValue(
			'maternalGreatGreatGrandmother4',
			genealogy.maternalGreatGreatGrandmother4 || '',
		)
	}

	return {
		fillFatherGenealogy,
		fillMotherGenealogy,
	}
}
