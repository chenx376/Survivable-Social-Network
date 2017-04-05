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
        .end(function(err, res){
            expect(err).to.not.be.ok();
            loginUserID = res.body._id;

            request(app)
            .post('/login')
            .send(loginUser)
            .end(function(err, res){
                expect(err).to.not.be.ok();
                expect(res).to.have.property('body');
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.eql(200);
                expect(res.body).to.be.an('object');
                done();
            })

        });
    });

    test('Error Case - Invalid Login POST', function(done){
        loginUser = {
            'username' : 'login_test',
            'password' : 'WRONG_PASSWORD',
        }
        request(app)
        .post('/login')
        .send(loginUser)
        .end(function(err, res){
            // expect(err).to.be.ok();
            expect(res).to.have.property('body');
            expect(res).to.have.property('statusCode');
            expect(res.statusCode).to.eql(404);
            expect(res.body).to.be.an('object');
            done();
        })
    });

});
