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
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(201);
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
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('array');
            expect(res.statusCode).to.eql(200);
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
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Users GET by ID', function(done){
        request(app)
        .get('/users/' + newUserID)
        .set('Authorization', 'JWT ' + tempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    // Error Cases

    test('Error Case - Users GET by ID - Invalid Userid', function(done){
        request(app)
        .get('/users/invalidID')
        .set('Authorization', 'JWT ' + tempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Error Case - Users PUT', function(done){
        var updateUser = {
            _id : 'invalidID',
            'username' : 'api_test',
            'password' : 'updated_password',
        }
        request(app)
        .put('/users/invalidID')
        .send(updateUser)
        .set('Authorization', 'JWT ' + tempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Error Case - Users DELETE - Invalid Userid', function(done){
        request(app)
        .delete('/users/invalidID')
        .set('Authorization', 'JWT ' + tempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Users DELETE', function(done){
        request(app)
        .delete('/users/' + newUserID)
        .set('Authorization', 'JWT ' + tempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(204);
            done();
        });
    })

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });
});
