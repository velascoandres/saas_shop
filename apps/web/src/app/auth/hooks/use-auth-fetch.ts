import { useAuth } from '@clerk/nextjs'

export default function useAuthFetch() {
	const { getToken } = useAuth()

	const authenticatedFetch = async (
		input: string | URL | globalThis.Request,
	) => {
		return fetch(input, {
			headers: { Authorization: `Bearer ${await getToken()}` },
		}).then((res) => res.json())
	}
	return authenticatedFetch
}
