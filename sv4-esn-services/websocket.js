//SOCKET.IO event handler
let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

let MessageDAO = require('./dao/messageDao.js');
let messageDao = new MessageDAO();

let AnnounceDAO = require('./dao/announceDao.js');
let annouceDao = new AnnounceDAO();

var config = require('config');

const jwt = require('jsonwebtoken');

let socket_map = require('./singleton.js').socketMap;

module.exports = function(io) {

    var VerifyJwt = function(token, callback) {
        // Verify the JWT
        jwt.verify(token, config.get('JwtSecretKey'), null, function(err, decoded){
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
                    //obj.data.message.sender = decoded.id;

                    /**
                     * MESSAGEDAO ALREADY HANDLES BROADCAST OF EVENTS TO SUPPORT HEADLESS CLIENT
                     */
                    messageDao.create(obj.data.message, function (createdMessage) {
                            console.log('New public message sent.');
                        },
                        function (error) {
                            console.log('Failed to send public message.')
                        })
                }

            });

        });


        socket.on('private-msg', function (obj) {

            VerifyJwt(obj.jwt, function(decoded) {

                if(obj.data.message) {
                    //Set user sender! Dont let the user mock this! Get by JWT
                    //obj.data.message.sender = decoded.id;

                    /**
                     * MESSAGEDAO ALREADY HANDLES BROADCAST OF EVENTS TO SUPPORT HEADLESS CLIENT
                     */
                    messageDao.create(obj.data.message, function (createdMessage) {

                            messageDao.findById(createdMessage._id, function(message) {

                                console.log('New private message sent. Sender[' + obj.data.message.sender + ']');// Socket['+socket_map[obj.data.message.sender]+']');
                                
                            }, function(error) {
                                console.log('Error finding message just saved in the database this is crazy!');
                            })

                        },
                        function (error) {
                            console.log('Failed to send public message.')
                        })
                }

            });

        });

        socket.on('subscribe', function (obj) {

            VerifyJwt(obj.jwt, function(decoded){

                if(obj.data.myself /*the room id is user's id (receiver of the message) */) {

                    socket_map[obj.data.myself] = socket.id;
                    console.log('Registering new socket ['+obj.data.myself+'] Socket['+socket_map[obj.data.myself]+']');

                    //socket.join(obj.data.myself);
//                    socket.join(obj.data.myself);
                }

            });

        });

        socket.on('unsubscribe', function(obj){
            delete socket_map[obj.data.myself];
        });

        socket.on('logout', function (obj) {
            io.emit('user-list-changed');
            console.log('disconnected event');
        });

        socket.on('public-announcement', function (obj) {

            VerifyJwt(obj.jwt, function(decoded){

                if(obj.data.announcement) {
                    //Set user sender! Dont let the user mock this! Get by JWT
                    //obj.data.message.sender = decoded.id;

                    annouceDao.create(obj.data.announcement, function (createdAnnouncement) {
                            annouceDao.findById(createdAnnouncement._id, function(announcement) {
                                io.emit('public-announcement-sent',  announcement);
                                console.log('New public message sent.');
                            }, function(error) {
                                console.log('Error finding message just saved in the database this is crazy!');
                            })

                        },
                        function (error) {
                            console.log('Failed to send public message.')
                        })
                }

            });

        });

    });
}
