import { Pencil } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { fetchAllBirds } from '@/services/birds'
import { TableLine } from './components/TableLine'

const page = async () => {
	const { birds } = await fetchAllBirds()

	return (
		<div className="flex w-full flex-col gap-8 p-6">
			<header className=" flex w-full items-center justify-end rounded-lg p-4 ">
				<div className="flex items-center">
					<Button className="mr-4" asChild>
						<Link href={'/admin/plantel/criar'}>Criar Árvore</Link>
					</Button>
				</div>
			</header>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[160px] min-w-[160px]">anilha</TableHead>
						<TableHead className="w-1/3">Nome</TableHead>
						<TableHead className="w-1/3">Pai</TableHead>
						<TableHead className="w-1/3">Mãe</TableHead>
						<TableHead className="w-[80px]">Editar</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{birds?.length === 0 && (
						<TableRow>
							<TableCell colSpan={5} className="text-center">
								Nenhum pássaro encontrado
							</TableCell>
						</TableRow>
					)}
					{birds &&
						birds.map((bird: any) => (
							<TableLine
								key={bird.id}
								ring={bird.ring}
								name={bird.name}
								father={bird.father}
								mother={bird.mother}
								id={bird.id}
							/>
						))}
				</TableBody>
			</Table>
		</div>
	)
}

export default page
