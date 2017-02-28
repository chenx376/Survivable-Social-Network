//SOCKET.IO event handler
let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

let MessageDAO = require('./dao/messageDao.js');
let messageDao = new MessageDAO();

var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
//var JwtVerifier = JwtStrategy.JwtVerifier = require('./verify_jwt');


module.exports = function(io) {

    var VerifyJwt = function(token, callback) {
        // Verify the JWT
        jwt.verify(req.token, jwtOptions.secretOrKey, null, function(err, decoded){
            if(err)
                throw (err);
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
                    obj.data.message.sender = decoded.id;


                    messageDao.create(obj.data.message, function () {
                            io.emit('public-msg-sent', obj);
                            console.log('New public message sent.');
                        },
                        function (error) {
                            console.log('Failed to send public message.')
                        })
                }

            });


        });

        socket.on('logout', function (obj) {
            io.emit('user-list-changed');
            console.log('disconnected event');
        });
    });
}