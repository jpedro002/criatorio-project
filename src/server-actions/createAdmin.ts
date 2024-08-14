'use server'

import * as bcrypt from 'bcrypt'

import AuthService from '@/app/api/auth/authService'
import { db } from '@/lib/prisma'

export async function createAccount(data: any) {
	// const user = await db.admin.findFirst({
	// 	where: {
	// 		email: data.email,
	// 	},
	// })

	// if (user) {
	// 	return {
	// 		success: false,
	// 		errorMessage: 'Email já cadastrado',
	// 		errorType: 'email',
	// 	}
	// } else {
	try {
		const hashPassword = await bcrypt.hash(data.password, 10)

		const { id } = await db.admin.create({
			data: {
				email: data.email,
				password: hashPassword,
			},
		})

		AuthService.createSessionToken({
			sub: id,
		})

		return { success: true }
	} catch (err) {
		console.log(err)

		return {
			success: false,
			errorMensage: 'Erro ao criar conta',
			errorType: 'server',
		}
	}
}
// }
