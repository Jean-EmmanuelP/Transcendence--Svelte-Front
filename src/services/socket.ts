import Cookies from 'js-cookie';
import io from 'socket.io-client';

const token = Cookies.get("access_token");
console.log("Socket toke: ", token);
const transportOptions = {
	polling: {
		extraHeaders: {
			Authorization: token,
		}
	}
}
const socket = io('http://42pong.com:3000', {
	query: {
        token
	},
	transportOptions
});

export default socket;
