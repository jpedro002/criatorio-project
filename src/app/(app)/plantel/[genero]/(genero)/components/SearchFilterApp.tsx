'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const birdFilterSchema = z.object({
	birdName: z.string().optional(),
})

type BirdFilterSchema = z.infer<typeof birdFilterSchema>

export function SearchFilterApp() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const birdName = searchParams.get('birdName') ?? ''

	const { register, handleSubmit, reset } = useForm<BirdFilterSchema>({
		resolver: zodResolver(birdFilterSchema),
		defaultValues: {
			birdName,
		},
	})

	function handleFilter({ birdName }: BirdFilterSchema) {
		const params = new URLSearchParams(searchParams as any)

		if (birdName) {
			params.set('birdName', birdName)
		} else {
			params.delete('birdName')
		}

		params.set('page', '1')

		router.push(`?${params.toString()}`)
	}

	function handleClearFilters() {
		const params = new URLSearchParams(searchParams as any)

		params.delete('birdName')

		params.set('page', '1')

		router.push(`?${params.toString()}`)

		reset({
			birdName: '',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="mb-8 flex flex-wrap items-center gap-2"
		>
			<Input
				placeholder="Nome do pássaro"
				className="h-8 w-full sm:w-[320px]"
				{...register('birdName')}
			/>

			<Button variant="secondary" size="xs" type="submit">
				<Search className="mr-2 h-4 w-4" />
				Buscar
			</Button>
			<Button
				onClick={handleClearFilters}
				variant="outline"
				size="xs"
				type="button"
			>
				<X className="mr-2 h-4 w-4" />
				Remover filtros
			</Button>
		</form>
	)
}
