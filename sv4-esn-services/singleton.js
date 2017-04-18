/*
 * io-singleton.js
 */

// Private
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var GmailService = require('./gmailService.js');
var gmailService = new GmailService();

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

    getGmailService: function(){
        return gmailService;
    },

    socketMap: {}

};
