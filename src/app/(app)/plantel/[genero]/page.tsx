import { Bird } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchBirdsByGender } from '@/services/birds'

// TODO choice background color for the page bg-slate-300 sugestion

const page = async ({ params: { genero } }: { params: { genero: string } }) => {
	const { birds } = await fetchBirdsByGender(genero as 'machos' | 'femeas')

	const formatDate = (birth: Date) =>
		new Date(birth).toISOString().split('T')[0].split('-').reverse().join('/')

	return (
		<main
			className=" mx-auto  flex h-full  w-full max-w-[1500px] grid-cols-2
			flex-col content-start  justify-center gap-8 p-8  sm:grid
			3md:grid-cols-3 xl:grid-cols-4
		"
		>
			{birds?.length === 0 && (
				<h1 className="col-span-full w-full justify-self-center text-center">
					Nenhum pássaro encontrado
				</h1>
			)}

			{birds?.map((item: any) => (
				<Link href={genero + '/' + item.id} key={item.id}>
					<Card className="relative mx-auto flex h-full max-h-[280px] w-full max-w-[300px] flex-col gap-3 bg-gray-50 shadow-lg">
						<CardHeader className="w-[95%]   ">
							<CardTitle>{item.name}</CardTitle>
						</CardHeader>
						<CardContent className="flex h-full flex-col justify-between gap-2 ">
							<div>
								<ul className="list-disc pl-6 text-gray-500">
									<li>Pai: {item.father}</li>
									<li>Mãe: {item.mother}</li>
									<li>Nascimento: {formatDate(item.birth)}</li>
								</ul>
							</div>
							<Button>ver arvore</Button>
						</CardContent>
						<Bird className="absolute right-[16px] top-[23px]" />
					</Card>
				</Link>
			))}
		</main>
	)
}

export default page
