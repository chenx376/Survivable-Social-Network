module.exports = class LoginService {

    /**
     * userController.list()
     */
    doLogin(username, password, success, error) {

        if(username && password) {
            if (username.length < 3){
                //return res.status(404).json({ message:'Username less than three character'});
                return error(404, { message:'Username less than three character'} );
            }
            if (reserve_name.indexOf(username) > -1){
                //return res.status(404).json({ message:'Username is in the list of reserve name'});
                return error(404, { message:'Username is in the list of reserve name'} );
            }
            if (password.length <4){
                //return res.status(404).json({ message:'Password less than three character'});
                return error(404, { message:'Password less than three character'} );
            }
            var sha256 = createHash('sha256');
            password = sha256.update(password, 'utf8').digest('hex');
        }

        // usually this would be a database call:
        userDao.findByUsername(username,function(user){

            if (!user) {
                //return res.status(404).json({ message: 'No such user'});
                return error(404, { message: 'No such user'} );
            }
            if (user.password != password) {
                //return res.status(404).json({ message: 'Incorrect password' });
                return error(404, { message: 'Incorrect password' } );
            }
            user.online = true;
            userDao.update(user, function(user){
                var payload = {id: user.id};
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                //return res.json({id: user.id, token: token});
                return success({id: user.id, token: token});
            }, function(error){
                //return res.status(500).json(error);
                return error(500, error );
            })

        }, function(error){
            //return res.status(404).json(error);
            return error(404, error);
        });

    };




}
