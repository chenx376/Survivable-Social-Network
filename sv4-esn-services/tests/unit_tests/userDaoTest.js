var expect = require('expect.js');
var UserDAO = require('../../dao/userDao.js');
var createHash = require('sha.js');
var ConnectionController = require('../../controllers/connection-controller.js');
var conn;
var userDao;
var tmp_id;

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
            status: 0,
            status_information: 'status_info',
            online: false,
            locationName : 'Mountain View',
            locationDescription : 'Home',
            latitude: 0,
            longitude: 0
        };

        userDao.create(user, function(user){
            tmp_id = user.id;
            expect(user.username).to.eql('yanli');
            expect(user.email).to.eql('yanli@gmail.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('1489962761679');
            expect(user.updated_at).to.eql('1489962761679');
            expect(user.role).to.eql('CITIZEN');
            expect(user.status).to.eql(0);
            expect(user.status_information).to.eql('status_info');
            expect(user.online).to.eql(false);
            expect(user.locationName).to.eql('Mountain View');
            expect(user.locationDescription).to.eql('Home');
            expect(user.latitude).to.eql(0);
            expect(user.longitude).to.eql(0);
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
    });

    test('Listing users by status', function(done){
        userDao.findByStatus(0, function(users){
            expect(users).to.be.an('array');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Listing users by subscription', function(done){
        userDao.findBySubscription(true, function(users){
            expect(users).to.be.an('array');
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    // test('Finding a user by ID', function(done){
    //
    //     done();
    // });

    test('Finding a user by Username', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let username = 'yanli';
        userDao.findByUsername(username, function(user){
            expect(user.username).to.eql('yanli');
            expect(user.email).to.eql('yanli@gmail.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('1489962761679');
            expect(user.updated_at).to.eql('1489962761679');
            expect(user.role).to.eql('CITIZEN');
            expect(user.status).to.eql(0);
            expect(user.status_information).to.eql('status_info');
            expect(user.online).to.eql(false);
            expect(user.locationName).to.eql('Mountain View');
            expect(user.locationDescription).to.eql('Home');
            expect(user.latitude).to.eql(0);
            expect(user.longitude).to.eql(0);
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Error Case - Finding a user by Invalid Username', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        //let username = 'yanli';
        let username = null;
        userDao.findByUsername(username, function(user){
            done();
        }, function(error){
            expect(error.message).to.eql('No such user'); //ERROR
            done();
        });
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
            expect(user.status).to.eql(0);
            expect(user.status_information).to.eql('status_info');
            expect(user.online).to.eql(false);
            expect(user.locationName).to.eql('Mountain View');
            expect(user.locationDescription).to.eql('Home');
            expect(user.latitude).to.eql(0);
            expect(user.longitude).to.eql(0);
            done();
        }, function(error){
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating a user without change', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let u = {
            id : tmp_id
        };

        userDao.update(u, function(user){
            expect(user.username).to.eql('yanli');
            expect(user.email).to.eql('yanli@gmail.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('1489962761679');
            expect(user.updated_at).to.eql('1489962761679');
            expect(user.role).to.eql('CITIZEN');
            expect(user.status).to.eql(0);
            expect(user.status_information).to.eql('status_info');
            expect(user.online).to.eql(false);
            expect(user.locationName).to.eql('Mountain View');
            expect(user.locationDescription).to.eql('Home');
            expect(user.latitude).to.eql(0);
            expect(user.longitude).to.eql(0);
            done();
        }, function(error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating a user', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('new123456', 'utf8').digest('hex');

        let u = {
            id : tmp_id,
            username : 'new yanli',
            email : 'new@email.com',
            password : shapassword,
            created_at : 'new 1489962761679',
            updated_at : 'new 1489962761679',
            role : 'new CITIZEN',
            status : 1,
            status_information: 'new status_info',
            online: true,
            locationName : 'San Francisco',
            locationDescription: 'Work'
        };

        userDao.update(u, function(user){
            expect(user.username).to.eql('new yanli');
            expect(user.email).to.eql('new@email.com');
            expect(user.password).to.eql(shapassword);
            expect(user.created_at).to.eql('new 1489962761679');
            expect(user.updated_at).to.eql('new 1489962761679');
            expect(user.role).to.eql('new CITIZEN');
            expect(user.status).to.eql(1);
            expect(user.status_information).to.eql('new status_info');
            expect(user.online).to.eql(true);
            expect(user.locationName).to.eql('San Francisco');
            expect(user.locationDescription).to.eql('Work');
            expect(user.latitude).to.eql(0);
            expect(user.longitude).to.eql(0);
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

    test('Error Case - Finding a user by Invalid ID', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let id = 'Invalid id';
        userDao.findById(id, function(user){
            done();
        }, function(error){
            expect(error.message).to.eql('Error when getting user.');
            done();
        });
    });


    test('Error Case - Updating a user with invalid id', function(done){
        var sha256 = createHash('sha256');
        var shapassword = sha256.update('new123456', 'utf8').digest('hex');

        let u = {
            id : 'invalid id',
            username : 'new yanli',
            email : 'new@email.com',
            password : shapassword,
            created_at : 'new 1489962761679',
            updated_at : 'new 1489962761679',
            role : 'new CITIZEN',
            status : 1,
            status_information: 'new status_info',
            online: true,
            locationName : 'San Francisco',
            locationDescription: 'Work',
            latitude: 0,
            longitude: 0
        };

        userDao.update(u, function(user){
            done();
        }, function(error) {
            expect(error.message).to.be('Error when getting user');
            done();
        });
    });


    test('Error Case - Removing a user of Invalid ID', function(done){
        let id = 'invalidID';
        userDao.remove(id, function(){
            done();
        }, function(error){
            expect(error.message).to.be('Error when deleting the user.');
            done();
        });
    });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
