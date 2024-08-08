import './globals.css'

import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster/toaster'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: 'Criatório',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt">
			<body className={(poppins.className, inter.variable)}>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
