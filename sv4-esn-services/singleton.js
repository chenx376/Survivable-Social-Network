/*
 * io-singleton.js
 */

// Private
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Public
var self = module.exports = {

    getApp: function() {
        return app;
    },

    getHttp: function() {
        return http;
    },

    getIO: function () {
        return io;
    },

    socketMap: {}

};