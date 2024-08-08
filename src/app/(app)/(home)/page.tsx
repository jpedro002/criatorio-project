import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { MainCarousel } from './components/MainCarousel'

export const dynamic = 'force-static'

// TODO: refact this shit

const HomePage = () => {
	return (
		<div className="flex flex-col pb-10">
			<MainCarousel />
			<section className="flex h-full w-full flex-col items-center gap-8 px-4 pt-10 xl:flex-row xl:items-start ">
				<Image
					src={'/criatorio-compleite-hero.jpg'}
					alt="abc"
					width={600}
					height={400}
					className=" w-full max-w-[800px]"
				/>
				<div>
					<h1 className=" xs:text-[1.875rem] my-3 text-2xl text-[1.625rem] font-medium sm:text-[2.125rem] md:text-[2.25rem]">
						O Criatório
					</h1>

					<p className="xs:text-[0.875rem] text-[1.0625rem] font-normal leading-[1.75] text-gray-500 sm:text-[1rem]">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
						doloribus facere laboriosam qui nam id sunt, ipsam expedita cumque
						consequatur blanditiis est ex aperiam molestiae accusamus suscipit?
						Ratione, neque incidunt? Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Soluta doloribus facere laboriosam qui nam id
						sunt, ipsam expedita cumque consequatur blanditiis est ex aperiam
						molestiae accusamus suscipit? Ratione, neque incidunt?
					</p>

					<Button
						className="mt-4 inline-block rounded-full border-2 border-red-600 bg-red-600 px-9 py-2.5 text-sm font-bold text-white transition-all duration-300 ease-out hover:bg-white hover:text-red-600"
						asChild
					>
						<Link href="/criatorio">Saiba mais</Link>
					</Button>
				</div>
			</section>
		</div>
	)
}

export default HomePage
