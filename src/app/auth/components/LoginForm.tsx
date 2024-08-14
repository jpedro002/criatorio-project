'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginFormInputs, loginSchema } from '@/lib/validations/auth/login'
import { useLogin } from '@/services/auth'

export function LoginForm() {
	const { login } = useLogin()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginFormInputs) => {
		await login(data)
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
