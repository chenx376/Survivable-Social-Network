var UserDAO = require('../dao/userDao.js');
var createHash = require('sha.js')  //password to sha-256

let userDao = new UserDAO();

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userDao.list(function(users){
            return res.json(users);
        }, function(error){
            return res.status(404).json(error);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        userDao.findById(id, function(user){
            return res.json(user);
        }, function(error){
            return res.status(404).json(error);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var sha256 = createHash('sha256');
        var shapassword = sha256.update(req.body.password, 'utf8').digest('hex');

        let user = {
			username : req.body.username,
			email : req.body.email,
			password : shapassword,
			created_at : req.body.created_at,
			updated_at : req.body.updated_at,
			role : req.body.role,
            locationName : req.body.locationName,
            locationDescription : req.body.locationDescription,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
        };

        userDao.create(user, function(user){
            return res.status(201).json(user);
        }, function(error){
            return res.status(404).json(error);
        });

    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var sha256 = createHash('sha256');
        var shapassword = null;
        if(req.body.password) {
            shapassword = sha256.update(req.body.password, 'utf8').digest('hex');
        }

        let user = {
            id: req.params.id,
            username : req.body.username,
            email : req.body.email,
            password : (!shapassword)?req.body.password:shapassword,
            created_at : req.body.created_at,
            updated_at : req.body.updated_at,
            role : req.body.role,
            status: req.body.status,
            status_information: req.body.status_information,
            online: req.body.online,
            locationName : req.body.locationName,
            locationDescription : req.body.locationDescription,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
        };

        userDao.update(user, function(user){
            return res.json(user);
        }, function(error) {
            return res.status(404).json(error);
        });

    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;
        userDao.remove(id, function(){
            return res.status(204).json('Deleted');
        }, function(error){
            return res.status(404).json(error);
        });
    }
};
