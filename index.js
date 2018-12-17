const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const server = require('http').Server(app);
const io = require('socket.io')(server, {});
const csurf = require('csurf');
// we require the standard axios here instead of importing from component as we dont have form fields
const axios = require('axios');
const uidSafe = require('uid-safe');
let secrets;


/////////////////////////////////////////////////////////////////////
//////////////////// MIDDLEWARE /////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// use compression middleware for performance optimization
app.use(compression());
app.use(express.static('./public'));
app.use(require('body-parser').json());

// production or local
if (process.env.NODE_ENV != 'production') {
    secrets = require('./secrets.json');
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// session cookie
const cookieSessionMiddleware = cookieSession({
    secret: process.env.SESSION_SECRET || secrets.secret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// CSRF protection
app.use(csurf());

app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken());
    // give each user a unique cookie-id
    if (req.session.uid) {
        next();
    } else {
        uidSafe(24).then(uid => {
            req.session.uid = uid;
            next();
        });
    }
});

//////////////////////////////////////////////////////////////////////
//////////////////////// ROUTES /////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// get 20 images from Google CSE API
// requests limited to return 10 images
// make two axios requests to get 2x10 images and concat
app.get('/search/:movie', (req, res) => {
    const url = 'https://www.googleapis.com/customsearch/v1?';
    let params1;

    const getFirstResults = () => {
        params1 = {
            params: {
                key: 'AIzaSyBxROaj7Ad86L1XDO28daa6MKa3Uv8dZvI',
                cx: '005169121348603338831:eand47m6mec',
                q: req.params.movie + '+movie+scene',
                searchType: 'image'
            }};
        return axios.get(url, params1);
    };

    const getNextResults = () => {
        const params2 = {
            params: {
                ...params1.params,
                start: 11
            }};
        return axios.get(url, params2);
    };

    axios.all([getFirstResults(), getNextResults()])
        .then(response => {
            const data = response[0].data.items.concat(response[1].data.items);
            res.json(data);
        })
        .catch(err => console.log(err));

});


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8080, function() {
    console.log("listening...");
});

//////////////////////////////////////////////////////////////////
///////////////////////// SOCKETS ////////////////////////////////
//////////////////////////////////////////////////////////////////

let onlinePlayers = [];
let readyPlayers = [];
let shuffledPlayers = [];

// new player joining
io.on('connection', socket => {

    if (!socket.request.session || !socket.request.session.uid) {
        return socket.disconnect(true);
    }

    const currPlayer = {
        socketId: socket.id,
        userId: socket.request.session.uid,
        role: '',
        score: 0
    };

    // check if player already exists, if not -> broadcast new player join to other players
    if (!onlinePlayers.find(player => player.userId == currPlayer.userId)) {
        onlinePlayers.push(currPlayer);
        socket.broadcast.emit('playerJoined', currPlayer);
    }

    // update array of players and self
    if (onlinePlayers.length < 5) {
        socket.emit('onlinePlayers', onlinePlayers);
        socket.emit('self', currPlayer);
    }
    // todo: add else case to show waiting room page

    // Emit current player name to other players
    socket.on('setPlayerName', name => {
        currPlayer.name = name;
        io.emit('changePlayerName', currPlayer);
    });

    // player clicks on "ready"
    socket.on('toggleReady', () => {

        // check for unique ready player and add to array
        if (!readyPlayers.find(player => player.userId == currPlayer.userId)) {

            currPlayer.ready = true;
            socket.broadcast.emit('ready', currPlayer);
            readyPlayers.push(currPlayer);

            // all four players ready
            if (readyPlayers.length >= 4) {
                // function to randomize player order
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                    return array;
                }
                // set role for each player (quizzer / guesser)
                shuffledPlayers = shuffleArray(readyPlayers);
                shuffledPlayers[0].role = 'quizzer';
                shuffledPlayers[1].role = 'guesser';
                shuffledPlayers[2].role = 'guesser';
                shuffledPlayers[3].role = 'guesser';

                shuffledPlayers.forEach(player => {
                    io.to(player.socketId).emit('setRole', player);
                });
                // start first guessing round
                io.emit('stageRound', shuffledPlayers);
                readyPlayers = [];
            }
        }
    });

    // emit chosen scene to other players and change role to scorer
    socket.on('chooseScene', scene => {
        io.emit('currScene', scene);
        currPlayer.role = 'scorer';
        socket.emit('setRole', currPlayer);
    });

    // keep track of search term for later scoring screen
    socket.on('searchedFor', search => {
        console.log('emit search on server', search);
        io.emit('searchTerm', search);
    });

    // emit guesses to scorer
    socket.on('sendGuess', guess => {
        currPlayer.guess = guess;
        socket.broadcast.emit('receiveGuess', currPlayer);
    });

    // score winning answer
    socket.on('roundWinner', roundWinner => {
        let winner = shuffledPlayers.find(player =>
            player.userId == roundWinner.userId);
        winner.score++;
        winner.wonRound = true;
        io.emit('transition', shuffledPlayers);
    });


    // start next round
    socket.on('nextRound', () => {
        readyPlayers.push(currPlayer);

        if (readyPlayers.length >= 4) {

            // switch quizzer role to next player
            let elem = shuffledPlayers.shift();
            shuffledPlayers.push(elem);
            shuffledPlayers[0].role = 'quizzer';
            shuffledPlayers[0].guess = '';
            // guesser role for other three players
            for (let i = 1; i < 4; i++) {
                shuffledPlayers[i].role = 'guesser';
                shuffledPlayers[i].guess = '';
            }

            // emit for next round start
            io.emit('stageRound', shuffledPlayers);
            // set self correctly for each player
            shuffledPlayers.forEach(player => {
                io.to(player.socketId).emit('self', player);
            });

            readyPlayers = [];

        }
    });

    // player leaving
    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`);
        // check if unique
        if (onlinePlayers.find(player =>
            player.socketId == currPlayer.socketId)) {

            socket.broadcast.emit('playerLeft', currPlayer);
            // remove from player array
            onlinePlayers = onlinePlayers.filter(player =>
                player.socketId != currPlayer.socketId);
        }
    });

});
