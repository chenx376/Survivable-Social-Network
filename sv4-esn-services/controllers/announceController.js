/**
 * Created by xiaochen on 3/19/17.
 */
let AnnounceDao = require('../dao/announceDao.js')

let announceDao = new AnnounceDao();

/**
 * announceController.js
 *
 * @description :: Server-side logic for managing announces.
 */

module.exports = {
    /**
     * announceController.list()
     */
    list: function (req,res) {
        announceDao.list(function (announces) {
            res.json(announces);
        }, function (error) {
            res.status(404).json(error);
        });
    },
    /**
     * announceController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        announceDao.findById(id, function (announce) {
            res.json(announce);
        }, function (error) {
            res.status(404).json(error);
        });
    },

    /**
     * announceController.create()
     */
    create: function (req,res) {
        let announce  = {
            content : req.body.content,
            username : req.body.username,
            created_at : req.body.created_at,
            updated_at : req.body.updated_at
        };

        announceDao.create(announce, function (announce) {
            res.status(201).json(announce);
        }, function (error) {
            res.status(404).json(error);
        });
    },

    /**
     * announceController.update()
     */
    update: function (req,res) {
        let announce  = {
            id : req.body.id,
            content : req.body.content,
            username : req.body.username,
            created_at : req.body.created_at,
            updated_at : req.body.updated_at
        };
        announceDao.create(announce, function (announce) {
            res.status(201).json(announce);
        }, function (error) {
            res.status(404).json(error);
        });
    },
    /**
     * announceController.remove()
     */
    remove: function (req,res) {
        let id =req.params.id;
        announceDao.remove(id, function () {
            return res.status(204).json('Deleted');
        }, function (error) {
            return res.status(404).json(error);
        });

    }
};