'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { InputsTypes, schema } from '@/app/admin/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { updateBird } from '@/services/birds'
import { Prisma } from '@prisma/client'

export interface FormEditBirdProps extends Prisma.BirdGetPayload<{}> {
	birdID: string
}

export const FormEditBird = (FormEditBirdProps: FormEditBirdProps) => {
	const { birdID, birth, ...rest } = FormEditBirdProps

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsTypes>({
		resolver: zodResolver(schema),
		defaultValues: {
			birth: new Date(birth).toISOString().split('T')[0] as any,
			...rest,
		},
	})

	const onSubmit = (data: InputsTypes) => {
		const dataAndId = { id: birdID, ...data }

		updateBird(dataAndId as any)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 rounded-lg border p-4"
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
				<Label className="mb-3" htmlFor="name">
					Nome:
				</Label>
				<Input id="name" {...register('name')} />
				{errors.name && (
					<span className="my-2 text-red-500">{errors.name.message}</span>
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

			<div className="group relative col-span-1 mb-8 flex flex-col">
				<Label className="mb-3" htmlFor="birth">
					Data de Nascimento:
				</Label>
				<Input
					type="date"
					id="birth"
					{...register('birth')}
					className="w-fit"
					placeholder="dd/mm/yyyy"
				/>
				{errors.birth && (
					<span className="my-2 text-red-500">{errors.birth.message}</span>
				)}
				<span className="absolute -bottom-[52%] z-50 hidden rounded-lg bg-gray-200 px-2 py-1 group-hover:block">
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

			<Button type="submit" className="btn btn-primary">
				Salvar
			</Button>
		</form>
	)
}
