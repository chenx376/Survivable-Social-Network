var io = require('socket.io')(http);

let userDao = require('../dao/userDao.js');

//SOCKET.IO event handler
io.on('connection', function (socket) {
    console.log('Socket.io client Connected.');
    socket.on('login', function(obj) {

        userDao.list(function(users){
            res.json(users);
        });

        io.emit('user-list-changed');
        console.log('disconnected event');
    });

    socket.on('logout', function (obj) {
        io.emit('user-list-changed');
        console.log('disconnected event');
    });
});