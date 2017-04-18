var expect = require('expect.js');
var createHash = require('sha.js');
var NoteDao = require('../../dao/noteDao.js');
var AnnounceDao = require('../../dao/announceDao.js');
let UserDAO = require('../../dao/userDao.js');
var ConnectionController = require('../../controllers/connection-controller.js');

let userDao;
var conn;
var tmp_id;
var tmp_time_stamp;
var tmp_user_id;
let noteDao;
let announceDao;


suite('noteDao Tests', function () {

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        noteDao = new NoteDao();
        tmp_time_stamp = new Date();
        announceDao = new AnnounceDao();

        userDao = new UserDAO();

        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
            username : 'noteUser',
            email : 'note@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'ADMIN',
            location : 'Mountain View'
        };


        userDao.create(user, function(user){
            tmp_user_id = user._id;
            let announce = {
                announcer : tmp_user_id,
                content : 'There is a earthquake',
            };
            announceDao.create(announce, function () {
            }, function (error) {
            });
            done();
        }, function(error){
            done();
        });



    });

    test('Creating an note', function (done) {

        let note = {
            content: 'note test',
            sender: tmp_user_id,
            created_at: tmp_time_stamp,
            e_type: 'fire'
        };



        noteDao.create(note, function (noteRes) {
            tmp_id = noteRes._id;
            expect(noteRes.content).to.eql('note test');
            expect(noteRes.sender).to.eql(tmp_user_id);
            expect(noteRes.created_at).to.eql(tmp_time_stamp);
            expect(noteRes.e_type).to.eql('fire');
            done();

        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Listing notes', function(done){
        noteDao.list(function (notes) {
            expect(notes).to.be.an('array');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding note by ID', function(done){
        let id = tmp_id;
        noteDao.findById(id, function (note) {
            expect(note.content).to.eql('note test');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating a note without change', function(done){
        new_time_stamp = new Date();
        let note = {
            id : tmp_id,
        };

        noteDao.update(note, function (note) {
            expect(note.content).to.eql('note test');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating an note', function(done){
        new_time_stamp = new Date();
        let note = {
            id : tmp_id,
            sender : tmp_user_id,
            content : 'There is an earthquake',
            created_at : new_time_stamp,
            e_type : 'earthquake'
        };
        noteDao.update(note, function (note) {
            expect(note.content).to.eql('There is an earthquake');
            expect(note.sender).to.eql(tmp_user_id);
            expect(note.created_at).to.eql(new_time_stamp);
            expect(note.e_type).to.eql('earthquake');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding by special', function (done) {

        noteDao.listspecial(tmp_id, function (notes) {
            expect(notes).to.be.an('array');
            done();
        }, function (error) {
            expect(error.message).to.eql('Could not find messages for this combination of users');
            done();
        })
        });

    test('Removing a note', function(done){
        noteDao.remove(tmp_id, function (announce) {
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

});
