import * as bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations/auth/login'

import AuthService from '../authService'

export async function POST(req: NextRequest) {
	const data = await req.json()

	const validateLoginInputs = loginSchema.safeParse(data)

	if (!validateLoginInputs.success) {
		return {
			success: false,
			errorMessage: 'Erro ao fazer login',
			errorType: 'campos inválidos',
		}
	} else {
		const user = await db.admin.findFirst({
			where: {
				email: validateLoginInputs.data.email,
			},
		})

		if (!user) {
			return NextResponse.json({
				success: false,
				errorMessage: 'email ou senha inválidos',
				errorType: 'email',
			})
		}

		const isMatch = await bcrypt.compare(
			validateLoginInputs.data.password,
			user.password,
		)

		if (!isMatch) {
			return NextResponse.json({
				success: false,
				errorMessage: 'email ou senha inválidos',
				errorType: 'email',
			})
		}

		await AuthService.createSessionToken({
			sub: user.id,
		})
		return NextResponse.json({ success: true })
	}
}
