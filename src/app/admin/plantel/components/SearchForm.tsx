'use client'

// import { Search } from 'lucide-react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { FormEvent } from 'react'

// export function SearchForm() {
// 	const router = useRouter()
// 	const searchParams = useSearchParams()

// 	const query = searchParams.get('q')

// 	function handleSearch(event: FormEvent<HTMLFormElement>) {
// 		event.preventDefault()

// 		const formData = new FormData(event.currentTarget)
// 		const data = Object.fromEntries(formData)

// 		const query = data.q

// 		if (!query) {
// 			return null
// 		}

// 		router.push(`/admin/plantel?q=${query}`)
// 	}

// 	return (
// 		<form
// 			onSubmit={handleSearch}
// 			className="flex w-[320px] items-center gap-3 rounded-full border-2 border-black px-5 py-3 ring-zinc-700"
// 		>
// 			<Search className="h-5 w-5 text-zinc-500" />

// 			<input
// 				name="q"
// 				defaultValue={query ?? ''}
// 				placeholder="Buscar produtos..."
// 				className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
// 			/>
// 		</form>
// 	)
// }

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const birdFilterSchema = z.object({
	ring: z.string().optional(),
	birdName: z.string().optional(),
})

type BirdFilterSchema = z.infer<typeof birdFilterSchema>

export function SearchForm() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const ring = searchParams.get('ring') ?? ''
	const birdName = searchParams.get('birdName') ?? ''

	const { register, handleSubmit, reset } = useForm<BirdFilterSchema>({
		resolver: zodResolver(birdFilterSchema),
		defaultValues: {
			birdName,
			ring,
		},
	})

	function handleFilter({ birdName, ring }: BirdFilterSchema) {
		const params = new URLSearchParams(searchParams as any)

		if (birdName) {
			params.set('birdName', birdName)
		} else {
			params.delete('birdName')
		}

		if (ring) {
			params.set('ring', ring)
		} else {
			params.delete('ring')
		}

		params.set('page', '1')

		router.push(`plantel?${params.toString()}`)
	}

	function handleClearFilters() {
		const params = new URLSearchParams(searchParams as any)

		params.delete('ring')
		params.delete('birdName')

		params.set('page', '1')

		router.push(`plantel?${params.toString()}`)

		reset({
			birdName: '',
			ring: '',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-wrap items-center gap-2"
		>
			<div className="flex w-full items-center gap-2 md:w-fit">
				<span className="w-fit text-sm font-semibold">Filtros:</span>
				<Input
					placeholder="Anilha"
					className="h-8 w-full sm:w-auto"
					{...register('ring')}
				/>
			</div>
			<Input
				placeholder="Nome do pássaro"
				className="h-8 w-full sm:w-[320px]"
				{...register('birdName')}
			/>

			<Button variant="secondary" size="xs" type="submit">
				<Search className="mr-2 h-4 w-4" />
				Filtrar resultados
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
