import { redirect } from 'next/navigation'

const notFound = () => {
	return redirect('/')
}
export default notFound
