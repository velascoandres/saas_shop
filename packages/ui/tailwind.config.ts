import sharedConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
	content: ['./src/**/*.tsx'],
	prefix: 'ui-',
	presets: [sharedConfig],
};

export default config;
