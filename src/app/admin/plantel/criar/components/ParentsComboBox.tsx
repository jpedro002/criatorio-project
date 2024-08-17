'use client'

import { useState, SetStateAction, Dispatch, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
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
import { useFormContext } from 'react-hook-form'
import { CombinedTypes } from '@/app/admin/schema'

import { api } from '@/services/api'

// Sample data for father and mother

const fathers = [
	{
		id: 1,
		name: 'joão pedro teste',
		gender: 'm',
	},
	{
		id: 4,
		name: 'filho',
		gender: 'm',
	},
	{
		id: 6,
		name: 'sdkfjasndfsnadj',
		gender: 'm',
	},
	{
		id: 7,
		name: 'joão pedro',
		gender: 'm',
	},
	{
		id: 8,
		name: 'adsfadfasdfasdf',
		gender: 'm',
	},
]

interface dataResponseAvaliableParents {
	name: string
	gender: string
	id: number
}

interface parentsResponse {
	males: dataResponseAvaliableParents[]
	females: dataResponseAvaliableParents[]
}

const useFetchAvaliableParents = async (): Promise<parentsResponse> => {
	try {
		const response = await api('/birds/info')
		const result = await response.json()
		console.log(result.males)
		return result
	} catch (error) {
		console.error('Error fetching parents data:', error)
		return { males: [], females: [] }
	}
}

export function GenealogyCombobox() {
	const [fathersOptions, setFathersOptions] = useState<
		dataResponseAvaliableParents[]
	>([])
	const [mothersOptions, setMotherOptions] = useState<
		dataResponseAvaliableParents[]
	>([])

	const [fatherOpen, setFatherOpen] = useState(false)
	const [motherOpen, setMotherOpen] = useState(false)
	const [selectedFather, setSelectedFather] = useState('')
	const [selectedMother, setSelectedMother] = useState('')
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		useFetchAvaliableParents().then(({ males, females }) => {
			setFathersOptions(males)
			setMotherOptions(females)

			console.log('Fathers:', males)
		})
	}, [])

	useEffect(() => {
		setInputValue('')
	}, [fatherOpen, motherOpen])

	// TODO: set values for the fetch genealogy

	const { setValue } = useFormContext<CombinedTypes>()

	const handleSelect = (
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
		} else {
			console.log('Fetching genealogy for', value)
			if (isFather) {
				setFathersOptions((prev) => [
					...prev,
					{ name: value, gender: value, id: 0 },
				])
				setValue('father', value)
			} else {
				setMotherOptions((prev) => [
					...prev,
					{ name: value, gender: value, id: 0 },
				])
				setValue('mother', value)
			}
		}
	}

	return (
		<>
			{/* Combo box for Father */}
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
								{fathersOptions?.map((father) => (
									<CommandItem
										key={father.name}
										value={father.name}
										onSelect={() =>
											handleSelect(
												setSelectedFather,
												father.name,
												setFatherOpen,
												true,
												true,
											)
										}
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
										onSelect={() =>
											handleSelect(
												setSelectedFather,
												inputValue,
												setFatherOpen,
												false,
												true,
											)
										}
									>
										Adicionar "{inputValue}"
									</CommandItem>
								)}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Combo box for Mother */}
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
								{mothersOptions?.map((mother) => (
									<CommandItem
										key={mother.name}
										value={mother.name}
										onSelect={() =>
											handleSelect(
												setSelectedMother,
												mother.name,
												setMotherOpen,
												true,
												false,
											)
										}
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
										onSelect={() =>
											handleSelect(
												setSelectedMother,
												inputValue,
												setMotherOpen,
												false,
												false,
											)
										}
									>
										Adicionar "{inputValue}"
									</CommandItem>
								)}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	)
}
