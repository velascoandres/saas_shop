import findUserProfile from '@/auth/api/find-user-roles.service.ts';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { ROLES } from '@repo/shared-const-types';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/auth/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
	if (isPublicRoute(request)) {
		return;
	}

	const token = await auth().getToken();

	if (!token) {
		auth().redirectToSignIn();

		return;
	}

	const userProfile = await findUserProfile(token);

	if (userProfile?.roles?.includes(ROLES.SHOP_OWNER)) {
		auth().protect();

		return;
	}

	const setupUrlPath = '/business/setup';

	if (request.url.includes(setupUrlPath)) {
		return;
	}

	return NextResponse.redirect(new URL(setupUrlPath, request.url));
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
