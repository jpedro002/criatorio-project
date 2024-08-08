import { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { MainHeader } from '@/components/MainHeader'

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className="grid min-h-screen w-full grid-cols-1
    grid-rows-[min-content_1fr_min-content]
    "
		>
			<MainHeader />
			{children}
			<Footer />
		</div>
	)
}

export default layout
