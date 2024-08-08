import { db } from '@/lib/prisma'

async function createTransaction() {
	try {
		const newTransaction = await db.admin.create({
			data: {
				email: 'admin123',
				password: 'admin123',
			},
		})
		console.log(newTransaction)
	} catch (error) {
		console.error(error)
	}
}

createTransaction()

// TODO USE JWT TO CREATE ADMIN
