var expect = require('expect.js');
var MessageDAO = require('../dao/messageDao.js');
var UserDAO = require('../dao/userDao.js');

var createHash = require('sha.js');
var ConnectionController = require('../controllers/connection-controller.js');
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
            location : 'Shanghai'
        };

        tmp_sent_at = new Date();

        userDao.create(user1, function(created1){
            console.log('Created User1 ' + JSON.stringify(created1) );
            sender = created1._id;

            let user2 = {
                username : 'user2',
                email : 'receiver@website.com',
                password : shapassword,
                created_at : '1489962761679',
                updated_at : '1489962761679',
                role : 'CITIZEN',
                location : 'Shanghai'
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

    test('Creating a message', function(done){

        let message = {
            sender : sender,
            receivers : receiver,
            message : "Test message",
            sent_at : tmp_sent_at,
            broadcast : false,
            user_status: 2,
            user_status_information: 'IM AWESOME'
        };

        messageDao.create(message, function (message) {
            created_id = message._id;
            expect(message.message).to.eql('Test message');
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
            expect(messages).to.be("Array");
            done();
        }, function(error) {
            expect(error.message).to.eql('Could not find messages for this combination of users');
            done();
        });

    });

    test('Finding message by ID', function(done){

        let id = created_id;
        messageDao.findById(id, function(message){
            expect(message.message).to.eql('Test message');
            expect(message.sender).not.to.be(null); //Sender should be deep populated by DAO
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating a message', function(done){

        let message = {
            id : created_id,
            message : 'New Message'
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

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
