'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

import { combinedSchema, CombinedTypes } from '../../schema'
import { useCreateFullBird } from '@/services/birds'
import { useRouter } from 'next/navigation'

// TODO remove use client from the top of the file and componeting the useForm

const page = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CombinedTypes>({
		resolver: zodResolver(combinedSchema),
		defaultValues: {
			visible: true,
			name: '',
		},
	})

	const router = useRouter()

	const onSubmit = async (data: CombinedTypes) => {
		const { redirect, success } = await useCreateFullBird({
			...data,
			name: data.child,
		} as any)

		if (redirect && success) {
			router.replace('/admin/plantel')
		}
	}

	return (
		<div className="mx-auto w-full max-w-[80%] space-y-8 py-20  md:px-10 xl:max-w-4xl ">
			<form
				className=" sm: sm:grid-cols-2s flex flex-col gap-4 rounded-lg border  p-4 sm:grid"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="col-span-2 mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="ring">
						Anilha:
					</Label>
					<Input id="ring" {...register('ring')} />
					{errors.ring && (
						<span className="my-2 text-red-500">{errors.ring.message}</span>
					)}
				</div>

				<div className="col-span-2 mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="gender">
						Gênero:
					</Label>
					<div className="flex items-center">
						<Label className="mr-4 flex items-center">
							<Input
								type="radio"
								id="masculino"
								value="m"
								{...register('gender')}
								className="mr-2"
							/>
							Masculino
						</Label>
						<Label className="flex items-center">
							<Input
								type="radio"
								id="feminino"
								value="f"
								{...register('gender')}
								className="mr-2"
							/>
							Feminino
						</Label>
					</div>
					{errors.gender && (
						<span className="my-2 text-red-500">{errors.gender.message}</span>
					)}
				</div>

				<div className="group relative col-span-2 mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="birth">
						Data de Nascimento:
					</Label>
					<Input
						type="date"
						id="birth"
						{...register('birth', {
							valueAsDate: true,
						})}
						className="w-fit"
						placeholder="dd/mm/yyyy"
					/>
					{errors.birth && (
						<span className="my-2 text-red-500">{errors.birth.message}</span>
					)}
					<span className="absolute -bottom-[60%] z-50 hidden rounded-lg bg-gray-200 px-2 py-1 group-hover:block">
						coloque no formato mês/dia/ano
					</span>
				</div>

				<div className="col-span-2 mb-8 flex items-center gap-3">
					<Label htmlFor="visible">Visível:</Label>

					<Controller
						name="visible"
						control={control}
						render={({ field }) => (
							<Switch
								id="visible"
								onCheckedChange={field.onChange}
								checked={field.value}
								defaultChecked
							/>
						)}
					/>
				</div>
				<div className="col-span-2 mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="child">
						Nome do Filho:
					</Label>
					<Input id="child" {...register('child')} />
					{errors.child && (
						<span className="my-2 text-red-500">{errors.child.message}</span>
					)}
				</div>

				<div className="mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="father">
						Nome do Pai:
					</Label>
					<Input id="father" {...register('father')} />
					{errors.father && (
						<span className="my-2 text-red-500">{errors.father.message}</span>
					)}
				</div>

				<div className="mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="mother">
						Nome da Mãe:
					</Label>
					<Input id="mother" {...register('mother')} />
					{errors.mother && (
						<span className="my-2 text-red-500">{errors.mother.message}</span>
					)}
				</div>

				<h3 className="col-span-2 text-xl font-semibold">Avós Paternos</h3>
				<div className="mb-8 flex flex-col">
					<Label className="mb-3" htmlFor="paternalGrandfather">
						Avô Paterno:
					</Label>
					<Input
						id="paternalGrandfather"
						{...register('paternalGrandfather')}
					/>
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
					<Input
						id="paternalGrandmother"
						{...register('paternalGrandmother')}
					/>
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
					<Input
						id="maternalGrandfather"
						{...register('maternalGrandfather')}
					/>
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
					<Input
						id="maternalGrandmother"
						{...register('maternalGrandmother')}
					/>
					{errors.maternalGrandmother && (
						<span className="my-2 text-red-500">
							{errors.maternalGrandmother.message}
						</span>
					)}
				</div>

				<h3 className="col-span-2 text-xl font-semibold">Bisavós Paternos</h3>
				{[1, 2].map((index) => (
					<div key={index} className="mb-8 flex flex-col">
						<Label
							className="mb-3"
							htmlFor={`paternalGreatGrandfather${index}`}
						>
							Bisavô Paterno {index}:
						</Label>
						<Input
							id={`paternalGreatGrandfather${index}`}
							{...register(`paternalGreatGrandfather${index}` as any)}
						/>

						<Label
							className="mb-3"
							htmlFor={`paternalGreatGrandmother${index}`}
						>
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
						<Label
							className="mb-3"
							htmlFor={`maternalGreatGrandfather${index}`}
						>
							Bisavô Materno {index}:
						</Label>
						<Input
							id={`maternalGreatGrandfather${index}`}
							{...register(`maternalGreatGrandfather${index}` as any)}
						/>

						<Label
							className="mb-3"
							htmlFor={`maternalGreatGrandmother${index}`}
						>
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
		</div>
	)
}

export default page
