/**
 * Created by liyan on 25/02/2017.
 */

let mongoose = require('mongoose');
let config = require('../config');

let messageModel = require('../models/messageModel.js');

module.exports = class MessageDAO{

    /**
     * messageController.list()
     */
    list(success, error) {
        messageModel.find(function (err, messages) {
            if (err) {
                error({
                    message: 'Error when getting message.',
                    error: err
                });
            }
            success(messages);
        });
    };

    /**
     * messageController.show()
     */
    findById(id, success, error) {
        messageModel.findOne({_id: id}, function (err, message) {
            if (err) {
                error({
                    message: 'Error when getting message.',
                    error: err
                });
            }
            if (!message) {
                error({
                    message: 'No such message'
                });
            }
            success(message);
        });
    };

    /**
     * messageController.create()
     */
    create(messageObj, success, error) {
        let messageToCreate = messageModel(messageObj);
        messageToCreate.save(function (err, message) {
            if (err) {
                error({
                    message: 'Error when creating message',
                    error: err
                });
            }
            success(message);
        });
    };

    /**
     * messageController.update()
     */
    update(userToUpdate, success, error) {
        messageModel.findOne({_id: userToUpdate.id}, function (err, message) {
            if (err) {
                error({
                    message: 'Error when getting message',
                    error: err
                });
            }
            if (!message) {
                error({
                    message: 'No such message'
                });
            }

            message.id = userToUpdate.id;
            message.sender = userToUpdate.sender ? userToUpdate.sender : message.sender;
            message.receivers = userToUpdate.receivers ? userToUpdate.receivers : message.receivers;
            message.broadcast = userToUpdate.broadcast ? userToUpdate.broadcast : message.broadcast;
            message.message = userToUpdate.message ? userToUpdate.message : message.message;
            message.sent_at = userToUpdate.sent_at ? userToUpdate.sent_at : message.sent_at;

            message.save(function (err, message) {
                if (err) {
                    error({
                        message: 'Error when updating message.',
                        error: err
                    });
                }
                success(message);
            });
        });
    };

    /**
     * messageController.remove()
     */
    remove(id, success, error) {
        messageModel.findByIdAndRemove(id, function (err, message) {
            if (err) {
                error({
                    message: 'Error when deleting the message.',
                    error: err
                });
            }
            success();
        });
    };
};