// tailwind config is required for editor support

import sharedConfig from '@repo/ui/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets'> = {
	content: ['./src/app/**/*.tsx', '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}'],
	presets: [sharedConfig],
}

export default config
