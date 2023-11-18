import { PUBLIC_BACKEND_URL } from '$env/static/public';
import Cookies from 'js-cookie';
import io, { Socket } from 'socket.io-client';

let gameSocket: Socket | null = null;

export function initGameSocket() {
	const token = Cookies.get("access_token");
	if (token && !gameSocket) {
		const transportOptions = {
			polling: {
				extraHeaders: {
					Authorization: token,
				}
			}
		}
		gameSocket = io(`wss://42pong.com/socket.io/game`, {
			query: {
				token
			},
			transportOptions
		});
	}
}

export function getGameSocket() {
	if (!gameSocket) {
	  throw new Error('Socket not initialized. Call initSocket() first.');
	}
	return gameSocket;
}

