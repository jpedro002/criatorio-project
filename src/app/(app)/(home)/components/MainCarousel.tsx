'use client'

import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import Image from 'next/image'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'

export const MainCarousel = () => {
	const IMAGES_PATH = ['/curio_17.jpg', '/curio_37.jpg', '/curio_58.jpg']

	return (
		<section>
			<Carousel
				opts={{
					loop: true,
				}}
				plugins={[
					Autoplay({
						delay: 3000,
					}),
					Fade({}),
				]}
			>
				<CarouselContent className=" h-[10rem] bg-black sm:h-[14rem] md:h-[22rem]">
					{IMAGES_PATH.map((path, index) => (
						<CarouselItem key={index} className=" h-full w-full bg-slate-800">
							<Image src={path} alt="" fill quality={100} />
							<p>{index}</p>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
	)
}
