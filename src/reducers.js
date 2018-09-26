export default function (state = {}, action) {


    ////////////////////////// SEARCH ////////////////////////////

    if (action.type == 'GET_SCENES') {
        console.log('running reducers', action);

        state= {
            ...state,
            scenes: action.scenes
        };
    }


    /////////////////////////// PREGAME /////////////////////////


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

        if (state.onlinePlayers.find(elem =>
            elem.userId == action.currPlayer.userId)) {
            return state;
        }

        // add player joined to players array
        const onlinePlayersUpdated =
            [...state.onlinePlayers, action.currPlayer];

        state = {
            ...state,
            onlinePlayers: onlinePlayersUpdated
        };
    }


    if (action.type == 'PLAYER_LEFT') {
        console.log('running reducers', action);

        // remove user left from users array
        const onlinePlayersUpdated =
            state.onlinePlayers.filter(player => player.userId != action.currPlayer.userId);

        state = {
            ...state,
            onlinePlayers: onlinePlayersUpdated
        };
    }

    if (action.type == 'ROLE_QUIZZER') {
        console.log('running reducers', action);
        console.log(action.currPlayer);


        const updatedPlayerRoles = state.onlinePlayers.filter(player =>
            player.userId != action.currPlayer.userId);

        updatedPlayerRoles.push(action.currPlayer);

        console.log(updatedPlayerRoles);

        state = {
            ...state,
            onlinePlayers: updatedPlayerRoles,
            self: action.currPlayer
        };
    }

    if (action.type == 'ROLE_GUESSER') {
        console.log('running reducers', action);

        const updatedPlayerRoles = state.onlinePlayers.filter(player =>
            player.userId != action.currPlayer.userId);

        updatedPlayerRoles.push(action.currPlayer);

        state = {
            ...state,
            onlinePlayers: updatedPlayerRoles,
            self: action.currPlayer
        };
    }

    if (action.type == 'CURR_SCENE') {
        console.log('running reducers', action);

        state = {
            ...state,
            scene: action.scene
        };
    }

    return state;

}
