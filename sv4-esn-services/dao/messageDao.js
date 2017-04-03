/**
 * Created by liyan on 25/02/2017.
 */

let mongoose = require('mongoose');
let config = require('config');

let messageModel = require('../models/messageModel.js');

var ObjectId = require('mongoose').Types.ObjectId;

module.exports = class MessageDAO{

    /**
     * messageController.list()
     */
    list_public(success, error) {
        messageModel
            .find({broadcast: true})
            .sort({sent_at: 1})
            .populate('sender')
            .exec( function (err, messages) {
                if (err) {
                    return error({
                        message: 'Error when getting message.',
                        error: err
                    });
                }
                return success(messages);
            });
    };


    /**
     * messageController.show()
     */
    findById(id, success, error) {
        messageModel.findOne({_id: id})
            .populate('sender')
            .exec( function (err, message) {
                if (err) {
                    return error({
                        message: 'Error when getting message.',
                        error: err
                    });
                }
                if (!message) {
                    return error({
                        message: 'No such message'
                    });
                }
                return success(message);
            });
    };

    /**
     * messageController.create()
     */
    create(messageObj, success, error) {
        let messageToCreate = messageModel(messageObj);

        messageToCreate.sent_at = new Date();

        messageToCreate.save(function (err, message) {
            if (err) {
                return error({
                    message: 'Error when creating message',
                    error: err
                });
            }
            return success(message._doc);
        });
    };

    /**
     * messageController.update()
     */
    update(userToUpdate, success, error) {
        messageModel.findOne({_id: userToUpdate.id}, function (err, message) {
            if (err) {
                return error({
                    message: 'Error when getting message',
                    error: err
                });
            }
            if (!message) {
                return error({
                    message: 'No such message'
                });
            }

            message.id = userToUpdate.id;
            message.sender = userToUpdate.sender ? userToUpdate.sender : message.sender;
            message.receivers = userToUpdate.receivers ? userToUpdate.receivers : message.receivers;
            message.broadcast = userToUpdate.broadcast ? userToUpdate.broadcast : message.broadcast;
            message.message = userToUpdate.message ? userToUpdate.message : message.message;
            message.sent_at = userToUpdate.sent_at ? userToUpdate.sent_at : message.sent_at;
            message.user_status_information = userToUpdate.user_status_information ? userToUpdate.user_status_information : message.user_status_information;
            message.user_status = userToUpdate.user_status ? userToUpdate.user_status : message.user_status;


            message.save(function (err, message) {
                if (err) {
                    return error({
                        message: 'Error when updating message.',
                        error: err
                    });
                }
                return success(message);
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


    /**
     * messageController.privateMessages
     */
    privateMessages(uid1, uid2, success, error) {

        /**
         * Find all messages where
         * uid1 is sender AND uid2 is receiver
         *                OR
         * uid2 is sender AND uid1 is receiver
         * */


        let messages = [];
        messageModel.find({broadcast: false, sender: new ObjectId(uid1), receiver: new ObjectId(uid2) })
            .populate('sender')
            .sort({sent_at: 1})
            .exec(/*success*/ function(err, data1){

            if(data1) {
                data1.forEach(function (item, index){
                    messages.push(item);
                });
            }

            messageModel.find({broadcast: false, sender: new ObjectId(uid2), receiver: new ObjectId(uid1) })
                .populate('sender')
                .sort({sent_at: 1})
                .exec(/*success*/ function(err, data2){

                if(data2) {
                    data2.forEach(function (item, index){
                        messages.push(item);
                    });
                }

                // if(messages && messages.length > 0)
                    success(messages);
                // else
                //     error({message: 'Could not find messages for this combination of users'});
            });

        });

    };

};
