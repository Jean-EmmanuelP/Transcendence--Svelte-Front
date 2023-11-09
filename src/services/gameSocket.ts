import Cookies from 'js-cookie';
import io from 'socket.io-client';

const token = Cookies.get("access_token");

/* ************************************************* */
// Didn't why do we need this
const transportOptions = {
    polling: {
        extraHeaders: {
            Authorization: token,
        }
    }
}
/* ************************************************* */

const gameSocket = io('http://localhost:3000/game', {
    query: {
        token
    },
    transportOptions
});

export default gameSocket;