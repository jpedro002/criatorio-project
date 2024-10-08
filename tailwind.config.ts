import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			screens: {
				'2md': '900px',
				'3md': '940px',
				lg2: '1060px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		function ({
			addUtilities,
		}: {
			addUtilities: (
				utilities: Record<
					string,
					Record<string, string | Record<string, string>>
				>,
			) => void
		}) {
			const newUtilities: Record<
				string,
				Record<string, string | Record<string, string>>
			> = {
				'.flex-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				'.custom-after': {
					position: 'relative',
					border: '1px solid',
					'&::after': {
						content: '""',
						position: 'absolute',
						right: '-49px',
						top: '50%',
						zIndex: '-10',
						height: '38px',
						width: '8px',
						transform: 'translate(-50%, -50%)',
						borderRadius: '0.5rem 0 0 0.5rem',
						borderWidth: '2px 0 2px 2px',
						borderColor: 'black',
					},
				},
			}

			addUtilities(newUtilities)
		},
	],
} satisfies Config

export default config
