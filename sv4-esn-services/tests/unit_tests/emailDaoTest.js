var expect = require('expect.js');
var EmailDAO = require('../../dao/emailDao.js');
var UserDAO = require('../../dao/userDao.js');

var createHash = require('sha.js');
var ConnectionController = require('../../controllers/connection-controller.js');
var conn;

var emailDao;
var userDao;

var sender;
var receiver_1;
var receiver_2;
var noemail_receiver;

var created_id;

var tmp_sent_at;

suite('EmailDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        emailDao = new EmailDAO();
        userDao = new UserDAO();

        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let email_user1 = {
            username : 'email_user1',
            email : 'sender@website.com',
            password : shapassword,
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        tmp_sent_at = new Date();

        userDao.create(email_user1, function(created1){
            // console.log('Created User1 ' + JSON.stringify(created1) );
            sender = created1._id;

            let email_user2 = {
                username : 'email_user2',
                email : 'liyansam91@gmail.com',
                password : shapassword,
                role : 'CITIZEN',
                location : 'Mountain View'
            };

            userDao.create(email_user2, function(created2){
                receiver_1 = created2._id;

                let email_user3 = {
                    username : 'email_user3',
                    email : 'yan.li@sv.cmu.edu',
                    password : shapassword,
                    role : 'CITIZEN',
                    location : 'Mountain View'
                };

                userDao.create(email_user3, function(created3){
                    receiver_2 = created3._id;

                    let noemail_user = {
                        username : 'noemail_user',
                        password : shapassword,
                        role : 'CITIZEN',
                        location : 'Mountain View'
                    };

                    userDao.create(noemail_user, function(created4){
                        noemail_receiver = created4._id;
                        done();
                    }, function(error){
                        done();
                    });
                }, function(error){
                    done();
                });
            }, function(error){
                done();
            });
        }, function(error){
            done();
        });

    });

    test('Creating a email', function(done){
        let email = {
            title : 'Test Title',
            content : 'Test Content',
            sender : sender,
            receivers_group : [receiver_1, receiver_2]
        };
        emailDao.create(email, function (email) {
            created_id = email._id;
            expect(email.title).to.eql('Test Title');
            expect(email.content).to.eql('Test Content');
            done();
        }, function(error) {
            expect(error).to.be(undefined);
            done();
        });

    });

    test('Finding email by ID', function(done){

        let id = created_id;
        emailDao.findById(id, function(email){
            expect(email.title).to.eql('Test Title');
            expect(email.content).to.eql('Test Content');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding email by ID', function(done){

        let id = 'Invalid ID';
        emailDao.findById(id, function(email){
            expect(email.title).to.eql('Not Here');
            done();
        }, function(error){
            expect(error.message).to.eql('Error when getting emails.');
            done();
        });
    });

    test('Error Case - Receiver no email', function(done){

        let email = {
            sender : sender,
            receivers_group : [noemail_receiver],
            title : 'Test Title',
            content : 'Test Content'
        };

        emailDao.create(email, function (email) {
            expect(error.message).to.eql('Not here');
            done();
        }, function(error) {
            expect(error.message).to.eql('The user has no email address.');
            done();
        });

    });

    test('Error Case - Email no title', function(done){

        let email = {
            sender : sender,
            receivers_group : [receiver_1],
            content : 'Test Content'
        };

        emailDao.create(email, function (email) {
            expect(error.message).to.eql('Not here');
            done();
        }, function(error) {
            expect(error.message).to.eql('Email must have a title.');
            done();
        });

    });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
