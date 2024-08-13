import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		APP_URL: z.string().url(),
		AUTH_SECRET: z.string(),
		DATABASE_URL: z.string().min(5),
	},

	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
	},

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
	},
})
