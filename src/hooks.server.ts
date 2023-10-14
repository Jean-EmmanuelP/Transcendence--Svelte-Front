import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { authentication } from './stores/authentication';
import { userInformation } from './services/gqlUser';

const unProtectedRoutes = ['/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
	const access_token = event.cookies.get('access_token');
	console.log("Hook", event.url.pathname);
	if (!access_token && !unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/login');
	else if (access_token && unProtectedRoutes.includes(event.url.pathname))
		throw redirect(303, '/');
	else
	{
		if (access_token && !unProtectedRoutes.includes(event.url.pathname))
		{
			try {
				const res = await userInformation(access_token ?? "");
				const { id, email, name, pseudo, avatar, isTwoFactorEnabled, status } = res.userInformation;
				event.locals.user = res.userInformation;
				// authentication.setUser({id, email, name, pseudo, avatar, isTwoFactorEnabled, status});
			} catch (e) {
				console.log("EEEEE")
				// event.cookies.delete('access_token');
				// throw redirect(303, '/login');
			}
		}
		if (event.url.pathname === '/signout') {
			event.cookies.delete('access_token', { path: '/' });
		}
		const response = await resolve(event);
		return response;
	}
};
