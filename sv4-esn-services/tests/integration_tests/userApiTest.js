const request = require('supertest');
const express = require('express');
const expect = require('expect.js');

var server = require('../../server.js');
var app = server.getApp;
var conn = server.getConn;

var tempJWT;
var newUser;
var newUserID;

suite('Users API Tests', function(){

    test('Users POST', function(done){
        newUser = {
            'username' : 'user_api_test',
            'password' : 'BASE64_SHA_SUPER_SECURE_PASSWORD',
        }
        request(app)
        .post('/users')
        .send(newUser)
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            newUserID = res.body._id;

            // Get the JWT of the Created User
            request(app)
            .post('/login')
            .send(newUser)
            .expect(200)
            .end(function(err, res){
                tempJWT = res.body.token;
                // console.log(tempJWT);
                done();
            });
        });
    })

    test('Users GET', function(done){
        request(app)
        .get('/users')
        .set('Authorization', 'JWT ' + tempJWT)
        .expect(200)
        .end(function(err, res){
            if (err) throw err;
            done();
        });
    })

    test('Users PUT', function(done){
        var updateUser = {
            'username' : 'api_test',
            'password' : 'updated_password',
        }
        request(app)
        .put('/users/' + newUserID)
        .send(updateUser)
        .set('Authorization', 'JWT ' + tempJWT)
        .expect(200)
        .end(function(err, res){
            if (err) throw err;
            done();
        });
    })
    
    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });
});
