import * as io from 'socket.io-client';
import { playerJoined, onlinePlayers, userSelf, playerLeft, quizzer, guesser, getScene } from './actions';

let socket;

export function getSocket(store) {
    console.log('store', store);
    if (!socket) {
        socket = io.connect();

        socket.on('onlinePlayers', data => {
            store.dispatch(onlinePlayers(data));
        });

        socket.on('self', data => {
            store.dispatch(userSelf(data));
        });

        socket.on('playerJoined', data => {
            store.dispatch(playerJoined(data));
        });

        socket.on('playerLeft', data => {
            store.dispatch(playerLeft(data));
        });

        socket.on('quizzer', () => {
            store.dispatch(quizzer());
        });

        socket.on('guesser', () => {
            store.dispatch(guesser());
        });

        socket.on('getScene', data => {
            store.dispatch(getScene(data));
        });


    }

    return socket;

}
