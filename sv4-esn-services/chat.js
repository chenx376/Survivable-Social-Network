//SOCKET.IO event handler
let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

let MessageDAO = require('./dao/messageDao.js');
let messageDao = new MessageDAO();

module.exports = function(io) {
    io.on('connection', function (socket) {
        console.log('Socket.io client Connected.');
        socket.on('login', function (obj) {

            /*userDao.list(function(users){
             res.json(users);
             });*/

            // The user object needs to have
            // id and new status!
            userDao.update(obj, function () {

            }, function (error) {
            })

            io.emit('user-list-changed');
            console.log('disconnected event');
        });

        socket.on('public-msg', function (obj) {
            messageDao.create(obj, function () {
                    io.emit('public-msg-sent', obj);
                    console.log('New public message sent.');
                },
                function (error) {
                    console.log('Failed to send public message.')
                })
        });

        socket.on('logout', function (obj) {
            io.emit('user-list-changed');
            console.log('disconnected event');
        });
    });
}