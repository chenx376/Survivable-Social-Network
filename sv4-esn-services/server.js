/**
 * @author Arthur M Sampaio
 */
var app = require('express')();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
var ConnectionController = require('./controllers/connection-controller.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');


let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

var conn = new ConnectionController();

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(
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


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    userDao.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

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

app.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user) {
        if (!user)
            return res.json({status: -1, message: config.errors.loginFailed});

        return res.json({status: 0,
            data: {
                user: user
            }
        });

    })(req, res);
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