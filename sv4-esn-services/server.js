/**
 * @author Arthur M Sampaio
 */
var app = require('express')();
var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
//var JwtVerifier = JwtStrategy.JwtVerifier = require('./verify_jwt');

var config = require('./config');
var ConnectionController = require('./controllers/connection-controller.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'INCLUDE_FSESV4_KEY_RANDOM_HERE';

var chat = require('./chat.js')(io);

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
    if(req.body.username && req.body.password){
        var username = req.body.username;
        var password = req.body.password;
    }
    // usually this would be a database call:
    userDao.findByUsername(username,function(user){
        if (!user) {
            res.status(500).json({ message: 'User does not exist!'});
        }
        if (!user.password === password) {
            res.status(500).json({ message: 'Incorrect password.' });
        }

        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({id: user.id, token: token});

    }, function(error){
        res.status(500).json(error);
    });

});

/**
 * Start REST API Endpoints
 * After we call the mongoose-gen we just have to require the created route here.
 */
var users = require('./routes/userRoutes.js')
app.use('/users', users)


var messages = require('./routes/messageRoutes.js')
app.use('/messages', messages)


/**
 * End of REST API Endpoints
 */

app.get('/', function (req, res) {
        res.json({"sv4-esn-status": "RUNNING"});
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});