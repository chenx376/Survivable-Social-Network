var expect = require('expect.js');

var ConnectionController = require('../controllers/connection-controller.js');
var conn = new ConnectionController();

let UserDAO = require('./dao/userDao.js');
let userDao;


let LoginService = require('./services/loginService.js');
let loginService = new LoginService();

suite('UserDAO Tests', function(){

    setup('Setup DB and Create User', function(done){

        userDao = new UserDAO();

        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
            username : 'loginuser',
            email : 'login@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Shanghai'
        };

        userDao.create(user, function(user){
            done();
        }, function(error){
            done();
        });

    });

    test('Login Successful', function(done){

        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        loginService.doLogin('loginuser', shapassword, /*success*/ function(obj) {
            expect(obj.id).not.to.be(null);
            expect(obj.token).not.to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(null);
            expect(error).to.be(null);
            done();
        });


    });

    test('Username less than three characters', function(done){

        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        loginService.doLogin('ab', shapassword, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Username is in the list of reserved names', function(done){

        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        loginService.doLogin('mysql', shapassword, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Password less than three character', function(done){

        var shapassword = sha256.update('12', 'utf8').digest('hex');

        loginService.doLogin('loginuser', shapassword, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('No such user', function(done){

        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        loginService.doLogin('nosuchuser', shapassword, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });

    test('Incorrect password', function(done){

        var shapassword = sha256.update('AAAAAA', 'utf8').digest('hex');

        loginService.doLogin('loginuser', shapassword, /*success*/ function(obj) {
            expect(obj.id).to.be(null);
            expect(obj.token).to.be(null);
            done();
        }, function(code, error){
            expect(code).to.be(404);
            done();
        });

    });



})
