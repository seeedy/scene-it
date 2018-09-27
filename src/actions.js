import axios from './axios';



///////////////////////// SEARCH /////////////////////////////////////
export async function getScenes(search) {

    const response = await axios.get('/search/' + search);
    console.log('data on action', response.data);
    const scenesData = response.data;
    return {
        type: 'GET_SCENES',
        scenes: scenesData
    };

}

export function receiveGuess(data) {
    return {
        type: 'RECEIVE_GUESS',
        currPlayer: data
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
        currPlayer: data
    };
}

export function playerLeft(data) {
    return {
        type: 'PLAYER_LEFT',
        currPlayer: data
    };
}

export function setRole(data) {
    return {
        type: 'SET_ROLE',
        currPlayer: data
    };
}


export function currScene(data) {
    return {
        type: 'CURR_SCENE',
        scene: data
    };
}

export function changePlayerName(data) {
    return {
        type: 'CHANGE_NAME',
        currPlayer: data
    };
}

export function roundTransition(data) {
    return {
        type: 'ROUND_TRANSITION',
        onlinePlayers: data
    };
}
