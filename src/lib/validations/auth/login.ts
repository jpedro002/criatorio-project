import { z } from 'zod'

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email é obrigatório')
		.email('Formato de email inválido'),
	password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormInputs = z.infer<typeof loginSchema>
