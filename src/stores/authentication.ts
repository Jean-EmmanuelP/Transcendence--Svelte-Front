import { writable } from 'svelte/store';

type AuthenticationType = {
	message: string;
	user: {
		id: string;
		email: string;
		password: string | null;
		name: string;
		pseudo: string;
		avatar: string;
		twoFactorSecret: string | null;
		isTwoFactorEnabled: boolean;
		status: string;
	};
	access_token: string;
};

export const authentication = writable<AuthenticationType>();
