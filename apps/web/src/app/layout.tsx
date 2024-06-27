'use client';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import { AuthProvider } from '@/app/auth/providers/auth-provider.tsx';
import { ClerkProvider } from '@clerk/nextjs';
import type React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<ClerkProvider>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<body className={inter.className}>{children}</body>
					</AuthProvider>
				</QueryClientProvider>
			</ClerkProvider>
		</html>
	);
}
