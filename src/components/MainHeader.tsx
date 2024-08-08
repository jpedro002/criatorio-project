import Link from 'next/link'

import { DropDownNavigate, NavLink } from './navigation'
import { SheetHeader } from './SheetHeader'

// TODO: add sheet component

export const ROUTES = [
	{ href: '/', label: 'Home' },
	{ href: '/criatorio', label: 'O Criatório' },
	{ href: '/noticias', label: 'Notícias' },
	{ href: '/daufhasdfs', label: '' },
	{ href: '/filhotes', label: 'Filhotes' },
	{ href: '/curio', label: 'O Curió' },
	{ href: '/fotos', label: 'Fotos' },
	{ href: '/videos', label: 'Vídeos' },
	{ href: '/contato', label: 'Contato' },
]

export const MainHeader = () => {
	return (
		<header className="flex h-16 w-full items-center justify-between gap-8 bg-black px-4 ">
			{/* mobile screns */}

			<div className="flex w-full items-center justify-between 2md:hidden">
				<SheetHeader />

				<div className="flex gap-2 ">
					<Link href="/" className="size-auto bg-white px-2 py-1">
						{' '}
						@Logo{' '}
					</Link>
					<Link href={'/'}>
						<h2 className="flex h-full	 items-center text-lg font-medium text-white 2md:hidden ">
							{' '}
							Criatório Shablau
						</h2>
					</Link>
				</div>
				<div />
			</div>

			{/* large screns */}
			<div className="hidden w-full justify-between 2md:flex">
				<Link href="/" className="size-auto bg-white">
					{' '}
					@Logo{' '}
				</Link>
				<nav className="mx-auto hidden gap-1 2md:flex lg:gap-2">
					{ROUTES.map(({ href, label }) => {
						if (label === '') return <DropDownNavigate key={href} />

						return (
							<NavLink key={href} href={href}>
								{label}
							</NavLink>
						)
					})}
				</nav>
			</div>
		</header>
	)
}
