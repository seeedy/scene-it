import * as io from 'socket.io-client';
import { playerJoined, onlinePlayers, userSelf, playerLeft, setRole, currScene, receiveGuess, changePlayerName, roundTransition, searchTerm, stageRound } from './actions';

let socket;

export function getSocket(store) {
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

        socket.on('setRole', data => {
            store.dispatch(setRole(data));
        });

        socket.on('currScene', data => {
            store.dispatch(currScene(data));
        });

        socket.on('receiveGuess', data => {
            store.dispatch(receiveGuess(data));
        });

        socket.on('changePlayerName', data => {
            store.dispatch(changePlayerName(data));
        });

        socket.on('transition', data => {
            store.dispatch(roundTransition(data));
        });

        socket.on('ready', data => {
            store.dispatch(receiveGuess(data));
        });

        socket.on('searchTerm', data => {
            store.dispatch(searchTerm(data));
        });

        socket.on('stageRound', data => {
            store.dispatch(stageRound(data));
        });

    }

    return socket;

}
