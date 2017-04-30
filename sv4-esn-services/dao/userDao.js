//chat-dao.js
var mongoose = require('mongoose');
var config = require('config');

let userModel = require('../models/userModel.js');

var singleton = require('../singleton.js');
var io = singleton.getIO();
let socket_map = singleton.socketMap;

module.exports = class UserDAO {

    /**
     * userController.list()
     */
    list(success, error) {
        userModel.find( function (err, users) {
            if (err) {
                return error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return success(users);
        });
    };

    /**
     * userController.findById()
     */
    findById(id, success, error) {
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return error({
                    message: 'No such user.'
                });
            }
            return success(user);
        });
    };

    /**
     * userDao.findByUsername()
     */
    findByUsername(uName, success, error) {
        userModel.findOne({username: uName}, function (err, user) {
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
     * userDao.findByStatus()
     */
    findByStatus(uStatus, success, error) {
        userModel.find({status: uStatus}, function (err, users) {
            if (err) {
                return error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return success(users);
        });
    };

    /**
     * userDao.findBySubscription()
     */
    findBySubscription(uSubscription, success, error) {
        userModel.find({subscription: uSubscription}, function (err, users) {
            if (err) {
                return error({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return success(users);
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

            user.id = userToUpdate.id;
            user.username = userToUpdate.username ? userToUpdate.username : user.username;
            user.email = userToUpdate.email ? userToUpdate.email : user.email;
            user.password = userToUpdate.password ? userToUpdate.password : user.password;
            user.created_at = userToUpdate.created_at ? userToUpdate.created_at : user.created_at;
            user.updated_at = userToUpdate.updated_at ? userToUpdate.updated_at : user.updated_at;
            user.role = userToUpdate.role ? userToUpdate.role : user.role;
            user.status = userToUpdate.status ? userToUpdate.status: user.status;
            user.status_information = userToUpdate.status_information ? userToUpdate.status_information : user.status_information;
            user.subscription = userToUpdate.subscription ? userToUpdate.subscription : user.subscription;

            if(userToUpdate.online !== null && userToUpdate.online !== undefined)
                user.online = userToUpdate.online;

            user.locationName = userToUpdate.locationName ? userToUpdate.locationName : user.locationName;
            user.locationDescription = userToUpdate.locationDescription ? userToUpdate.locationDescription : user.locationDescription;
            user.latitude = userToUpdate.latitude ? userToUpdate.latitude : user.latitude;
            user.longitude = userToUpdate.longitude ? userToUpdate.longitude : user.longitude;

            //Are you trying to deactivate this user?
            if( (userToUpdate.active == 'false' || userToUpdate.active == false )  && (user.active == 'true' || user.active == true) ) {
                io.to(socket_map[userToUpdate.id]).emit('account-inactivated', 'inactive');
            }

            if(userToUpdate.active !== null && userToUpdate.active !== undefined) {
                user.active = userToUpdate.active ? userToUpdate.active : user.active;
            }

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
