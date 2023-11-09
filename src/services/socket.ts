import { PUBLIC_BACKEND_URL } from '$env/static/public';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

const token = Cookies.get("access_token");
// console.log("Socket toke: ", token);
const transportOptions = {
	polling: {
		extraHeaders: {
			Authorization: token,
		}
	}
}
const socket = io(PUBLIC_BACKEND_URL, {
	query: {
		token
	},
	transportOptions
});

export default socket;
