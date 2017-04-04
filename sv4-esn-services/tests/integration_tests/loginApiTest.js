const request = require('supertest');
const express = require('express');
const expect = require('expect.js');

var server = require('../../server.js');
var app = server.getApp;
var conn = server.getConn;

var loginUser;
var loginUserID;

suite('Login API Tests', function(){

    test('Login POST', function(done){
        loginUser = {
            'username' : 'login_test',
            'password' : 'BASE64_SHA_SUPER_SECURE_PASSWORD',
        }
        request(app)
        .post('/users')
        .send(loginUser)
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            loginUserID = res.body._id;
            // Get the JWT of the Created User
            request(app)
            .post('/login')
            .send(loginUser)
            .expect(200, done)
        });
    });

});
