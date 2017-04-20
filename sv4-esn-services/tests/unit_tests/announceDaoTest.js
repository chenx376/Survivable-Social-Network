var expect = require('expect.js');
let AnnounceDao = require('../../dao/announceDao.js')
let announceDao;
var ConnectionController = require('../../controllers/connection-controller.js');
var conn;
var tmp_id;
var tmp_time_stamp;
var tmp_user_id;
let UserDAO = require('../../dao/userDao.js');
let userDao;
var createHash = require('sha.js');

suite('AnnounceDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        announceDao = new AnnounceDao();
        tmp_time_stamp = new Date();

        userDao = new UserDAO();

        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
            username : 'emergencySupplyUser',
            email : 'annnounce@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        userDao.create(user, function(user){
            tmp_user_id = user._id;
            done();
        }, function(error){
            done();
        });

    });

    test('Creating an announcement', function(done){

        let announce  = {
            content : 'announcement test',
            announcer : tmp_user_id,
            created_at : tmp_time_stamp,
            location : 'Mountain View'
        };

        announceDao.create(announce, function (announceRes) {
            tmp_id = announceRes._id;
            expect(announceRes.content).to.eql('announcement test');
            expect(announceRes.announcer).to.eql(tmp_user_id);
            expect(announceRes.created_at).to.eql(tmp_time_stamp);
            expect(announceRes.location).to.eql('Mountain View');
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

    test('Updating an announcement without change', function(done){
        new_time_stamp = new Date();
        let announce = {
            id : tmp_id,
        };

        announceDao.update(announce, function (announce) {
            expect(announce.content).to.eql('announcement test');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating an announcement', function(done){
        new_time_stamp = new Date();
        let announce = {
            id : tmp_id,
            announcer : tmp_user_id,
            content : 'announcement test new',
            created_at : new_time_stamp,
            location : 'new Mountain View'
        };

        announceDao.update(announce, function (announce) {
            expect(announce.content).to.eql('announcement test new');
            expect(announce.announcer).to.eql(tmp_user_id);
            expect(announce.created_at).to.eql(new_time_stamp);
            expect(announce.location).to.eql('new Mountain View');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
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

    test('Sorting announcements', function(done){

        let announce1 = {
            announcer : tmp_user_id,
            content : 'announcement1',
        };

        let announce2 = {
            announcer : tmp_user_id,
            content : 'announcement2',
        };

        let announce3 = {
            announcer : tmp_user_id,
            content : 'announcement3',
        };

        let announce4 = {
            announcer : tmp_user_id,
            content : 'announcement4',
        };

        announceDao.create(announce1, function (announceRes) {
            announceDao.create(announce2, function (announceRes) {
                announceDao.create(announce3, function (announceRes) {
                    announceDao.create(announce4, function (announceRes) {
                        announceDao.list(function (announces) {
                            expect(announces).to.be.an('array');
                            expect(announces[0].content).to.eql('announcement4');
                            done();
                        }, function (error) {
                            expect(error).to.be(undefined);
                            done();
                        });
                    }, function (error) {
                    });
                }, function (error) {
                });
            }, function (error) {
            });
        }, function (error) {
        });


    });

    test('Error Case - Finding an announcement by Invalid ID', function(done){
        let id = 'invalid id';
        announceDao.findById(id, function (announce) {
            expect('Error Case').to.eql('Should not go to here');
            done();
        }, function (error) {
            expect(error.message).to.eql('Error when getting announcements.');
            done();
        });
    });

    test('Error Case - Updating an invalid announcement', function(done){
        new_time_stamp = new Date();
        let announce = {
            id : 'invalid id',
            announcer : tmp_user_id,
            content : 'announcement test new',
            created_at : new_time_stamp,
            location : 'new Mountain View'
        };

        announceDao.update(announce, function (announce) {
            expect('Error Case').to.eql('Should not go to here');
            done();
        }, function (error) {
            expect(error.message).to.eql('Error when getting announce.');
            done();
        });
    });

    test('Error Case - Removing an announcement of Invalid ID', function(done){
        announceDao.remove('invalidID', function (announce) {
            done();
        }, function (error) {
            expect(error.message).to.be('Error when deleting the announce.');
            done();
        });
    });

    // test('Removing the user that was created', function(done){
    //     userDao.remove(tmp_user_id, function(){
    //         done();
    //     }, function(error){
    //         done();
    //     });
    // });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
