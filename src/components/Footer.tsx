import { Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
	return (
		<footer className="bg-gray-800 py-8 text-gray-200">
			{/* <div>
				<Facebook
					className="text-[#b6c7d6] hover:text-[#4267B2]   "
					fill="#b6c7d6"
				/>
				<Instagram />
				<Youtube className="text-[#b6c7d6] hover:text-red-600" />
			</div> */}
			<div className="container mx-auto px-4">
				<div className=" mb-4 text-center">
					&copy; Copyright{' '}
					<strong>
						<span>SHABLAUY</span>
					</strong>{' '}
					{new Date().getFullYear()} Todos os direitos reservados.
				</div>

				<Link
					href="https://portifolio-jpedro002.vercel.app/"
					rel="nofollow"
					target="_blank"
					title="Link para o site da empresa desenvolvedora do website"
					className="text-gray-300 hover:text-gray-100"
				>
					<div className="text-center">
						<span>Desenvolvido Por:</span> Jota
					</div>
				</Link>
			</div>
		</footer>
	)
}
