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


//////////////////// SOCKETS ////////////////////////////////////

export function onlineUsers(data) {
    return {
        type: 'GET_ONLINE_USERS',
        onlineUsers: data
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

export function userJoined(data) {
    return {
        type: 'USER_JOINED',
        userId: data
    };
}

export function userLeft(data) {
    return {
        type: 'USER_LEFT',
        userId: data
    };
}
