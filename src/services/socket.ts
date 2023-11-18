import { PUBLIC_BACKEND_URL } from '$env/static/public';
import Cookies from 'js-cookie';
import io, { Socket } from 'socket.io-client';

let socket : Socket|null = null;

export function initSocket() {
	const token = Cookies.get("access_token");
	// console.log("Socket toke: ", token);
	if (token && !socket) {
		const transportOptions = {
			polling: {
				extraHeaders: {
					Authorization: token,
				}
			}
		}
		socket = io("wss://42pong.com/socket.io", {
			query: {
				token
			},
			transportOptions
		});
	}
}

export function getSocket() {
	if (!socket) {
	  throw new Error('Socket not initialized. Call initSocket() first.');
	}
	return socket;
}
