//SOCKET.IO event handler
let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

let MessageDAO = require('./dao/messageDao.js');
let messageDao = new MessageDAO();

var config = require('./config');

const jwt = require('jsonwebtoken');

module.exports = function(io) {

    var VerifyJwt = function(token, callback) {
        // Verify the JWT
        jwt.verify(token, config.JwtSecretKey, null, function(err, decoded){
            if(err)
                console.log('JWT Validation Error: ' + err);
            else
                callback(decoded);
        });

    }


    io.on('connection', function (socket) {

        console.log('Socket.io client Connected.');

        socket.on('public-msg', function (obj) {

            VerifyJwt(obj.jwt, function(decoded){

                if(obj.data.message) {
                    //Set user sender! Dont let the user mock this! Get by JWT

                    userDao.findById(decoded.id, function(user){

                        obj.data.message.sender = user;

                        messageDao.create(obj.data.message, function () {
                                io.emit('public-msg-sent', obj);
                                console.log('New public message sent.');
                            },
                            function (error) {
                                console.log('Failed to send public message.')
                            });

                    }, function(error){
                        console.log('Error sending message');
                    });





                }

            });


        });

        socket.on('logout', function (obj) {
            io.emit('user-list-changed');
            console.log('disconnected event');
        });
    });
}