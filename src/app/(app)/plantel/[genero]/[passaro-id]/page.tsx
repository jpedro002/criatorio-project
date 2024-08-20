import { fetchGenealogy } from '@/services/genealogy'

import { TreeItem } from './components/TreeItem'
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { BackButton } from './components/BackButton'

export interface TreeNodeProps {
	label: string
	gender: 'masc' | 'fem'
	children?: TreeNodeProps[]
}

const page = async ({ params }: { params: { 'passaro-id': string } }) => {
	const { bird, genealogy, message } = await fetchGenealogy(
		params['passaro-id'],
	)

	const formatDate = (birth: Date) =>
		new Date(birth).toISOString().split('T')[0].split('-').reverse().join('/')

	if (message) {
		return <h1>{message}</h1>
	}

	return (
		<main className=" flex flex-col overflow-x-scroll px-4 pb-10 pt-5">
			<div className=" mb-6">
				<BackButton />
			</div>
			<section className="mx-auto mb-20 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
					Detalhes do Pássaro
				</h2>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h3 className="w-1/3 font-semibold text-gray-600">Anel:</h3>
						<p className="text-gray-800">{bird.ring}</p>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="w-1/3 font-semibold text-gray-600">Nome:</h3>
						<p className="text-gray-800">{bird.name}</p>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="w-1/3 font-semibold text-gray-600">Gênero:</h3>
						<div
							className={`text-xl font-medium ${bird.gender === 'm' ? 'text-blue-500' : bird.gender === 'f' ? 'text-pink-500' : 'text-gray-500'}`}
						>
							{bird.gender === 'm' ? 'Masculino' : 'Feminino'}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="w-1/3 font-semibold text-gray-600">Pai:</h3>
						<p className="text-gray-800">{bird.father || 'Desconhecido'}</p>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="w-1/3 font-semibold text-gray-600">Mãe:</h3>
						<p className="text-gray-800">{bird.mother || 'Desconhecido'}</p>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="w-fit font-semibold text-gray-600">
							Data de Nascimento:
						</h3>
						<p className="text-gray-800">{formatDate(bird.birth)}</p>
					</div>
				</div>
			</section>

			<h2 className="text-center text-[2.12500rem] font-semibold">
				ÁRVORE GENEALÓGICA
			</h2>
			<div className="mx-auto w-fit rounded-xl bg-[#d7443b] px-9 py-1 " />
			<ul className="mx-auto mt-5 grid w-full min-w-[1025px] max-w-[1025px] grid-cols-5 place-items-center">
				<li></li>
				<li>
					<h3>Pais</h3>
				</li>
				<li>
					<h3>Avós</h3>
				</li>
				<li>
					<h3>Bisavós</h3>
				</li>
				<li>
					<h3>Tataravós</h3>
				</li>
			</ul>

			<section className="mx-auto mt-4 grid h-full w-full min-w-[1025px] max-w-[1025px] grid-cols-5 grid-rows-2 place-items-center lg2:overflow-x-hidden">
				<div className="row-span-2">
					<TreeItem
						label={bird.name}
						gender={bird.gender === 'm' ? 'masc' : 'fem'}
						className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[318px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
					/>
				</div>
				<div className="col-span-4 row-span-1 grid h-full w-full grid-cols-4 place-items-center py-4">
					<TreeItem
						label={bird.father || 'Pai'}
						gender="masc"
						className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[144px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
					/>
					<div className="flex h-full flex-col">
						<div className="flex h-full items-center">
							<TreeItem
								label={genealogy.paternalGrandfather || 'Avô Materno'}
								gender="masc"
								className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[74px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
							/>
						</div>
						<div className="flex h-full items-center">
							<TreeItem
								label={genealogy.paternalGrandmother || 'Avó Paterna'}
								gender="fem"
								className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[74px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
							/>
						</div>
					</div>
					<div className="flex h-full flex-col justify-around">
						<TreeItem
							label={genealogy.paternalGreatGrandfather1 || 'Bisavô Paterno 1'}
							gender="masc"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
						<TreeItem
							label={genealogy.paternalGreatGrandmother1 || 'Bisavó Paterna 1'}
							gender="fem"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
						<TreeItem
							label={genealogy.paternalGreatGrandfather2 || 'Bisavô Paterno 2'}
							gender="masc"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
						<TreeItem
							label={genealogy.paternalGreatGrandmother2 || 'Bisavó Paterna 2'}
							gender="fem"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandfather1 || 'Tataravô Paterno 1'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandmother1 || 'Tataravó Paterna 1'
							}
							gender="fem"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandfather2 || 'Tataravô Paterno 2'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandmother2 || 'Tataravó Paterna 2'
							}
							gender="fem"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandfather3 || 'Tataravô Paterno 3'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandmother3 || 'Tataravó Paterna 3'
							}
							gender="fem"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandfather4 || 'Tataravô Paterno 4'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.paternalGreatGreatGrandmother4 || 'Tataravó Paterna 4'
							}
							gender="fem"
						/>
					</div>
				</div>
				<div className="col-span-4 row-span-1 grid h-full w-full grid-cols-4 place-items-center py-4">
					<TreeItem
						label={bird.mother || 'Mãe'}
						gender="fem"
						className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[144px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
					/>
					<div className="flex h-full flex-col">
						<div className="flex h-full items-center">
							<TreeItem
								label={genealogy.maternalGrandfather || 'Avô Materno'}
								gender="masc"
								className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[74px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
							/>
						</div>
						<div className="flex h-full items-center">
							<TreeItem
								label={genealogy.maternalGrandmother || 'Avó Materna'}
								gender="fem"
								className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[74px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
							/>
						</div>
					</div>
					<div className="flex h-full flex-col justify-around">
						<TreeItem
							label={genealogy.maternalGreatGrandfather1 || 'Bisavô Materno 1'}
							gender="masc"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
						<TreeItem
							label={genealogy.maternalGreatGrandmother1 || 'Bisavó Materna 1'}
							gender="fem"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
						<TreeItem
							label={genealogy.maternalGreatGrandfather2 || 'Bisavô Materno 2'}
							gender="masc"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
						<TreeItem
							label={genealogy.maternalGreatGrandmother2 || 'Bisavó Materna 2'}
							gender="fem"
							className="relative after:absolute after:-right-[49px] after:top-1/2 after:-z-10 after:h-[38px] after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:rounded-r-none after:border-2 after:border-r-0 after:border-black after:content-['']"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandfather1 || 'Tataravô Materno 1'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandmother1 || 'Tataravó Materna 1'
							}
							gender="fem"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandfather2 || 'Tataravô Materno 2'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandmother2 || 'Tataravó Materna 2'
							}
							gender="fem"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandfather3 || 'Tataravô Materno 3'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandmother3 || 'Tataravó Materna 3'
							}
							gender="fem"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandfather4 || 'Tataravô Materno 4'
							}
							gender="masc"
						/>
						<TreeItem
							label={
								genealogy.maternalGreatGreatGrandmother4 || 'Tataravó Materna 4'
							}
							gender="fem"
						/>
					</div>
				</div>
			</section>
		</main>
	)
}

export default page
