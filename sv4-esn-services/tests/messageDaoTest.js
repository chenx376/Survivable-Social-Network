var expect = require('expect');
var messageDao = require('../dao/messageDao.js');

suite('MessageDAO Tests', function(){

    setup('Setup DB Connection', function(done){
        var ConnectionController = require('../controllers/connection-controller.js');
        var conn = new ConnectionController();

        done();
    });

    test('Listing messages', function(done){

        done();
    });

    test('Finding message by ID', function(done){

        done();
    });

    test('Creating a message', function(done){

        done();
    });

    test('Updating a message', function(done){

        done();
    });

    test('Removing a message', function(done){

        done();
    });

})
