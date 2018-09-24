const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const secrets = require('./secrets.json');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const csurf = require('csurf');
// const axios = require('./src/axios');
// we require the standard axios here instead of importing from component, as we dont have form fields on the browser
const axios = require('axios');
const uidSafe = require('uid-safe');




app.use(compression());
app.use(express.static('./public'));
app.use(require('body-parser').json());

const cookieSessionMiddleware = cookieSession({
    secret: secrets.secret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());



if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

/////////////////////////////////////////////////////////////////////
//////////////////// MIDDLEWARE /////////////////////////////////////
/////////////////////////////////////////////////////////////////////

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
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err));

});





///////////////////////////////////////////////////////////////////////////////////// DONT TOUCH //////////////////////////////////////////
////////////////////////////////////////////////////////////////////
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function() {
    console.log("listening...");
});

//////////////////////////////////////////////////////////////////
///////////////////////// SOCKETS ////////////////////////////////
//////////////////////////////////////////////////////////////////

let onlineUsers = {};

io.on('connection', socket => {
    console.log(`${socket.id} has connected`);

    if (!socket.request.session || !socket.request.session.uid) {
        return socket.disconnect(true);
    }

    const socketId = socket.id;
    const userId = socket.request.session.uid;


    if (!Object.values(onlineUsers).includes(userId)) {
        onlineUsers[socketId] = userId;
        socket.broadcast.emit('userJoined', userId);
    }
    let arrayOfIds = Object.values(onlineUsers);



    if (arrayOfIds.length < 5) {
        socket.emit('onlineUsers', arrayOfIds);
        socket.emit('self', userId);
    }
    ////////////////////////////////////////////////
    // add else case to show waiting room page ////
    ///////////////////////////////////////////////

    let counter = 0;
    socket.on('toggleReady', () => {
        counter++;
        console.log('counting ready', counter);
        if (counter >= 4) {
            app.get('/startGame');
        }
    });


    socket.on('disconnect', () => {
        delete onlineUsers[socketId];
        if (!Object.values(onlineUsers).includes(userId)) {
            console.log(`${socket.id} has disconnected`);
            socket.broadcast.emit('userLeft', userId);
        }
    });

});
