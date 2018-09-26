export default function (state = {}, action) {


    if (action.type == 'GET_SCENES') {
        console.log('running reducers', action);

        state= {
            ...state,
            scenes: action.scenes
        };
    }


    /////////////////////////// SOCKETS /////////////////////////


    if (action.type == 'GET_ONLINE_PLAYERS') {
        console.log('running reducers', action);

        state = {
            ...state,
            onlinePlayers: action.onlinePlayers
        };
    }

    if (action.type == 'USER_SELF') {
        console.log('running reducers', action);

        state = {
            ...state,
            self: action.self
        };
    }



    if (action.type == 'PLAYER_JOINED') {
        console.log('running reducers', action);

        if (state.onlinePlayers.includes(action.userId)) {
            return state;
        }

        // add user joined to users array
        const onlinePlayersUpdated =
            [...state.onlinePlayers, action.userId];

        state = {
            ...state,
            onlinePlayers: onlinePlayersUpdated
        };
    }


    if (action.type == 'PLAYER_LEFT') {
        console.log('running reducers', action);

        // remove user left from users array
        const onlinePlayersUpdated =
            state.onlinePlayers.filter(player => player.userId != action.userId);

        state = {
            ...state,
            onlinePlayers: onlinePlayersUpdated
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

    if (action.type == 'GET_SCENE') {
        console.log('running reducers', action);

        state = {
            ...state,
            scene: action.scene
        };
    }

    return state;

}
