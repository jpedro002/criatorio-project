'use client'

import { motion } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ButtonHTMLAttributes, ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'

export interface NavLinkProps extends LinkProps {
	children?: ReactNode
	className?: string
}

export function NavLink({ children, className, ...props }: NavLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			data-current={pathname === props.href}
			className={cn(
				'flex items-center p-2 text-base font-semibold text-white underline-offset-8 hover:text-slate-400 data-[current=true]:underline ',
				className,
			)}
			{...props}
		>
			{children}
		</Link>
	)
}

// TODO: refactor this workaround

interface DropDownNavigateProps {
	ButtonTriggerClasName?: string
	onClickLink?: () => void
}

export const DropDownNavigate = ({
	ButtonTriggerClasName,
	onClickLink,
}: DropDownNavigateProps) => {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	return (
		<div
			className="relative"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				data-current={pathname.split('/').includes('plantel')}
				className={cn(
					'p-4 text-base font-semibold text-white underline-offset-8 data-[current=true]:underline',
					ButtonTriggerClasName,
				)}
			>
				Plantel
			</button>
			{open && (
				<motion.div
					className="absolute left-0 top-10 z-50 rounded-sm bg-white p-2 shadow-lg"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex w-40 flex-col gap-2">
						<Link
							onClick={onClickLink}
							href="/plantel/machos"
							className="rounded p-2 text-black hover:bg-gray-100"
						>
							Machos
						</Link>
						<Link
							onClick={onClickLink}
							href="/plantel/femeas"
							className="rounded p-2 text-black hover:bg-gray-100"
						>
							Fêmeas
						</Link>
					</div>
				</motion.div>
			)}
		</div>
	)
}
