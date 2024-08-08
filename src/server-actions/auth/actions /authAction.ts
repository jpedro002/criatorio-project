'use server'

import bcrypt from 'bcrypt'
import z from 'zod'

import { db } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations/auth/login'

import AuthService from './authService'

type LoginInputs = z.infer<typeof loginSchema>

interface RegisterResponseError {
	success: false
	errorMessage: string
	errorType: string
}

interface RegisterResponseSuccess {
	success: true
}

async function createAccount(data: RegisterInputs) {
	const validatedData = registerSchema.safeParse(data)
	if (validatedData.success) {
		const user = await prisma.user.findFirst({
			where: {
				email: validatedData.data.email,
			},
		})
		if (user) {
			return {
				success: false,
				errorMessage: 'Email já cadastrado',
				errorType: 'email',
			}
		} else {
			try {
				const hashPassword = await bcrypt.hash(validatedData.data.password, 10)

				const { id, name } = await prisma.user.create({
					data: {
						name: validatedData.data.name,
						email: validatedData.data.email,
						password: hashPassword,
					},
				})

				AuthService.createSessionToken({
					sub: id,
					name,
				})

				return { success: true }
			} catch (err) {
				return {
					success: false,
					errorMensage: 'Erro ao criar conta',
					errorType: 'server',
				}
			}
		}
	}
}

async function login(
	data: LoginInputs,
): Promise<RegisterResponseError | RegisterResponseSuccess> {
	const validateLoginInputs = loginSchema.safeParse(data)

	if (!validateLoginInputs.success) {
		return {
			success: false,
			errorMessage: 'Erro ao fazer login',
			errorType: 'campos inválidos',
		}
	} else {
		const user = await db.user.findFirst({
			where: {
				email: validateLoginInputs.data.email,
			},
		})

		if (!user) {
			return {
				success: false,
				errorMessage: 'email ou senha inválidos',
				errorType: 'email',
			}
		}

		const isMatch = await bcrypt.compare(
			validateLoginInputs.data.password,
			user.password,
		)

		if (!isMatch) {
			return {
				success: false,
				errorMessage: 'email ou senha inválidos',
				errorType: 'email',
			}
		}

		await AuthService.createSessionToken({
			sub: user.id,
			name: user.name,
		})
		return { success: true }
	}
}

async function logOut() {
	AuthService.destroySession()
}

export { createAccount, login, logOut }
