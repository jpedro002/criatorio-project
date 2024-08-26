'use client'

import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function Pagination({ totalPages }: { totalPages: number }) {
	const searchParams = useSearchParams()

	const crrPage = parseInt(searchParams.get('page') || '1')

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams],
	)

	return (
		<PaginationComponent>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={
							'?' +
							createQueryString(
								'page',
								(crrPage >= 2 ? crrPage - 1 : 1).toString(),
							)
						}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href={`?` + createQueryString('page', '1')}>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href={`?` + createQueryString('page', '2')}>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href={`?` + createQueryString('page', '3')}>
						3
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						href={`?` + createQueryString('page', totalPages.toString())}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href={
							'?' +
							createQueryString(
								'page',
								(crrPage < totalPages ? crrPage + 1 : totalPages).toString(),
							)
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationComponent>
	)
}
