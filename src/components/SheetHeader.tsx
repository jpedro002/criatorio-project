'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader as SheetHeaderPrimitive,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

import { ROUTES } from './MainHeader'
import { DropDownNavigate, NavLink } from './navigation'

export const SheetHeader = ({
	isAdminSheet,
	children,
}: {
	isAdminSheet?: boolean
	children?: React.ReactNode
}) => {
	const [open, setOpen] = useState(false)

	const handleChangeOpen = () => {
		setOpen((prev) => !prev)
	}

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<SheetTrigger asChild>
				<Button variant="ghost" className="group">
					<Menu className=" text-white group-hover:text-black group-hover:transition-colors " />

					<span className="sr-only">Open</span>
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'} className="w-4/5">
				<SheetHeaderPrimitive>
					<SheetTitle>Páginas</SheetTitle>
				</SheetHeaderPrimitive>
				<nav className="flex flex-col gap-2">
					{isAdminSheet
						? children
						: ROUTES.map(({ href, label }) => {
								if (label === '')
									return (
										<DropDownNavigate
											ButtonTriggerClasName="text-black flex items-center p-2 text-base font-semibold hover:text-slate-400 "
											key={href}
											onClickLink={() => handleChangeOpen()}
										/>
									)

								return (
									<NavLink
										key={href}
										href={href}
										className="text-black"
										onClick={() => handleChangeOpen()}
									>
										{label}
									</NavLink>
								)
							})}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
