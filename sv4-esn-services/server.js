/**
 * @author Arthur M Sampaio
 */
var app = require('express')();
var passport = require('passport');
var passportJWT = require('passport-jwt');

var createHash = require('sha.js')  //password to sha-256

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var config = require('config');
var ConnectionController = require('./controllers/connection-controller.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let UserDAO = require('./dao/userDao.js');
let userDao = new UserDAO();

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.get('JwtSecretKey');

var chat = require('./chat.js')(io);

var conn = new ConnectionController();

var env = process.env.NODE_ENV || 'dev';

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

var reserve_name = ['about','access','account','accounts','add','address','adm','admin','administration','adult','advertising',
    'affiliate','affiliates','ajax','analytics','android','anon','anonymous','api','app','apps','archive','atom','auth','authentication','avatar',
    'backup','banner','banners','bin','billing','blog','blogs','board','bot','bots','business','business', 'cache', 'cadastro', 'calendar', 'call', 'campaign',
    'cancel', 'captcha', 'career', 'careers', 'cart', 'categories', 'category', 'cgi', 'cgi-bin', 'changelog', 'chat', 'check', 'checking', 'checkout',
    'client', 'cliente', 'clients', 'code', 'codereview', 'comercial', 'comment', 'comments', 'communities', 'community', 'company', 'compare',
    'compras', 'config', 'configuration', 'connect', 'contact', 'contact-us', 'contact_us', 'contactus', 'contest', 'contribute', 'corp',
    'create', 'css', 'dashboard', 'data', 'db', 'default', 'delete', 'demo', 'design', 'designer', 'destroy', 'dev', 'devel', 'developer', 'developers',
    'diagram', 'diary', 'dict', 'dictionary', 'die', 'dir', 'direct_messages', 'directory', 'dist', 'doc', 'docs', 'documentation', 'domain',
    'download', 'downloads', 'ecommerce', 'edit', 'editor', 'edu', 'education', 'email', 'employment', 'empty', 'end', 'enterprise',
    'entries', 'entry', 'error', 'errors', 'eval', 'event', 'exit', 'explore', 'facebook', 'faq', 'favorite', 'favorites', 'feature', 'features', 'feed',
    'feedback', 'feeds', 'file', 'files', 'first', 'flash', 'fleet', 'fleets', 'flog', 'follow', 'followers', 'following', 'forgot', 'form', 'forum',
    'forums', 'founder', 'free', 'friend', 'friends', 'ftp', 'gadget', 'gadgets', 'game', 'games', 'get', 'gift', 'gifts', 'gist', 'github',
    'graph', 'group', 'groups', 'guest', 'guests', 'help', 'home', 'homepage', 'host', 'hosting', 'hostmaster', 'hostname', 'howto', 'hpg', 'html',
    'http', 'httpd', 'https', 'i', 'iamges', 'icon', 'icons', 'id', 'idea', 'ideas', 'image', 'images', 'imap', 'img', 'index', 'indice', 'info',
    'information', 'inquiry', 'intranet', 'invitations', 'invite', 'ipad', 'iphone', 'irc', 'is', 'issue', 'issues', 'it', 'item', 'items', 'java',
    'javascript', 'job', 'jobs', 'join', 'js', 'json', 'jump', 'knowledgebase', 'language', 'languages', 'last', 'ldap-status', 'legal', 'license', 'link',
    'links', 'linux', 'list', 'lists', 'log', 'log-in', 'log-out', 'log_in', 'log_out', 'login', 'logout', 'logs', 'm', 'mac', 'mail', 'mail1', 'mail2',
    'mail3', 'mail4', 'mail5', 'mailer', 'mailing', 'maintenance', 'manager', 'manual', 'map', 'maps', 'marketing', 'master', 'me', 'media', 'member', 'members', 'message',
    'messages', 'messenger', 'microblog', 'microblogs', 'mine', 'mis', 'mob', 'mobile', 'movie', 'movies', 'mp3', 'msg', 'msn', 'music', 'musicas',
    'mx', 'my', 'mysql', 'name', 'named', 'nan', 'navi', 'navigation', 'net', 'network', 'new', 'news', 'newsletter', 'nick', 'nickname', 'notes',
    'noticias', 'notification', 'notifications', 'notify', 'ns', 'ns1', 'ns10', 'ns2', 'ns3', 'ns4', 'ns5', 'ns6', 'ns7', 'ns8', 'ns9', 'null',
    'oauth', 'oauth_clients', 'offer', 'offers', 'official', 'old', 'online', 'openid', 'operator', 'order', 'orders', 'organization', 'organizations',
    'overview', 'owner', 'owners', 'page', 'pager', 'pages', 'panel', 'password', 'payment', 'perl', 'phone', 'photo', 'photoalbum', 'photos',
    'php', 'pic', 'pics', 'ping', 'plan', 'plans', 'plugin', 'plugins', 'policy', 'pop', 'pop3', 'popular', 'portal', 'post', 'postfix', 'postmaster',
    'posts', 'pr', 'premium', 'press', 'price', 'pricing', 'privacy', 'privacy-policy', 'privacy_policy', 'privacypolicy', 'private', 'product',
    'products', 'profile', 'project', 'projects', 'promo', 'pub', 'public', 'purpose', 'put', 'python', 'query', 'random', 'ranking', 'read',
    'readme', 'recent', 'recruit', 'recruitment', 'register', 'registration', 'release', 'remove', 'replies', 'report', 'reports', 'repositories', 'repository', 'req',
    'request', 'requests', 'reset', 'roc', 'root', 'rss', 'ruby', 'rule', 'sag', 'sale', 'sales', 'sample', 'samples', 'save', 'school', 'script',
    'scripts', 'search', 'secure', 'security', 'self', 'send', 'server', 'server-info', 'server-status', 'service', 'services', 'session', 'sessions', 'setting',
    'settings', 'setup', 'share', 'shop', 'show', 'sign-in', 'sign-up', 'sign_in', 'sign_up', 'signin', 'signout', 'signup', 'site', 'sitemap', 'sites',
    'smartphone', 'smtp', 'soporte', 'source', 'spec', 'special', 'sql', 'src', 'ssh', 'ssl', 'ssladmin', 'ssladministrator', 'sslwebmaster',
    'staff', 'stage', 'staging', 'start', 'stat', 'state', 'static', 'stats', 'status', 'store', 'stores', 'stories', 'style', 'styleguide', 'stylesheet',
    'stylesheets', 'subdomain', 'subscribe', 'subscriptions', 'suporte', 'support', 'svn', 'swf', 'sys', 'sysadmin', 'sysadministrator', 'system', 'tablet',
    'tablets', 'tag', 'talk', 'task', 'tasks', 'team', 'teams', 'tech', 'telnet', 'term', 'terms', 'terms-of-service', 'terms_of_service', 'termsofservice', 'test',
    'test1', 'test2', 'test3', 'teste', 'testing', 'tests', 'theme', 'themes', 'thread', 'threads', 'tmp', 'todo', 'tool', 'tools', 'top', 'topic',
    'topics', 'tos', 'tour', 'translations', 'trends', 'tutorial', 'tux', 'tv', 'twitter', 'undef', 'unfollow', 'unsubscribe', 'update', 'upload', 'uploads',
    'url', 'usage', 'user', 'username', 'users', 'usuario', 'vendas', 'ver', 'version', 'video', 'videos', 'visitor', 'watch', 'weather', 'web',
    'webmail', 'webmaster', 'website', 'websites', 'welcome', 'widget', 'widgets', 'wiki', 'win', 'windows', 'word', 'work', 'works', 'workshop', 'ww',
    'wws', 'www', 'www1', 'www2', 'www3', 'www4', 'www5', 'www6', 'www7', 'wwws', 'wwww', 'xfn', 'xml', 'xmpp', 'xpg', 'xxx', 'yaml', 'year', 'yml', 'you',
    'yourdomain', 'yourname', 'yoursite', 'yourusername'];

app.post("/login", function(req, res) {
    if(req.body.username && req.body.password){
        var username = req.body.username;
        var password = req.body.password;
        if (username.length < 3){
            return res.status(404).json({ message:'Username less than three character'});
        }
        if (reserve_name.indexOf(username) > -1){
            return res.status(404).json({ message:'Username is in the list of reserve name'});
        }
        if (password.length <4){
            return res.status(404).json({ message:'Password less than three character'});
        }
        var sha256 = createHash('sha256');
        password = sha256.update(password, 'utf8').digest('hex');
    }

    // usually this would be a database call:
    userDao.findByUsername(username,function(user){
        if (!user) {
            return res.status(404).json({ message: 'No such user'});
        }
        if (user.password != password) {
            return res.status(404).json({ message: 'Incorrect password' });
        }
        user.online = true;
        userDao.update(user, function(user){
            var payload = {id: user.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            return res.json({id: user.id, token: token});
        }, function(error){
            return res.status(500).json(error);
        })


    }, function(error){
        return res.status(404).json(error);
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
        res.json({"sv4-esn-status": "RUNNING"});
});

var port = process.env.PORT || 3000;
http.listen( port, function () {
    console.log('ENV['+env+'] Server started: ' + port);
});
