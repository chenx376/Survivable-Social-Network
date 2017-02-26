var io = require('socket.io')(http);

let UserDAO = require('../dao/userDao.js');

let userDao = new UserDAO();

//SOCKET.IO event handler
io.on('connection', function (socket) {
    console.log('Socket.io client Connected.');
    socket.on('login', function(obj) {

        /*userDao.list(function(users){
            res.json(users);
        });*/

        // The user object needs to have
        // id and new status!
        userDao.update(obj, function(){

        }, function(error){})

        io.emit('user-list-changed');
        console.log('disconnected event');
    });

    socket.on('logout', function (obj) {
        io.emit('user-list-changed');
        console.log('disconnected event');
    });
});