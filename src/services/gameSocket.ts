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
const gameSocket = io("http://localhost:3000/game", {
    query: {
        token
    },
    transportOptions
});

export default gameSocket;
