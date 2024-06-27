import { API_HOST } from '@/consts/api.ts';
import type { User } from '@repo/shared-const-types';

async function findUserProfile(token: string): Promise<User> {
	const response = await fetch(`${API_HOST}/api/auth/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.json();
}

export default findUserProfile;
