//chat-dao.js
var mongoose = require('mongoose');
var config = require('config');

let userModel = require('../models/userModel.js');

module.exports = class UserDAO {

    /**
     * userController.list()
     */
    list(success, error) {
        userModel.find(function (err, users) {
            if (err) {
                error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            success(users);
        });
    };

    /**
     * userController.findById()
     */
    findById(id, success, error) {
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                error({
                    message: 'No such user.'
                });
            }
            success(user);
        });
    };

    /**
     * userDao.findByUsername()
     */
    findByUsername(username, success, error) {
        userModel.findOne({username: username}, function (err, user) {
            if (err) {
                return error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return error({
                    message: 'No such user'
                });
            }
            return success(user);
        });
    };

    /**
     * userController.create()
     */
    create(userObj, success, error) {

        let userToCreate = userModel(userObj);
        userToCreate.save(function (err, user) {
            if (err) {
                return error({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return success(user);
        });
    };

    /**
     * userController.update()
     */
    update(userToUpdate, success, error) {

        userModel.findOne({_id: userToUpdate.id}, function (err, user) {
            if (err) {
                return error({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return error({
                    message: 'No such user'
                });
            }

            user.id = userToUpdate.id;
            user.name = userToUpdate.name ? userToUpdate.name : user.name;
            user.email = userToUpdate.email ? userToUpdate.email : user.email;
            user.password = userToUpdate.password ? userToUpdate.password : user.password;
            user.created_at = userToUpdate.created_at ? userToUpdate.created_at : user.created_at;
            user.updated_at = userToUpdate.updated_at ? userToUpdate.updated_at : user.updated_at;
            user.role = userToUpdate.role ? userToUpdate.role : user.role;
            user.status = userToUpdate.status ? userToUpdate.status: user.status;
            user.status_information = userToUpdate.status_information ? userToUpdate.status_information : user.status_information;
            user.online = userToUpdate.online? userToUpdate.online : user.online;
            user.location = userToUpdate.location? userToUpdate.location: user.location;

            user.save(function (err, user) {
                if (err) {
                    return error({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return success(user);
            });
        });
    };

    /**
     * userController.remove()
     */
    remove(id, success, error) {

        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return error({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return success();
        });
    };

}
