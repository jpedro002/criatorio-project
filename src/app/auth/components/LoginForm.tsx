'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Definindo o schema de validação com Zod
const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email é obrigatório')
		.email('Formato de email inválido'),
	password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

// Inferindo o tipo do schema com z.infer
type LoginFormInputs = z.infer<typeof loginSchema>

export function LoginForm() {
	// Usando useForm com o zodResolver e a tipagem inferida
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	})

	// Função chamada ao enviar o formulário
	const onSubmit = (data: LoginFormInputs) => {
		console.log('Form Data:', data)
	}

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							{...register('email')}
						/>
						{errors.email && (
							<span className="text-sm text-red-500">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Senha</Label>
						<Input id="password" type="password" {...register('password')} />
						{errors.password && (
							<span className="text-sm text-red-500">
								{errors.password.message}
							</span>
						)}
					</div>
					<CardFooter>
						<Button type="submit" className="w-full">
							Entrar
						</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	)
}
