/**
 * Created by xiaochen on 3/19/17.
 */
let AnnounceDao = require('../dao/announceDao.js')

var socketManager = require('../singleton.js');
var io = socketManager.getIO();

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
            //announces = announces.slice(announces.length-3,announces.length);
            return res.json(announces);
        }, function (error) {
            return res.status(404).json(error);
        });
    },
    /**
     * announceController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        announceDao.findById(id, function (announce) {
            return res.json(announce);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * announceController.create()
     */
    create: function (req,res) {
        let announce  = {
            content : req.body.content,
            announcer: req.body.announcer,
            created_at : req.body.created_at,
            location : req.body.location
        };

        announceDao.create(announce, function (created) {

            announceDao.findById(created._id, function (found) {

                //if(found.announcer._doc)
                //    found.announcer = found.announcer._doc; //Remove _doc of deep populated announcer

                io.emit('public-announcement-sent',  found);
                return res.status(201).json(found);
            }, function (error) {
                return res.status(404).json(error);
            });

        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * announceController.update()
     */
    update: function (req,res) {
        let announce  = {
            id : req.params.id,
            content : req.body.content,
            announcer: req.body.announcer,
            created_at : req.body.created_at,
            location : req.body.location
        };
        announceDao.update(announce, function (announce) {
            return res.json(announce);
        }, function (error) {
            return res.status(404).json(error);
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
