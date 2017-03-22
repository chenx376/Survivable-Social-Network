var reserve_name = require('reserved-usernames');

let UserDAO = require('../dao/userDao.js');
let userDao = new UserDAO();

var createHash = require('sha.js');
var sha256 = createHash('sha256');

module.exports = class LoginService {

    /**
     * userController.list()
     */
    doLogin(username, password, successCallback, errorCallback) {


        console.log('doLogin: ' + username);

        if(username && password) {
            if (username.length < 3){
                //return res.status(404).json({ message:'Username less than three character'});
                return errorCallback(404, { message:'Username less than three characters'} );
            }
            if (reserve_name.indexOf(username) > -1){
                //return res.status(404).json({ message:'Username is in the list of reserve name'});
                return errorCallback(404, { message:'Username is in the list of reserve name'} );
            }
            if (password.length <4){
                //return res.status(404).json({ message:'Password less than three character'});
                return errorCallback(404, { message:'Password less than three character'} );
            }
            var sha256 = createHash('sha256');
            password = sha256.update(password, 'utf8').digest('hex');
        }

        userDao.findByUsername(username,function(user){

            if (user.password != password) {
                return errorCallback(404, { message: 'Incorrect password' } );
            }
            user.online = true;
            userDao.update(user, function(user){
                return successCallback(user.id);
            })

        }, function(error){
            return errorCallback(404, error);
        });

    };

}
