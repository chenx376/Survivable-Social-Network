let MessageDAO = require('../dao/messageDao.js');
let userModel = require('../models/userModel.js');
let messageDao = new MessageDAO();

/**
 * messageController.js
 *
 * @description :: Server-side logic for managing messages.
 */
module.exports = {

    /**
     * messageController.list_public()
     */
    list: function (req, res) {
        messageDao.list(function (messages) {
            res.json(messages);
        }, function(error) {
            res.status(404).json(error);
        });
    },


    /**
     * messageController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        messageDao.findById(id, function (message) {
            res.json(message);
        }, function (error) {
            res.status(404).json(error);
        });
    },


    /**
     * messageController.create()
     */
    create: function (req, res) {

        var user_id = req.body.sender;

        userModel.findOne({_id: user_id}, function (err, user) {
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

            let message = {
                sender : req.body.sender,
                receiver : req.body.receiver,
                message : req.body.message,
                sent_at : req.body.sent_at,
                broadcast : req.body.broadcast,
                user_status: (user.status)?user.status:0,
                user_status_information: user.status_information
            };



            messageDao.create(message, function (message) {
                res.status(201).json(message);
            }, function(error) {
                res.status(404).json(error);
            });

        });

    },

    /**
     * messageController.update()
     */
    update: function (req, res) {
        let message = {
            id          : req.params.id,
            sender      : req.body.sender,
            receiver    : req.body.receiver,
            message     : req.body.message,
            sent_at     : req.body.sent_at,
            broadcast   : req.body.broadcast

        };

        messageDao.update(message, function (message) {
            res.json(message);
        }, function(error) {
            res.status(404).json(error);
        });
    },

    /**
     * messageController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;
        messageDao.remove(id, function () {
            res.status(204).json("Deleted");
        }, function(error) {
            res.status(404).json(error);
        })
    },


    /**
     * messageController.privateMessages()
     */
    privateMessages: function(req, res) {

        let uid1 = req.params.uid1;
        let uid2 = req.params.uid2;

        messageDao.privateMessages(uid1, uid2, /*succcess*/ function(messages){
            res.json(messages);
        } , /*error*/ function(error) {
            res.json(404).json(error);
        })

    }
};
