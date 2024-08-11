import { LoginForm } from './components/LoginForm'

const page = () => {
	return (
		<main
			className="grid min-h-screen w-full grid-cols-1
    grid-rows-1 place-items-center bg-gray-100
    "
		>
			<LoginForm />
		</main>
	)
}

export default page
