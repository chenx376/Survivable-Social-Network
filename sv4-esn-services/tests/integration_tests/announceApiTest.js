const request = require('supertest');
const express = require('express');
const expect = require('expect.js');

var server = require('../../server.js');
var app = server.getApp;
var conn = server.getConn;

var announceTempJWT;
var announceUser;
var announceUserID;
var announceID;

suite('Announcements API Tests', function(){

    suiteSetup('Set up user for announcement', function(done){
        announceUser = {
            'username' : 'announce_api_test',
            'password' : 'BASE64_SHA_SUPER_SECURE_PASSWORD',
        }
        request(app)
        .post('/users')
        .send(announceUser)
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            announceUserID = res.body._id;

            // Get the JWT of the Created User
            request(app)
            .post('/login')
            .send(announceUser)
            .expect(200)
            .end(function(err, res){
                announceTempJWT = res.body.token;
                // console.log(emergencySupplyTempJWT);
                done();
            });
        });
    })

    test('Announcements GET', function(done){
        request(app)
        .get('/announces')
        .set('Authorization', 'JWT ' + announceTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('array');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Announcements POST', function(done){
        let announcement  = {
            content : 'announcement test',
            announcer : announceUserID,
            created_at : new Date(),
            location : 'Mountain View'
        };
        request(app)
        .post('/announces')
        .set('Authorization', 'JWT ' + announceTempJWT)
        .send(announcement)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(201);
            announceID = res.body._id;
            done();
        });
    })

    // Below are test cases for APIs that we never used in the functionality

    test('Announcements GET by ID', function(done){
        request(app)
        .get('/announces/' + announceID)
        .set('Authorization', 'JWT ' + announceTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Announcements PUT', function(done){
        let announcement  = {
            content : 'announcement test new',
            announcer : announceUserID,
            created_at : new Date(),
            location : 'Mountain View'
        };
        request(app)
        .put('/announces/' + announceID)
        .set('Authorization', 'JWT ' + announceTempJWT)
        .send(announcement)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Announcements DELETE', function(done){
        request(app)
        .delete('/announces/' + announceID)
        .set('Authorization', 'JWT ' + announceTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(204);
            done();
        });
    })

    // Error Cases

    test('Error Case - Announcements GET by Invalid ID', function(done){
        request(app)
        .get('/announces/invalidID')
        .set('Authorization', 'JWT ' + announceTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Error Case - Announcements PUT - Invalid ID', function(done){
        let announcement  = {
            _id : 'invalidID',
            content : 'announcement test new',
            announcer : announceUserID,
            created_at : new Date(),
            location : 'Mountain View'
        };
        request(app)
        .put('/announces/invalidID')
        .set('Authorization', 'JWT ' + announceTempJWT)
        .send(announcement)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Error Case - Announcements DELETE - Invalid ID', function(done){
        request(app)
        .delete('/announces/invalidID')
        .set('Authorization', 'JWT ' + announceTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

});
