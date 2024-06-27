'use client';

import { useAuth } from '@/auth/providers/auth-provider';

export default function Page(): JSX.Element {
	const { user } = useAuth();

	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
				Email: {user?.email}
			</div>
		</main>
	);
}
