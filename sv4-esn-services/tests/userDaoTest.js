var expect = require('expect.js');
var UserDAO = require('../dao/userDao.js');
var createHash = require('sha.js');
var ConnectionController = require('../controllers/connection-controller.js');
var conn;
var userDao;

suite('UserDAO Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        userDao = new UserDAO();
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
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Listing users', function(done){
        userDao.list(function(users){
            expect(users).to.be.an('array');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });

        done();
    });

    // test('Finding a user by ID', function(done){
    //
    //     done();
    // });

    test('Finding a user by Username', function(done){
        let username = 'yanli';
        userDao.findByUsername(username, function(user){
            expect(user.username).to.eql('yanli');
            expect(user.email).to.eql('yanli@gmail.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('1489962761679');
            expect(user.updated_at).to.eql('1489962761679');
            expect(user.role).to.eql('CITIZEN');
            expect(user.location).to.eql('Shanghai');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
        done();
    });

    test('Finding a user by ID', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let id = tmp_id;
        userDao.findById(id, function(user){
            expect(user.username).to.eql('yanli');
            expect(user.email).to.eql('yanli@gmail.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('1489962761679');
            expect(user.updated_at).to.eql('1489962761679');
            expect(user.role).to.eql('CITIZEN');
            expect(user.location).to.eql('Shanghai');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating a user', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
            id : tmp_id,
            username : 'yanli',
            email : 'new@email.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            status: 0,
            status_information: 'status_info',
            online: true,
            location : 'Mountain View'
        };

        userDao.update(user, function(user){
            expect(user.email).to.eql('new@email.com');
            done();
        }, function(error) {
            expect(error).to.be(undefined);
            done();
        });
    });


    test('Removing a user', function(done){
        let id = tmp_id;
        userDao.remove(id, function(){
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
