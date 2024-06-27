import type React from 'react';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="h-screen w-full flex flex-col px-4 py-8">{children}</main>
	);
}
