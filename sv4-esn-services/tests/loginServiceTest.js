var expect = require('expect.js');
var createHash = require('sha.js');
var sha256 = createHash('sha256');

var ConnectionController = require('../controllers/connection-controller.js');
var conn;

let UserDAO = require('../dao/userDao.js');
let userDao;

let LoginService = require('../services/loginService.js');
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

    test('Username less than three characters', function(done){

        loginService.doLogin('ab', '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Username is in the list of reserved names', function(done){

        loginService.doLogin('mysql', '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Password less than three character', function(done){

        loginService.doLogin('loginuser', '12', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('No such user', function(done){

        loginService.doLogin('thisuserisnotsupposedtoexist', '123456', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Incorrect password', function(done){

        loginService.doLogin('loginuser', 'aaaaaa', /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Removing the user that was created', function(done){
        userDao.remove(tmp_user_id, function(){
            done();
        }, function(error){
            done();
        });
    });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });



})
