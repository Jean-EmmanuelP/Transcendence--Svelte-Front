import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
const unProtectedRoutes = ['/', '/register'];


export const handle: Handle = async ({ event, resolve }) => {
	const access_token = event.cookies.get('access_token');
	console.log("Hook", event.url.pathname);
	if (!access_token && !unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/');
	else if (access_token && unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/home');
	else
	{
		if (event.url.pathname === '/signout') {
			event.cookies.delete('access_token', { path: '/' });
		}
		const response = await resolve(event);
		return response;
	}
};
