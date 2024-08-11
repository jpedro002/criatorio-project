'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'

import { combinedSchema, GenealogyType } from '@/app/admin/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface GenealogyFormProps extends GenealogyType {
	id: number
}

export const FormGenealogy = (defaultValues: GenealogyFormProps) => {
	const { id, ...rest } = defaultValues

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<GenealogyType>({
		resolver: zodResolver(combinedSchema),
		defaultValues: { ...rest },
	})

	console.log(id, 'id')

	const onSubmit = (data: GenealogyType) => {
		console.log(data, 'raw data')
		// TODO:  send data to the server
	}

	return (
		<form
			className="flex flex-col gap-4 rounded-lg border p-4 sm:grid sm:grid-cols-2"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3 className="col-span-2 text-xl font-semibold">Avós Paternos</h3>
			<div className="mb-8 flex flex-col">
				<Label className="mb-3" htmlFor="paternalGrandfather">
					Avô Paterno:
				</Label>
				<Input id="paternalGrandfather" {...register('paternalGrandfather')} />
				{errors.paternalGrandfather && (
					<span className="my-2 text-red-500">
						{errors.paternalGrandfather.message}
					</span>
				)}
			</div>
			<div className="mb-8 flex flex-col">
				<Label className="mb-3" htmlFor="paternalGrandmother">
					Avó Paterna:
				</Label>
				<Input id="paternalGrandmother" {...register('paternalGrandmother')} />
				{errors.paternalGrandmother && (
					<span className="my-2 text-red-500">
						{errors.paternalGrandmother.message}
					</span>
				)}
			</div>

			<h3 className="col-span-2 text-xl font-semibold">Avós Maternos</h3>
			<div className="mb-8 flex flex-col">
				<Label className="mb-3" htmlFor="maternalGrandfather">
					Avô Materno:
				</Label>
				<Input id="maternalGrandfather" {...register('maternalGrandfather')} />
				{errors.maternalGrandfather && (
					<span className="my-2 text-red-500">
						{errors.maternalGrandfather.message}
					</span>
				)}
			</div>
			<div className="mb-8 flex flex-col">
				<Label className="mb-3" htmlFor="maternalGrandmother">
					Avó Materna:
				</Label>
				<Input id="maternalGrandmother" {...register('maternalGrandmother')} />
				{errors.maternalGrandmother && (
					<span className="my-2 text-red-500">
						{errors.maternalGrandmother.message}
					</span>
				)}
			</div>

			<h3 className="col-span-2 text-xl font-semibold">Bisavós Paternos</h3>
			{[1, 2].map((index) => (
				<div key={index} className="mb-8 flex flex-col">
					<Label className="mb-3" htmlFor={`paternalGreatGrandfather${index}`}>
						Bisavô Paterno {index}:
					</Label>
					<Input
						id={`paternalGreatGrandfather${index}`}
						{...register(`paternalGreatGrandfather${index}` as any)}
					/>

					<Label className="mb-3" htmlFor={`paternalGreatGrandmother${index}`}>
						Bisavó Paterna {index}:
					</Label>
					<Input
						id={`paternalGreatGrandmother${index}`}
						{...register(`paternalGreatGrandmother${index}` as any)}
					/>
				</div>
			))}

			<h3 className="col-span-2 text-xl font-semibold">Bisavós Maternos</h3>
			{[1, 2].map((index) => (
				<div key={index} className="mb-8 flex flex-col">
					<Label className="mb-3" htmlFor={`maternalGreatGrandfather${index}`}>
						Bisavô Materno {index}:
					</Label>
					<Input
						id={`maternalGreatGrandfather${index}`}
						{...register(`maternalGreatGrandfather${index}` as any)}
					/>

					<Label className="mb-3" htmlFor={`maternalGreatGrandmother${index}`}>
						Bisavó Materna {index}:
					</Label>
					<Input
						id={`maternalGreatGrandmother${index}`}
						{...register(`maternalGreatGrandmother${index}` as any)}
					/>
				</div>
			))}

			<h3 className="col-span-2 text-xl font-semibold">Tataravós Paternos</h3>
			{[1, 2, 3, 4].map((index) => (
				<div key={index} className="mb-8 flex flex-col">
					<Label
						className="mb-3"
						htmlFor={`paternalGreatGreatGrandfather${index}`}
					>
						Tataravô Paterno {index}:
					</Label>
					<Input
						id={`paternalGreatGreatGrandfather${index}`}
						{...register(`paternalGreatGreatGrandfather${index}` as any)}
					/>

					<Label
						className="mb-3"
						htmlFor={`paternalGreatGreatGrandmother${index}`}
					>
						Tataravó Paterna {index}:
					</Label>
					<Input
						id={`paternalGreatGreatGrandmother${index}`}
						{...register(`paternalGreatGreatGrandmother${index}` as any)}
					/>
				</div>
			))}

			<h3 className="col-span-2 text-xl font-semibold">Tataravós Maternos</h3>
			{[1, 2, 3, 4].map((index) => (
				<div key={index} className="mb-8 flex flex-col">
					<Label
						className="mb-3"
						htmlFor={`maternalGreatGreatGrandfather${index}`}
					>
						Tataravô Materno {index}:
					</Label>
					<Input
						id={`maternalGreatGreatGrandfather${index}`}
						{...register(`maternalGreatGreatGrandfather${index}` as any)}
					/>

					<Label
						className="mb-3"
						htmlFor={`maternalGreatGreatGrandmother${index}`}
					>
						Tataravó Materna {index}:
					</Label>
					<Input
						id={`maternalGreatGreatGrandmother${index}`}
						{...register(`maternalGreatGreatGrandmother${index}` as any)}
					/>
				</div>
			))}

			<Button type="submit" className="col-span-2">
				Enviar
			</Button>
		</form>
	)
}
