var userModel = require('../models/userModel.js');

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
            res.json(users);
        }, function(error){
            res.status(500).json(error);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userDao.show(id, function(user){
            res.json(user);
        }, function(error){
            res.status(500).json(error);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = {
			name : req.body.name,
			email : req.body.email,
			password : req.body.password,
			created_at : req.body.created_at,
			updated_at : req.body.updated_at,
			role : req.body.role
        };

        userDao.create(user, function(user){
            res.status(201).json(user);
        }, function(error){
            res.status(500).json(error);
        });

    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        let user = {};


        userDao.update();

    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
