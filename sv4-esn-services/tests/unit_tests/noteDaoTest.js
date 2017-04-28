var expect = require('expect.js');
var createHash = require('sha.js');
var NoteDao = require('../../dao/noteDao.js');
var AnnounceDao = require('../../dao/announceDao.js');
let UserDAO = require('../../dao/userDao.js');
var ConnectionController = require('../../controllers/connection-controller.js');

let userDao;
var conn;
var tmp_id;
var tmp_id2;

var tmp_time_stamp;
var tmp_user_id;
var tmp_user_id2;
var tmp_user_id3;
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

        let user2 = {
            username : 'noteUser2',
            email : 'note@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        let user3 = {
            username : 'noteUser3',
            email : 'note@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        userDao.create(user, function(user){
            tmp_user_id = user._id;
            let announce = {
                announcer : tmp_user_id,
                content : 'There is a fire',
            };
            announceDao.create(announce, function () {
                userDao.create(user2, function (user2) {
                    tmp_user_id2 = user2._id;
                    userDao.create(user3, function (user3) {
                        tmp_user_id3 = user3._id;
                        done();
                    }, function (error) {
                        done();
                    })
                }, function (error) {
                    done();
                })
            }, function (error) {
                done();
            });
        }, function(error){
            done();
        });
    });

    test('Creating an note', function (done) {

        let note = {
            content: 'note test',
            sender: tmp_user_id,
            created_at: tmp_time_stamp,
            e_type: 'null',
            note_title: 'null'
        };

        let note2 = {
            content: 'note test',
            sender: tmp_user_id2,
            created_at: tmp_time_stamp,
            e_type: 'null',
            note_title: 'null'
        };

        let note3 = {
            content: 'what we are suppose to do during fire',
            sender: tmp_user_id3,
            created_at: tmp_time_stamp,
            e_type: 'fire',
            note_title: 'null'
        }

        noteDao.create(note, function (noteRes) {
            tmp_id = noteRes._id;
            noteDao.create(note2, function (noteRes2) {
                tmp_id2 = noteRes2._id;
                noteDao.create(note3, function (noteRes3) {
                    expect(noteRes3.content).to.eql('what we are suppose to do during fire');
                    expect(noteRes3.sender).to.eql(tmp_user_id3);
                    expect(noteRes3.created_at).to.eql(tmp_time_stamp);
                    expect(noteRes3.e_type).to.eql('fire');
                    expect(noteRes3.note_title).to.eql('null');
                    done();
                })
            })
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
            content : 'There is a fire',
            created_at : new_time_stamp,
            e_type : 'null',
            note_title: 'null'
        };
        noteDao.update(note, function (note) {
            expect(note.content).to.eql('There is a fire');
            expect(note.sender).to.eql(tmp_user_id);
            expect(note.created_at).to.eql(new_time_stamp);
            expect(note.e_type).to.eql('null');
            expect(note.note_title).to.eql('null');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding by special', function (done) {

        noteDao.listspecial(tmp_user_id, function (notes) {
            expect(notes).to.be.an('array');
            done();
        }, function (error) {
            expect(error.message).to.eql('Could not find messages for this combination of users');
            done();
        })
        });

    test('Finding by special2', function (done) {

        noteDao.listspecial(tmp_user_id2, function (notes) {
            expect(notes).to.be.an('array');
            done();
        }, function (error) {
            expect(error.message).to.eql('Could not find messages for this combination of users');
            done();
        })
    });



    test('Removing a note', function(done){
        noteDao.remove(tmp_id, function (note) {
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
