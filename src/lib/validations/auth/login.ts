import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().min(1, 'campo obrigatorio').email('email inválido'),
	password: z.string().min(0, 'campo obrigatorio'),
})
