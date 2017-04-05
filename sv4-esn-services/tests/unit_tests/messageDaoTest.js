var expect = require('expect.js');
var MessageDAO = require('../../dao/messageDao.js');
var UserDAO = require('../../dao/userDao.js');

var createHash = require('sha.js');
var ConnectionController = require('../../controllers/connection-controller.js');
var conn;

var messageDao;
var userDao;

var sender;
var receiver;

var created_id;

var tmp_sent_at;

suite('MessageDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        messageDao = new MessageDAO();
        userDao = new UserDAO();

        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user1 = {
            username : 'user1',
            email : 'sender@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        tmp_sent_at = new Date();

        userDao.create(user1, function(created1){
            // console.log('Created User1 ' + JSON.stringify(created1) );
            sender = created1._id;

            let user2 = {
                username : 'user2',
                email : 'receiver@website.com',
                password : shapassword,
                created_at : '1489962761679',
                updated_at : '1489962761679',
                role : 'CITIZEN',
                location : 'Mountain View'
            };

            userDao.create(user2, function(created2){
                receiver = created2._id;
                done();
            }, function(error){
                done();
            });


        }, function(error){
            done();
        });

    });

    test('Creating a message - Private', function(done){

        let message = {
            sender : receiver,
            receiver : sender,
            message : "Test message 1",
            sent_at : tmp_sent_at,
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };

        messageDao.create(message, function (message) {
            created_id = message._id;
            expect(message.message).to.eql('Test message 1');

            let message_2 = {
                sender : sender,
                receiver : receiver,
                message : "Test message 2",
                sent_at : tmp_sent_at,
                broadcast : false,
                user_status: 2,
                user_status_information: 'IM AWESOME'
            };

            messageDao.create(message_2, function (message_2) {
                created_id_2 = message_2._id;
                expect(message_2.message).to.eql('Test message 2');
                // console.log(created_id + ' ' + created_id_2);
                done();
            }, function(error) {
                expect(error).to.be(undefined);
                done();
            });

        }, function(error) {
            expect(error).to.be(undefined);
            done();
        });

    });

    test('Creating a message - Public', function(done){

        let message = {
            sender : sender,
            receiver : null,
            message : "Test message public",
            sent_at : tmp_sent_at,
            broadcast : true,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };

        messageDao.create(message, function (message) {
            expect(message.message).to.eql('Test message public');
            done();
        }, function(error) {
            expect(error).to.be(undefined);
            done();
        });

    });

    test('Listing messages', function(done){
        messageDao.list(function(messages){
            expect(messages).to.be.an('array');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Retrieve private messages for Sender > Receiver', function(done){

        messageDao.privateMessages(sender, receiver, function (messages) {
            expect(messages).to.be.an('array');
            done();
        }, function(error) {
            expect(error.message).to.eql('Could not find messages for this combination of users');
            done();
        });

    });

    test('Finding message by ID', function(done){

        let id = created_id;
        messageDao.findById(id, function(message){
            expect(message.message).to.eql('Test message 1');
            expect(message.sender).not.to.be(null); //Sender should be deep populated by DAO
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating a message without change', function(done){

        let message = {
            id : created_id,
        };

        messageDao.update(message, function(user){
            expect(user.message).to.eql('Test message 1');
            done();
        }, function(error) {
            expect(error.message).to.be(undefined);
            done();
        });
    });

    test('Updating a message', function(done){

        new_time_stamp = new Date();

        let message = {
            id : created_id,
            message : 'New Message',
            sender : receiver,
            receiver : sender,
            sent_at : new_time_stamp,
            broadcast : true,
            user_status : 1,
            user_status_information : 'new info'
        };

        messageDao.update(message, function(user){
            expect(user.message).to.eql('New Message');
            done();
        }, function(error) {
            expect(error.message).to.be(undefined);
            done();
        });
    });

    test('Removing a message', function(done){
        let id = created_id;
        messageDao.remove(id, function(){
            messageDao.findById(id, function(data){
                expect(data).to.be(null);
                done();
            }, function(error){
                done();
            });
        }, function(error){
            done();
        });
    });

    test('Sorting of messages', function(done){
        timestamp1 = new Date();
        timestamp2 = new Date();

        let msg1 = {
            sender : receiver,
            receiver : sender,
            message : "msg1",
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };
        let msg2 = {
            sender : receiver,
            receiver : sender,
            message : "msg2",
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };
        let msg3 = {
            sender : sender,
            receiver : receiver,
            message : "msg3",
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };
        let msg4 = {
            sender : sender,
            receiver : receiver,
            message : "msg4",
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };
        messageDao.create(msg1, function(){
            messageDao.create(msg2, function(){
                messageDao.create(msg3, function(){
                    messageDao.create(msg4, function(){
                        messageDao.privateMessages(sender, receiver, function (messages) {
                            expect(messages).to.be.an('array');
                            expect(messages[messages.length - 1].message).to.eql('msg4')
                            done();
                        }, function(error) {
                            expect(error.message).to.eql('Could not find messages for this combination of users');
                            done();
                        });
                    });
                });
            });
        });
    });

    test('Error Case - Creating a message with Invalid Sender', function(done){

        let message = {
            sender : 'InvalidID',
            receiver : null,
            message : "Test message public",
            sent_at : tmp_sent_at,
            broadcast : true,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };

        messageDao.create(message, function (message) {
            expect(message.message).to.eql('Not here');
            done();
        }, function(error) {
            expect(error.message).to.be('Error when getting user');
            done();
        });

    });

    test('Error Case - Finding message by Invalid ID', function(done){

        let id = 'invalid id';
        messageDao.findById(id, function(message){
            done();
        }, function(error){
            expect(error.message).to.eql('Error when getting message.');
            done();
        });
    });

    test('Error Case - Updating an Invalid message', function(done){

        new_time_stamp = new Date();

        let message = {
            id : 'invalid id',
            message : 'New Message',
            sender : receiver,
            receiver : sender,
            sent_at : new_time_stamp,
            broadcast : true,
            user_status : 1,
            user_status_information : 'new info'
        };

        messageDao.update(message, function(user){
            done();
        }, function(error) {
            expect(error.message).to.eql('Error when getting message');
            done();
        });
    });

    test('Error Case - Removing a message of Invalid ID', function(done){
        let id = 'invalidID';
        messageDao.remove(id, function(){
            messageDao.findById(id, function(data){
                expect(error.message).to.eql('Not here');
                done();
            }, function(error){
                expect(error.message).to.eql('Not here');
                done();
            });
        }, function(error){
            expect(error.message).to.eql('Error when deleting the message.');
            done();
        });
    });

    // test('Removing the users that was created', function(done){
    //     userDao.remove(sender, function(){
    //         userDao.remove(receiver, function(){
    //             done();
    //         }, function(error){
    //             done();
    //         });
    //     }, function(error){
    //         done();
    //     });
    // });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
