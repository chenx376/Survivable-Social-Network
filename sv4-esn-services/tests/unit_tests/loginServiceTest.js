var expect = require('expect.js');
var createHash = require('sha.js');
var sha256 = createHash('sha256');

var ConnectionController = require('../../controllers/connection-controller.js');
var conn;

let UserDAO = require('../../dao/userDao.js');
let userDao;

let LoginService = require('../../services/loginService.js');
let loginService = new LoginService();

let tmp_user_id;

suite('LoginService Tests', function(){

    suiteSetup('Setup DB and Create User', function(done){

        conn = new ConnectionController();
        userDao = new UserDAO();

        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
            username : 'loginuser',
            email : 'login@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        userDao.create(user, function(user){
            tmp_user_id = user.id;
            done();
        }, function(error){
            done();
        });

    });

    test('Login Successful', function(done){

        loginService.doLogin('loginuser', '123456', /*success*/ function(obj) {
            expect(obj.id).not.to.be(null);
            expect(obj.token).not.to.be(null);
            done();
        }, function(code, error){
            console.log('ERROR: ' + code+ ' message: ' + error.message);
            expect(code).to.be(null);
            expect(error).to.be(null);
            done();
        });


    });

    test('Error Case - Username less than three characters', function(done){

        loginService.doLogin('ab', '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Error Case - Username is in the list of reserved names', function(done){

        loginService.doLogin('mysql', '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Error Case - Password less than three character', function(done){

        loginService.doLogin('loginuser', '12', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Error Case - No username and password', function(done){

        loginService.doLogin(null, null, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(error.message).to.eql('Please enter the Username and the Password.');
            done();
        });

    });

    test('Error Case - Have username but not password', function(done){

        loginService.doLogin('abc', null, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(error.message).to.eql('Please enter the Password.');
            done();
        });

    });

    test('Error Case - Have password but not username', function(done){

        loginService.doLogin(null, '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(error.message).to.eql('Please enter the Username.');
            done();
        });

    });

    test('Error Case - No such user', function(done){

        loginService.doLogin('thisuserisnotsupposedtoexist', '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Error Case - Incorrect password', function(done){

        loginService.doLogin('loginuser', 'aaaaaa', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
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
