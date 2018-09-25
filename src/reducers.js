export default function (state = {}, action) {


    if (action.type == 'GET_SCENES') {
        console.log('running reducers', action);

        state= {
            ...state,
            scenes: action.scenes
        };
    }


    /////////////////////////// SOCKETS /////////////////////////


    if (action.type == 'GET_ONLINE_USERS') {
        console.log('running reducers', action);

        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == 'USER_SELF') {
        console.log('running reducers', action);

        state = {
            ...state,
            self: action.self
        };
    }

    if (action.type == 'OTHER_USERS') {
        console.log('running reducers', action);

        state = {
            ...state,
            otherUsers: action.otherUsers
        };
    }

    if (action.type == 'USER_JOINED') {
        console.log('running reducers', action);

        if (state.onlineUsers.includes(action.userId)) {
            return state;
        }

        // add user joined to users array
        const onlineUsersUpdated =
            [...state.onlineUsers, action.userId];

        state = {
            ...state,
            onlineUsers: onlineUsersUpdated
        };
    }


    if (action.type == 'USER_LEFT') {
        console.log('running reducers', action);

        // remove user left from users array
        const onlineUsersUpdated =
            state.onlineUsers.filter(id => id != action.userId);

        state = {
            ...state,
            onlineUsers: onlineUsersUpdated
        };
    }

    if (action.type == 'ROLE_QUIZZER') {
        console.log('running reducers', action);

        state = {
            ...state,
            role: action.role
        };
    }

    if (action.type == 'ROLE_GUESSER') {
        console.log('running reducers', action);

        state = {
            ...state,
            role: action.role
        };
    }

    return state;

}
