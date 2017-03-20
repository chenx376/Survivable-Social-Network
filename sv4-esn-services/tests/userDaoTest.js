var expect = require('expect');
var userDao = require('../dao/userDao.js');

var ConnectionController = require('../controllers/connection-controller.js');
var conn = new ConnectionController();

let UserDAO = require('./dao/userDao.js');
let userDao;

suite('UserDAO Tests', function(){

    setup('Setup DB', function(done){

        userDao = new UserDAO();

        done();
    });

    test('Creating a user', function(done){

        done();
    });

    test('Updating a user', function(done){

        done();
    });

    test('Finding user by ID', function(done){

        done();
    });

    test('Listing users', function(done){


        done();
    });


    test('Removing a user', function(done){

        done();
    });

})
