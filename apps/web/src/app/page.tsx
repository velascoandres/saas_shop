'use client'

import { useFindUserProfileQuery } from '@/auth/hooks/queries.ts'
import { SignIn, useAuth } from '@clerk/nextjs'
import { Button } from '@repo/ui'
import { useRouter } from 'next/navigation'

export default function Page() {
	const router = useRouter()
	const { data } = useFindUserProfileQuery()
	const { signOut } = useAuth()

	return (
		<main className="flex flex-col items-center justify-between min-h-screen w-full p-24">
			<div className="container p-4 flex flex-col items-center justify-center gap-4">
				<h1 className="text-pretty text-2xl font-semibold">
					Welcome to pocket shop admin
				</h1>

				<pre>{JSON.stringify(data, null, 2)}</pre>

				{data ? (
					<div className="flex flex-col justify-center items-center w-full gap-2">
						<Button variant="outline" onClick={() => router.push('/business')}>
							Continue
						</Button>
						<Button variant="link" onClick={() => signOut()}>
							Logout
						</Button>
					</div>
				) : (
					<SignIn />
				)}
			</div>
		</main>
	)
}
