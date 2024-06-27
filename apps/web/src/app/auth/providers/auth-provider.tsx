'use client';

import findUserProfile from '@/app/auth/api/find-user-roles.service.ts';
import { useAuth as useClerkAuth } from '@clerk/nextjs';
import type { User } from '@repo/shared-const-types';
import React from 'react';
import { useQuery } from 'react-query';

interface AuthContext {
	user?: User;
	token?: string;

	logout(): void;
}

export const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { getToken, signOut, userId } = useClerkAuth();
	const [token, setToken] = React.useState<string | undefined>(undefined);

	const query = useQuery(
		['profile', token],
		() => findUserProfile(token as string),
		{
			enabled: !!token,
		},
	);

	React.useEffect(() => {
		(async () => {
			if (!userId) {
				return;
			}
			const token = await getToken();

			setToken(token ?? undefined);
		})();
	}, [getToken, userId]);

	const logout = React.useCallback(() => signOut(), [signOut]);

	return (
		<AuthContext.Provider value={{ logout, token, user: query.data }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return React.useContext(AuthContext) as AuthContext;
}
