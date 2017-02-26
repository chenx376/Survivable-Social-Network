var messageModel = require('../models/messageModel.js');

/**
 * messageController.js
 *
 * @description :: Server-side logic for managing messages.
 */
module.exports = {

    /**
     * messageController.list()
     */
    list: function (req, res) {
        messageModel.find(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }
            return res.json(messages);
        });
    },

    /**
     * messageController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        messageModel.findOne({_id: id}, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }
            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }
            return res.json(message);
        });
    },

    /**
     * messageController.create()
     */
    create: function (req, res) {
        var message = new messageModel({			sender : req.body.sender,			receivers : req.body.receivers,			message : req.body.message,			sent_at : req.body.sent_at
        });

        message.save(function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating message',
                    error: err
                });
            }
            return res.status(201).json(message);
        });
    },

    /**
     * messageController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        messageModel.findOne({_id: id}, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message',
                    error: err
                });
            }
            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }

            message.sender = req.body.sender ? req.body.sender : message.sender;			message.receivers = req.body.receivers ? req.body.receivers : message.receivers;			message.message = req.body.message ? req.body.message : message.message;			message.sent_at = req.body.sent_at ? req.body.sent_at : message.sent_at;			
            message.save(function (err, message) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating message.',
                        error: err
                    });
                }

                return res.json(message);
            });
        });
    },

    /**
     * messageController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        messageModel.findByIdAndRemove(id, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the message.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
