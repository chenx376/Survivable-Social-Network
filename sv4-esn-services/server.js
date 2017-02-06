/**
 * @author Arthur M Sampaio
 */
var app = require('express')();
var config = require('./config');
var ConnectionController = require('./controllers/connection-controller.js')

var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser')

 var conn = new ConnectionController();

/**
 * Start REST API Endpoints
 * After we call the mongoose-gen we just have to require the created route here.
 */
var users = require('./routes/usersRoutes.js')
app.use('/users', users)

var post = require('./routes/postRoutes.js')
app.use('/post',post)

/**
 * End of REST API Endpoints
 */

// Middleware, Headers and Server Bootstrap
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function (req, res) {
        res.json({"sv4-esn-status": "RUNNING"});
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});