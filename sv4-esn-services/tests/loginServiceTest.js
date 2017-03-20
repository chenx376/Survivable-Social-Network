var expect = require('expect');
var userDao = require('../dao/userDao.js');

var ConnectionController = require('../controllers/connection-controller.js');
var conn = new ConnectionController();

let UserDAO = require('./dao/userDao.js');
let userDao;

suite('UserDAO Tests', function(){

    setup('Setup DB and Create User', function(done){

        userDao = new UserDAO();

        done();
    });


})
