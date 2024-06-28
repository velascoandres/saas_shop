export const ENVS = {
	API_HOST:
		(process.env.NEXT_PUBLIC_API_HOST as string) || 'http://localhost:8080',
	CLERK_JWT_TEMPLATE: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE as string,
}
