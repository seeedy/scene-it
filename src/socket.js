import * as io from 'socket.io-client';
import { userJoined, onlineUsers, userSelf, userLeft } from './actions';

let socket;

export function getSocket(store) {
    console.log('store', store);
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', data => {
            store.dispatch(onlineUsers(data));
        });

        socket.on('self', data => {
            store.dispatch(userSelf(data));
        });

        socket.on('userJoined', data => {
            store.dispatch(userJoined(data));
        });

        socket.on('userLeft', data => {
            store.dispatch(userLeft(data));
        });


    }

    return socket;

}
