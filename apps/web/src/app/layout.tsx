'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import '@repo/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

import { ClerkProvider } from '@clerk/nextjs'
import type React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<ClerkProvider>
				<QueryClientProvider client={queryClient}>
					<body className={inter.className}>{children}</body>
				</QueryClientProvider>
			</ClerkProvider>
		</html>
	)
}
