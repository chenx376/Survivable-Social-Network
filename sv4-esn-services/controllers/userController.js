var UserDAO = require('../dao/userDao.js');

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
            res.status(404).json(error);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        userDao.findById(id, function(user){
            res.json(user);
        }, function(error){
            res.status(404).json(error);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        let user = {
			username : req.body.username,
			email : req.body.email,
			password : req.body.password,
			created_at : req.body.created_at,
			updated_at : req.body.updated_at,
			role : req.body.role
        };

        userDao.create(user, function(user){
            res.status(201).json(user);
        }, function(error){
            res.status(404).json(error);
        });

    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        let user = {
            id: req.body.id,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            created_at : req.body.created_at,
            updated_at : req.body.updated_at,
            role : req.body.role,
            status: req.body.status,
            online: req.body.online
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
