import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TableCell, TableRow } from '@/components/ui/table'
import { Ellipsis, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

interface TableLineProps {
	id: number
	ring: string
	name: string
	father: string
	mother: string
}
export const TableLine = ({
	father,
	id,
	mother,
	name,
	ring,
}: TableLineProps) => {
	return (
		<TableRow key={id}>
			<TableCell className=" font-medium">{ring}</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>{father}</TableCell>
			<TableCell className="">{mother}</TableCell>
			<TableCell className="">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" className="size-10 p-2">
							<Ellipsis />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-[200px]">
						<Button
							variant="ghost"
							className="flex w-full justify-between p-2"
							asChild
						>
							<Link href={'/admin/plantel/' + id}>
								<span className="mr-4">Editar</span>
								<Pencil size={18} />
							</Link>
						</Button>
						<Button
							variant="ghost"
							className="flex w-full justify-between p-2 transition-colors duration-300
							hover:text-destructive
							"
						>
							<span className="mr-4">Excluir</span>
							<Trash size={18} />
						</Button>
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	)
}
