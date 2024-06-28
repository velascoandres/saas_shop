'use client'

import { LoadingPage } from '@/shared/components/loading-page.tsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFindUserProfileQuery } from '../hooks/queries'

type PageProps = {
	children: React.ReactNode
}

type PageComponent = (props: PageProps) => React.ReactNode

export const withAuth = (Page: PageComponent) => {
	return ({ children }: PageProps) => {
		const { data, isError, isLoading } = useFindUserProfileQuery()
		const [isAllowed, setIsAllowed] = React.useState(false)
		const router = useRouter()

		React.useEffect(() => {
			if (isLoading && !data) {
				setIsAllowed(false)

				return
			}

			setIsAllowed(true)
		}, [isLoading, data])

		React.useEffect(() => {
			if (isError) {
				void router.push('/')
			}
		}, [isError, router])

		if (!isAllowed) {
			return <LoadingPage />
		}

		return <Page>{children}</Page>
	}
}
