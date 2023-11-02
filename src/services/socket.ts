import Cookies from 'js-cookie';
import io from 'socket.io-client';

const token = Cookies.get("access_token");

const socket = io('http://localhost:3000', {
	auth: {
		token
	}
});

export default socket;
