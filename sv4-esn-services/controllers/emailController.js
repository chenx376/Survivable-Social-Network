let emailDao = require('../dao/emailDao.js')

let emailDao = new emailDao();

/**
 * emailController.js
 *
 * @description :: Server-side logic for managing emails.
 */

module.exports = {

    /**
     * emailController.list()
     */
    list: function (req,res) {
        emailDao.list(function (emails) {
            //emails = emails.slice(emails.length-3,emails.length);
            return res.json(emails);
        }, function (error) {
            return res.status(404).json(error);
        });
    },
    /**
     * emailController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        emailDao.findById(id, function (email) {
            return res.json(email);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emailController.create()
     */
    create: function (req,res) {
        let email  = {
            title: req.body.title,
            content : req.body.content,
            created_at : req.body.created_at,
            sender: req.body.sender,
            receivers_group: req.body.receivers_group
        };

        emailDao.create(email, function (created) {

            emailDao.findById(created._id, function (found) {
                return res.status(201).json(found);
            }, function (error) {
                return res.status(404).json(error);
            });

        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emailController.update()
     */
    update: function (req,res) {
        let email  = {
            id : req.params.id,
            title: req.body.title,
            content : req.body.content,
            created_at : req.body.created_at,
            sender: req.body.sender,
            receivers_group: req.body.receivers_group
        };
        emailDao.update(email, function (email) {
            return res.json(email);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emailController.remove()
     */
    remove: function (req,res) {
        let id =req.params.id;
        emailDao.remove(id, function () {
            return res.status(204).json('Deleted');
        }, function (error) {
            return res.status(404).json(error);
        });

    }
};
