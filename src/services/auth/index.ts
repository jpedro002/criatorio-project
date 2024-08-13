import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { api } from '../api'
import { LoginFormInputs } from '@/lib/validations/auth/login'

interface LoginResponseSuccess {
	errorType: never
	errorMessage: never
	success: true
}

interface LoginResponseError {
	errorType: string
	errorMessage: string
	success: false
}

type LoginAdminResponse = LoginResponseSuccess | LoginResponseError

export function useLogin() {
	const router = useRouter()

	const login = async (data: LoginFormInputs) => {
		try {
			const response = await api('/auth/login', {
				method: 'POST',
				body: JSON.stringify(data),
			})

			const responseData: LoginAdminResponse = await response.json()

			if (responseData.success === false && responseData.errorType) {
				return toast.error(responseData.errorMessage)
			}

			router.replace('/admin/plantel')
		} catch (error) {
			return toast.error('Erro ao efetuar login')
		}
	}

	const logOut = async () => {
		try {
			const response = await api('/auth/logout', {
				method: 'POST',
			})

			const responseData: { success: boolean } = await response.json()

			if (responseData.success === false) {
				return toast.error('Erro ao sair', {
					action: {
						label: 'Tentar novamente',
						onClick: () => logOut(),
					},
				})
			}
		} catch (error) {
			return toast.error('Erro ao sair', {
				action: {
					label: 'Tentar novamente',
					onClick: () => logOut(),
				},
			})
		}
	}

	return { login, logOut }
}
