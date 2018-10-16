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

    if (action.type == 'SET_ROLE') {
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

    if (action.type == 'RECEIVE_GUESS') {
        console.log('running reducers', action);

        const onlinePlayerGuesses = state.onlinePlayers.filter(player =>
            player.userId != action.currPlayer.userId);

        onlinePlayerGuesses.push(action.currPlayer);

        state = {
            ...state,
            onlinePlayers: onlinePlayerGuesses,
        };
    }

    if (action.type == 'CHANGE_NAME') {
        console.log('running reducers', action);

        const onlinePlayerNames = state.onlinePlayers.filter(player =>
            player.userId != action.currPlayer.userId);

        onlinePlayerNames.push(action.currPlayer);


        if (action.currPlayer.userId == state.self.userId) {
            state = {
                ...state,
                onlinePlayers: onlinePlayerNames,
                self: action.currPlayer
            };
        }

        state = {
            ...state,
            onlinePlayers: onlinePlayerNames,
        };
    }

    if (action.type == 'ROUND_TRANSITION') {
        console.log('running reducers', action);

        state = {
            ...state,
            onlinePlayers: action.onlinePlayers,
            stage: 'transition'
        };
    }

    if (action.type == 'STAGE_ROUND') {
        console.log('running reducers', action);

        state = {
            ...state,
            onlinePlayers: action.onlinePlayers,
            stage: 'round',
            searchTerm: '',
            scene: '',
            scenes: ''
        };
    }

    if (action.type == 'SEARCH_TERM') {
        console.log('running reducers', action);

        state = {
            ...state,
            searchTerm: action.searchTerm
        };
    }

    return state;

}
