var expect = require('expect.js');
var UserDao = require('../dao/userDao.js');
var createHash = require('sha.js');
var ConnectionController = require('../controllers/connection-controller.js');
var conn;
var userDao;

suite('UserDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        userDao = new UserDao();
        done();
    });

    test('Creating a user', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
			username : 'yanli',
			email : 'yanli@gmail.com',
			password : shapassword,
			created_at : '1489962761679',
			updated_at : '1489962761679',
			role : 'CITIZEN',
            location : 'Shanghai'
        };

        userDao.create(user, function(user){
            expect(user.username).to.eql('yanli');
            expect(user.email).to.eql('yanli@gmail.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('1489962761679');
            expect(user.updated_at).to.eql('1489962761679');
            expect(user.role).to.eql('CITIZEN');
            expect(user.location).to.eql('Shanghai');
            done();
        }, function(error){
            done();
        });

    });

    test('Listing users', function(done){

        done();
    });

    test('Finding user by ID', function(done){

        done();
    });

    test('Updating a user', function(done){

        done();
    });

    test('Removing a user', function(done){

        done();
    });

})
