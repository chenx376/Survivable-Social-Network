let MessageDAO = require('../dao/messageDao.js');

let messageDao = new MessageDAO();

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
        let message = {
			sender : req.body.sender,
			receivers : req.body.receivers,
			message : req.body.message,
			sent_at : req.body.sent_at,
            broadcast : req.body.broadcast
        };

        messageDao.create(message, function (message) {
            res.status(201).json(message);
        }, function(error) {
            res.status(404).json(error);
        });
    },

    /**
     * messageController.update()
     */
    update: function (req, res) {
        let message = {
            sender : req.body.sender,
            receivers : req.body.receivers,
            message : req.body.message,
            sent_at : req.body.sent_at,
            broadcast : req.body.broadcast
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
    }
};
