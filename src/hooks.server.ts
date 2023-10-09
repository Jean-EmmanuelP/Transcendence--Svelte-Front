import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
const unProtectedRoutes = ['/', '/register'];


export const handle: Handle = async ({ event, resolve }) => {
	const access_token = event.cookies.get('access_token');
	console.log("Hook", event.url.pathname);
	if (!access_token && !unProtectedRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/');
	}
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	const query = event.url.searchParams.get('signout');
	if (Boolean(query) == true) {
		event.cookies.delete('access_token', { path: '/' });
	}
	const response = await resolve(event);
	return response;
};
