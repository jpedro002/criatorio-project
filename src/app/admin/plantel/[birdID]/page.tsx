import { redirect } from 'next/navigation'

import { fetchGenealogy } from '@/services/genealogy'

import { FormEditBird, FormEditBirdProps } from './components/FormEditBird'
import { FormGenealogy, GenealogyFormProps } from './components/FormGenealogy'

const GenealogyForm = async ({ params }: { params: { birdID: string } }) => {
	const { bird, genealogy, message } = await fetchGenealogy(params.birdID)

	const formGenealogyDefaultValues = (): GenealogyFormProps => {
		if (message) {
			return {} as GenealogyFormProps
		}

		return {
			child: bird?.name,
			father: bird?.father,
			mother: bird?.mother,
			...genealogy,
		} as GenealogyFormProps
	}

	const formEditBirdDefaultValues = (): FormEditBirdProps => {
		if (message) {
			return {} as FormEditBirdProps
		}

		return {
			birdID: params.birdID,
			...bird,
		} as FormEditBirdProps
	}

	if (message) return redirect('/admin/plantel')

	return (
		<div className="mx-auto w-full max-w-[80%] space-y-8 py-20  md:px-10 xl:max-w-4xl ">
			<FormEditBird {...formEditBirdDefaultValues()} />
			<FormGenealogy {...formGenealogyDefaultValues()} />
		</div>
	)
}

export default GenealogyForm
