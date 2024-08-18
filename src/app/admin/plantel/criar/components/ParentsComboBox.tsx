'use client'

import { useState, SetStateAction, Dispatch, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useFormContext, Controller } from 'react-hook-form'
import { CombinedTypes } from '@/app/admin/schema'

import { useFillGenealogy } from './useFillGenealogy'
import { parentsResponse, useFetchAvaliableParents } from '@/services/birds'

export function GenealogyCombobox() {
	const [parents, setParents] = useState<parentsResponse>({} as parentsResponse)

	const [fatherOpen, setFatherOpen] = useState(false)
	const [motherOpen, setMotherOpen] = useState(false)

	const [selectedFather, setSelectedFather] = useState('')
	const [selectedMother, setSelectedMother] = useState('')

	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		useFetchAvaliableParents().then((parents) => {
			setParents(parents)
		})
	}, [])

	useEffect(() => {
		setInputValue('')
	}, [fatherOpen, motherOpen])

	const { control } = useFormContext<CombinedTypes>()

	const { fillFatherGenealogy, fillMotherGenealogy } = useFillGenealogy()

	const handleSelect = async (
		setSelectedValue: Dispatch<SetStateAction<string>>,
		value: string,
		setOpen: Dispatch<SetStateAction<boolean>>,
		fetchGenealogy?: boolean,
		isFather: boolean = false,
	) => {
		setSelectedValue(value === selectedFather ? '' : value)
		setOpen(false)

		if (fetchGenealogy) {
			console.log('Fetching genealogy for', value)

			const selectedBird = parents[isFather ? 'males' : 'females'].find(
				({ name }) => name === value,
			)
			if (!selectedBird) return

			const formartedId = selectedBird.id.toString()

			if (isFather) {
				await fillFatherGenealogy({ id: formartedId })
			} else {
				fillMotherGenealogy({ id: formartedId })
			}
		} else {
			if (isFather) {
				setParents((prev) => ({
					females: [...prev.females],
					males: [...prev.males, { name: value, gender: value, id: 0 }],
				}))
			} else {
				setParents((prev) => ({
					females: [...prev.females, { name: value, gender: value, id: 0 }],
					males: [...prev.males],
				}))
			}
		}
	}

	return (
		<>
			{/* Combo box for Father */}
			<div className="mb-8 flex flex-col gap-4">
				<Controller
					name="father"
					control={control}
					render={({ field, fieldState: { error } }) => (
						<Popover open={fatherOpen} onOpenChange={setFatherOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={fatherOpen}
									className="w-full justify-between"
								>
									{selectedFather || 'Selecione o pai...'}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-0" align="start">
								<Command>
									<CommandInput
										placeholder="Procurar pai..."
										value={inputValue}
										onValueChange={setInputValue}
									/>
									<CommandList>
										<CommandGroup>
											{parents.males?.map((father) => (
												<CommandItem
													key={father.name}
													value={father.name}
													onSelect={() => {
														handleSelect(
															setSelectedFather,
															father.name,
															setFatherOpen,
															true,
															true,
														)
														field.onChange(father.name)
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															selectedFather === father.name
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
													{father.name}
												</CommandItem>
											))}
											{inputValue && (
												<CommandItem
													value={inputValue}
													onSelect={() => {
														handleSelect(
															setSelectedFather,
															inputValue,
															setFatherOpen,
															false,
															true,
														)
														field.onChange(inputValue)
													}}
												>
													Adicionar "{inputValue}"
												</CommandItem>
											)}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
							{error && (
								<span className="my-2 text-red-500">
									Nome do pai é obrigatorio
								</span>
							)}
						</Popover>
					)}
				/>
			</div>

			{/* Combo box for Mother */}
			<div className="mb-8 flex flex-col gap-4">
				<Controller
					name="mother"
					control={control}
					render={({ field, fieldState: { error } }) => (
						<Popover open={motherOpen} onOpenChange={setMotherOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={motherOpen}
									className="w-full justify-between"
								>
									{selectedMother || 'Selecione a mãe...'}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-0" align="start">
								<Command>
									<CommandInput
										placeholder="Procurar mãe..."
										value={inputValue}
										onValueChange={setInputValue}
									/>
									<CommandList>
										<CommandGroup>
											{parents.females?.map((mother) => (
												<CommandItem
													key={mother.name}
													value={mother.name}
													onSelect={() => {
														handleSelect(
															setSelectedMother,
															mother.name,
															setMotherOpen,
															true,
															false,
														)
														field.onChange(mother.name)
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															selectedMother === mother.name
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
													{mother.name}
												</CommandItem>
											))}
											{inputValue && (
												<CommandItem
													value={inputValue}
													onSelect={() => {
														handleSelect(
															setSelectedMother,
															inputValue,
															setMotherOpen,
															false,
															false,
														)
														field.onChange(inputValue)
													}}
												>
													Adicionar "{inputValue}"
												</CommandItem>
											)}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
							{error && (
								<span className="my-2 text-red-500">
									Nome da mãe é obrigatorio
								</span>
							)}
						</Popover>
					)}
				/>
			</div>
		</>
	)
}
