var expect = require('expect.js');
let AnnounceDao = require('../dao/announceDao.js')
let announceDao;
var ConnectionController = require('../controllers/connection-controller.js');
var conn;
var tmp_id;

suite('AnnounceDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        announceDao = new AnnounceDao();
        done();
    });

    test('Creating an announcement', function(done){

        let announce  = {
            content : 'announcement test',
            username : 'yanli',
            created_at : '1489962761679',
            updated_at : '1489962761679',
            location : 'Mountain View'
        };

        announceDao.create(announce, function (announce) {
            expect(announce.content).to.eql('announcement test');
            tmp_id = announce.id;
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
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating an announcement', function(done){
        let announce = {
            id : tmp_id,
            content : 'announcement test new',
            username : 'yanli',
            created_at : '1489962761679',
            updated_at : '1489962761679',
            location : 'Mountain View'
        };

        announceDao.create(announce, function (announce) {
            expect(announce.content).to.eql('announcement test new');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });


    test('Removing an announcement', function(done){
        let id = tmp_id;
        announceDao.remove(id, function(){
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
