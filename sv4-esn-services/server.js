/**
 * @author Arthur M Sampaio
 */
var app = require('express')();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var config = require('./config');
var ConnectionController = require('./controllers/connection-controller.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

var chat = require('./chat.js')(io);

var conn = new ConnectionController();

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {

        userDao.findByUsername(username,function(user){
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.password === password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }, function(error){
            return done(error);
        });

    }));

function serialize(req, res, next) {

    userDao.create(req.user, function(user){

        req.user = {
            id: user.id
        };

        next();

    }, function(err){

        return next(err);
        next();

    });
}

function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id,
    }, 'server secret', {
        expiresIn: 60*60
    });
    next();
}

function respond(req, res) {
    res.status(200).json({
        user: req.user,
        token: req.token
    });
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware, Headers and Server Bootstrap
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.post('/login', passport.authenticate(
    'local', {
        session: false
    }), serialize, generateToken, respond);

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