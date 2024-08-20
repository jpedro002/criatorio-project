'use client'

import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const BackButton = () => {
	const router = useRouter()

	const handleClickBack = () => {
		router.back()
	}

	return (
		<Button
			variant="ghost"
			className="size-14 rounded-full"
			onClick={handleClickBack}
		>
			<Undo2 />
		</Button>
	)
}
