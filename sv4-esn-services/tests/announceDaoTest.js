var expect = require('expect');
var announceDao = require('../dao/messageDao.js');

suite('AnnounceDAO Tests', function(){

    setup('Setup DB Connection', function(done){
        var ConnectionController = require('../controllers/connection-controller.js');
        var conn = new ConnectionController();

        done();
    });

    test('Listing announcements', function(done){

        done();
    });

    test('Finding announcement by ID', function(done){

        done();
    });

    test('Creating an announcement', function(done){

        done();
    });

    test('Updating an announcement', function(done){

        done();
    });

    test('Removing an announcement', function(done){

        done();
    });

})
