const request = require('supertest');
const express = require('express');
const expect = require('expect.js');

var server = require('../../server.js');
var app = server.getApp;
var conn = server.getConn;

var emergencySupplyTempJWT;
var emergencySupplyUser;
var emergencySupplyUserID;
var emergencySupplyID;

suite('Emergency Supply API Tests', function(){

    suiteSetup('Set up user for emergency Supply', function(done){
        emergencySupplyUser = {
            'username' : 'emergency_supply_api_test',
            'password' : 'BASE64_SHA_SUPER_SECURE_PASSWORD',
        }
        request(app)
        .post('/users')
        .send(emergencySupplyUser)
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            emergencySupplyUserID = res.body._id;

            // Get the JWT of the Created User
            request(app)
            .post('/login')
            .send(emergencySupplyUser)
            .expect(200)
            .end(function(err, res){
                emergencySupplyTempJWT = res.body.token;
                // console.log(emergencySupplyTempJWT);
                done();
            });
        });
    })

    test('Emergency Supplies GET', function(done){
        request(app)
        .get('/supplies')
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('array');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Emergency Supplies POST', function(done){
        let emergencySupply  = {
            supplier : emergencySupplyUserID,
            supplyname: 'New Emergency Supply',
            created_at : new Date(),
            location_text : '2326 California Street, Mountain View',
            location_lat: 999,
            location_lng: 999,
            type: 'New Type'
        };
        request(app)
        .post('/supplies')
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .send(emergencySupply)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(201);
            emergencySupplyID = res.body._id;
            done();
        });
    })

    // Below are test cases for APIs that we never used in the functionality

    test('Emergency Supply GET by ID', function(done){
        request(app)
        .get('/supplies/' + emergencySupplyID)
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Emergency Supply PUT', function(done){
        let emergencySupply  = {
            supplier : emergencySupplyUserID,
            supplyname: 'New Emergency Supply',
            created_at : new Date(),
            location_text : '2326 California Street, Mountain View',
            location_lat: 999,
            location_lng: 999,
            type: 'New Type'
        };
        request(app)
        .put('/supplies/' + emergencySupplyID)
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .send(emergencySupply)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(200);
            done();
        });
    })

    test('Emergency Supply DELETE', function(done){
        request(app)
        .delete('/supplies/' + emergencySupplyID)
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(204);
            done();
        });
    })

    // Error Cases

    test('Error Case - Emergency Supplies GET by Invalid ID', function(done){
        request(app)
        .get('/supplies/invalidID')
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Error Case - Emergency Supplies PUT - Invalid ID', function(done){
        let emergencySupply  = {
            _id: 'invalidID',
            supplier : emergencySupplyUserID,
            supplyname: 'New Emergency Supply',
            created_at : new Date(),
            location_text : '2326 California Street, Mountain View',
            location_lat: 999,
            location_lng: 999,
            type: 'New Type'
        };
        request(app)
        .put('/supplies/invalidID')
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .send(emergencySupply)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

    test('Error Case - Emergency Supplies DELETE - Invalid ID', function(done){
        request(app)
        .delete('/supplies/invalidID')
        .set('Authorization', 'JWT ' + emergencySupplyTempJWT)
        .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.eql(404);
            done();
        });
    })

});
