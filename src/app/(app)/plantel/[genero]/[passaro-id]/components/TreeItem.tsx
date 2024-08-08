import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface TreeItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
	gender?: 'masc' | 'fem'
	label?: string
}

export const TreeItem = ({
	label,
	gender = 'masc',
	className,
	...rest
}: TreeItemProps) => {
	return (
		<div
			data-gender={gender}
			className={cn(
				'flex h-8 w-48 items-center justify-center rounded-lg border-2 border-black bg-red-500 text-center text-white data-[gender=masc]:bg-blue-500',
				className,
			)}
			{...rest}
		>
			{label || 'Label'}
		</div>
	)
}
