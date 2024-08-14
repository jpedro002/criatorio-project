import Link from 'next/link'
import { ReactNode } from 'react'

import { NavLink } from '@/components/navigation'
import { SheetHeader } from '@/components/SheetHeader'

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-full min-h-screen flex-col  md:flex-row">
			<header className="flex items-center justify-between bg-gray-900 px-4 py-2 text-white md:hidden ">
				<SheetHeader isAdminSheet>
					<NavLink href={'/admin/plantel'} className="pl-6 text-lg text-black">
						Plantel
					</NavLink>
				</SheetHeader>
				<h1 className="mx-auto text-2xl font-bold">Criatório</h1>
			</header>

			<div className="hidden w-64 flex-col bg-gray-900 p-6 text-white md:flex">
				<div className="mb-6 flex items-center">
					<h1 className="p-2 text-2xl font-bold">Criatório</h1>
				</div>
				<nav className="flex-1 space-y-4">
					<Link
						href="/admin/plantel"
						className="flex items-center space-x-3 rounded-md p-2 hover:bg-gray-800"
						prefetch={false}
					>
						<span>Plantel</span>
					</Link>
				</nav>
			</div>

			{children}
		</div>
	)
}
