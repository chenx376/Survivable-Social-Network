var reserve_name = require('reserved-usernames');

let UserDAO = require('../dao/userDao.js');
let userDao = new UserDAO();

var createHash = require('sha.js');

module.exports = class LoginService {

    /**
     * userController.list()
     */
    doLogin(username, password, successCallback, errorCallback) {

        if(username && password) {
            if (username.length < 3) {
                return errorCallback(404, {message: 'Username less than three characters'} );
            }
            if (reserve_name.indexOf(username) > -1) {
                return errorCallback(404, {message: 'Username is in the list of reserve name'} );
            }
            if (password.length < 4) {
                return errorCallback(404, {message: 'Password less than four character'} );
            }
            var sha256 = createHash('sha256');
            password = sha256.update(password, 'utf8').digest('hex');
        } else {
            if (!username && !password) {
                return errorCallback(404, {message: "Please enter the Username and the Password."});
            } else {
                if (!username) {
                    return errorCallback(404, {message: "Please enter the Username."});
                } else {
                    return errorCallback(404, {message: "Please enter the Password."});
                }
            }
        }

        userDao.findByUsername(username,function(user){

            if (user.password !== password) {
                return errorCallback(404, {message: 'Incorrect password' } );
            }
            user.online = true;
            userDao.update(user, function(user){
                return successCallback(user.id);
            })

        }, function(error){
            return errorCallback(404, error);
        });

    };

};
