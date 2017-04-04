/**
 * @author Arthur M Sampaio
 */
var app = require('express')();

var passport = require('passport');
var passportJWT = require('passport-jwt');
var createHash = require('sha.js')

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var config = require('config');

var ConnectionController = require('./controllers/connection-controller.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var reserve_name = require('reserved-usernames');

let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

let LoginService = require('./services/loginService.js');
let loginService = new LoginService();

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.get('JwtSecretKey');

var websocket = require('./websocket.js')(io);
var conn = new ConnectionController();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware, Headers and Server Bootstrap
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser.json({
    type: function() {
        return true;
    }
}));


var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

    console.log('JWT payload received', jwt_payload);

    userDao.findById(jwt_payload.id,function(user){
        if (!user) {
            next(null, false, { message: 'User does not exist!'});
        }
        next(null, user);
    }, function(error){
        next(null, false, error);
    });

});

passport.use(strategy);

app.post("/login", function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    loginService.doLogin(username, password, /*success*/function(id) {

        var token = jwt.sign({id: id}, jwtOptions.secretOrKey);
        return res.json({id: id, token: token});

    }, /*error*/ function(code, error){
        return res.status(code).json(error);
    });

});

/**
 * Start REST API Endpoints
 * After we call the mongoose-gen we just have to require the created route here.
 */
var users = require('./routes/userRoutes.js');
app.use('/users', users);

var messages = require('./routes/messageRoutes.js');
app.use('/messages', messages);

var announces = require('./routes/announceRoutes.js');
app.use('/announces', announces);

/**
 * End of REST API Endpoints
 */
app.get('/', function (req, res) {
        res.json({"sv4-esn-status": "Running"});
});

var port = process.env.PORT || 3000;
http.listen( port, function () {
    console.log('ENV[' + process.env.NODE_ENV + '] Server started: ' + port);
});

/**
 * Module exports for API Tests
 */
module.exports.getApp = app;
module.exports.getConn = conn;
