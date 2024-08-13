import { z } from 'zod'

export const genealogySchema = z.object({
	child: z.string().min(2, { message: 'Nome do passaro é obrigatorio' }),
	father: z.string().min(2, { message: 'Nome do pai é obrigatorio' }),
	mother: z.string().min(2, { message: 'Nome da mãe é obrigatorio' }),
	paternalGrandfather: z.string(),
	paternalGrandmother: z.string(),
	maternalGrandfather: z.string(),
	maternalGrandmother: z.string(),
	paternalGreatGrandfather1: z.string(),
	paternalGreatGrandmother1: z.string(),
	paternalGreatGrandfather2: z.string(),
	paternalGreatGrandmother2: z.string(),
	maternalGreatGrandfather1: z.string(),
	maternalGreatGrandmother1: z.string(),
	maternalGreatGrandfather2: z.string(),
	maternalGreatGrandmother2: z.string(),
	paternalGreatGreatGrandfather1: z.string(),
	paternalGreatGreatGrandmother1: z.string(),
	paternalGreatGreatGrandfather2: z.string(),
	paternalGreatGreatGrandmother2: z.string(),
	paternalGreatGreatGrandfather3: z.string(),
	paternalGreatGreatGrandmother3: z.string(),
	paternalGreatGreatGrandfather4: z.string(),
	paternalGreatGreatGrandmother4: z.string(),
	maternalGreatGreatGrandfather1: z.string(),
	maternalGreatGreatGrandmother1: z.string(),
	maternalGreatGreatGrandfather2: z.string(),
	maternalGreatGreatGrandmother2: z.string(),
	maternalGreatGreatGrandfather3: z.string(),
	maternalGreatGreatGrandmother3: z.string(),
	maternalGreatGreatGrandfather4: z.string(),
	maternalGreatGreatGrandmother4: z.string(),
})

export const schema = z.object({
	ring: z.string().min(3, { message: 'Anilha é obrigatório' }),
	name: z.string().min(0),
	gender: z
		.string({
			message: 'Gênero é obrigatório',
		})
		.min(1, {
			message: 'Gênero é obrigatório',
		}),
	birth: z
		.union([
			z.date({
				errorMap: (issue, { defaultError }) => ({
					message:
						issue.code === 'invalid_date'
							? 'Data de nascimento é obrigatório'
							: defaultError,
				}),
			}),
			z.string().transform((str) => {
				const dateRegex = /^\d{4}-\d{2}-\d{2}$/
				if (!dateRegex.test(str)) {
					throw new Error('Data de nascimento inválida')
				}
				const date = new Date(str)
				if (isNaN(date.getTime())) {
					throw new Error('Data de nascimento inválida')
				}
				return date
			}),
		])
		.refine((date) => date <= new Date(), {
			message: 'Data de nascimento inválida',
		}),
	visible: z.boolean(),
})

const additionalBirdSchema = z.object({
	birdID: z.string(),
	father: z.string().min(2, { message: 'Nome do pai é obrigatorio' }),
	mother: z.string().min(2, { message: 'Nome da mãe é obrigatorio' }),
})

export const editGenealogySchema = genealogySchema.omit({
	child: true,
	father: true,
	mother: true,
})

export const birdCombinedSchema = schema.merge(additionalBirdSchema)

export const combinedSchema = genealogySchema.merge(schema)

export type GenealogyType = z.infer<typeof genealogySchema>
export type InputsTypes = z.infer<typeof schema>
export type CombinedTypes = z.infer<typeof combinedSchema>
export type EditGenealogyType = z.infer<typeof editGenealogySchema>
