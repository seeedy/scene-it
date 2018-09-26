import axios from './axios';


export async function getScenes(search) {

    const response = await axios.get('/search/' + search);
    console.log('data on action', response.data);
    const scenesData = response.data;
    return {
        type: 'GET_SCENES',
        scenes: scenesData
    };

}



//////////////////// PREGAME ////////////////////////////////////

export function onlinePlayers(data) {
    return {
        type: 'GET_ONLINE_PLAYERS',
        onlinePlayers: data
    };
}

export function userSelf(data) {
    return {
        type: 'USER_SELF',
        self: data
    };
}

export function otherUsers(data) {
    return {
        type: 'OTHER_USERS',
        otherUsers: data
    };
}

export function playerJoined(data) {
    return {
        type: 'PLAYER_JOINED',
        userId: data
    };
}

export function playerLeft(data) {
    return {
        type: 'PLAYER_LEFT',
        userId: data
    };
}

export function quizzer() {
    return {
        type: 'ROLE_QUIZZER',
        role: 'quizzer'
    };
}

export function guesser() {
    return {
        type: 'ROLE_GUESSER',
        role: 'guesser'
    };
}

export function getScene(data) {
    return {
        type: 'GET_SCENE',
        scene: data
    };
}
