var expect = require('expect.js');
let AnnounceDao = require('../dao/announceDao.js')
let announceDao;
var ConnectionController = require('../controllers/connection-controller.js');
var conn;
var tmp_id;
var tmp_time_stamp;

suite('AnnounceDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        announceDao = new AnnounceDao();
        tmp_time_stamp = new Date();
        done();
    });

    test('Creating an announcement', function(done){

        let announce  = {
            content : 'announcement test',
            created_at : tmp_time_stamp,
            location : 'Mountain View'
        };

        announceDao.create(announce, function (announce) {
            tmp_id = announce.id;
            expect(announce.content).to.eql('announcement test');
            expect(announce.created_at).to.eql(tmp_time_stamp);
            expect(announce.location).to.eql('Mountain View');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Listing announcements', function(done){
        announceDao.list(function (announces) {
            expect(announces).to.be.an('array');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding an announcement by ID', function(done){
        let id = tmp_id;
        announceDao.findById(id, function (announce) {
            expect(announce.content).to.eql('announcement test');
            expect(announce.created_at).to.eql(tmp_time_stamp);
            expect(announce.location).to.eql('Mountain View');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding an announcement by Invalid ID', function(done){
        let id = 'invalid id';
        announceDao.findById(id, function (announce) {
            done();
        }, function (error) {
            expect(error.message).to.eql('Error when getting announcements.');
            done();
        });
    });

    test('Updating an announcement', function(done){
        new_time_stamp = new Date();
        let announce = {
            id : tmp_id,
            content : 'announcement test new',
            created_at : new_time_stamp,
            location : 'new Mountain View'
        };

        announceDao.update(announce, function (announce) {
            expect(announce.content).to.eql('announcement test new');
            expect(announce.created_at).to.eql(new_time_stamp);
            expect(announce.location).to.eql('new Mountain View');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating an invalid announcement', function(done){
        new_time_stamp = new Date();
        let announce = {
            id : 'invalid id',
            content : 'announcement test new',
            created_at : new_time_stamp,
            location : 'new Mountain View'
        };

        announceDao.update(announce, function (announce) {
            done();
        }, function (error) {
            expect(error.message).to.eql('Error when getting announce.');
            done();
        });
    });

    test('Removing an announcement', function(done){
        announceDao.remove(tmp_id, function (announce) {
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
