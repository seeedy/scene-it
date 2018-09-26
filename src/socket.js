import * as io from 'socket.io-client';
import { playerJoined, onlinePlayers, userSelf, playerLeft, quizzer, guesser, currScene } from './actions';

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

        socket.on('quizzer', data => {
            store.dispatch(quizzer(data));
        });

        socket.on('guesser', data => {
            store.dispatch(guesser(data));
        });

        socket.on('currScene', data => {
            console.log('currscene', data);
            store.dispatch(currScene(data));
        });


    }

    return socket;

}
