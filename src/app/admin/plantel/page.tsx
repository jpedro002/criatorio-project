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
import { getBirds } from '@/server-actions/crudTree'

const page = async () => {
	const birds = await getBirds()

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
					{birds.map((bird) => (
						<TableRow key={bird.id}>
							<TableCell className=" font-medium">{bird.ring}</TableCell>
							<TableCell>{bird.name}</TableCell>
							<TableCell>{bird.father}</TableCell>
							<TableCell className="">{bird.mother}</TableCell>
							<TableCell className="">
								<Button variant="ghost" className="size-10 p-2" asChild>
									<Link href={'/admin/plantel/' + bird.id}>
										<Pencil size={18} />
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default page
