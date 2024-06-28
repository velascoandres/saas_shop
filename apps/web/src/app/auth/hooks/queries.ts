import { ENVS } from '@/config/envs'
import type { User } from '@repo/shared-const-types'
import { useQuery } from 'react-query'
import useAuthFetch from './use-auth-fetch'

export const useFindUserProfileQuery = () => {
	const fetch = useAuthFetch()

	return useQuery<User>(['profile'], () =>
		fetch(`${ENVS.API_HOST}/api/auth/profile`),
	)
}
