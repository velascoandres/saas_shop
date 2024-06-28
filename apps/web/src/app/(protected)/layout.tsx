'use client'

import { withAuth } from '@/auth/components/with-auth.tsx'
import type React from 'react'

const Layout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto">
			<div className="md:pl-[200px] w-full">{children}</div>
		</div>
	)
}

export default withAuth(Layout)
