const request = require('supertest');
const express = require('express');
const expect = require('expect.js');

var server = require('../../server.js');
var app = server.getApp;
var conn = server.getConn;

var tempJWT_1;
var newUser_1;
var newUserID_1;
var tempJWT_2;
var newUser_2;
var newUserID_2;

suite('Message API Tests', function(){

    suiteSetup('Setup Users for chat', function(done){
        newUser_1 = {
            'username' : 'message_test_user_1',
            'password' : '123456',
        }
        newUser_2 = {
            'username' : 'message_test_user_2',
            'password' : '123456',
        }
        request(app)
        .post('/users')
        .send(newUser_1)
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            newUserID_1 = res.body._id;

            // Get the JWT of the Created User
            request(app)
            .post('/login')
            .send(newUser_1)
            .end(function(err, res){
                tempJWT_1 = res.body.token;

                request(app)
                .post('/users')
                .send(newUser_1)
                .expect(201)
                .end(function(err, res){
                    if (err) throw err;
                    newUserID_2 = res.body._id;

                    // Get the JWT of the Created User
                    request(app)
                    .post('/login')
                    .send(newUser_1)
                    .end(function(err, res){
                        tempJWT_2 = res.body.token;
                        done();
                    });
                });
            });
        });
    })

    test('Public Messages GET', function(done){
        request(app)
        .get('/messages')
        .set('Authorization', 'JWT ' + tempJWT_1)
        .expect(200)
        .end(function(err, res){
            if (err) throw err;
            done();
        });
    })

    test('Private Messages GET', function(done){
        request(app)
        .get('/messages/' + newUserID_1 + '/' + newUserID_2)
        .set('Authorization', 'JWT ' + tempJWT_1)
        .expect(200)
        .end(function(err, res){
            if (err) throw err;
            done();
        });
    })

    test('Messages POST', function(done){
        let message = {
            sender : newUserID_1,
            receivers : newUserID_2,
            message : "Test message",
            sent_at : new Date(),
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };
        request(app)
        .post('/messages')
        .set('Authorization', 'JWT ' + tempJWT_1)
        .send(message)
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            done();
        });
    })

});
