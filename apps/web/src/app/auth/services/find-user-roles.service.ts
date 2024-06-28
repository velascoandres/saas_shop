import { ENVS } from '@/config/envs'
import type { User } from '@repo/shared-const-types'

async function findUserProfile(token: string): Promise<User> {
	const response = await fetch(`${ENVS.API_HOST}/api/auth/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return response.json()
}

export default findUserProfile
