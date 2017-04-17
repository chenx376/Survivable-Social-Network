let NoteDAO = require('../dao/noteDao.js');
let noteDao = new NoteDAO();

/**
 * noteController.js
 *
 * @description :: Server-side logic for managing notes.
 */

module.exports = {
    /**
     * noteController.list()
     */
    list: function (req, res) {
        noteDao.list(function (notes) {
            return res.json(notes);
        }, function(error) {
            return res.status(404).json(error);
        });
    },

    list_sepcial: function (req, res) {
        let id = req.params.id;
        noteDao.list_special(id, function (notes) {
            return res.json(notes);
        }, function(error) {
            return res.status(404).json(error);
        });
    },

    /**
     * noteController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        noteDao.findById(id, function (note) {
            return res.json(note);
        }, function (error) {
            return res.status(404).json(error);
        });
    },
    /**
     * noteController.create()
     */
    create: function (req,res) {
        let note  = {
            content : req.body.content,
            sender: req.body.sender,
            created_at : req.body.created_at,
        };

        noteDao.create(note, function (created) {
            return res.status(201).json(note);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * noteController.update()
     */
    update: function (req, res) {
        let note = {
            id  : req.params.id,
            sender  : req.body.sender,
            content     : req.body.content,
            created_at  : req.body.created_at
        };

        noteDao.update(note, function (note) {
            return res.json(note);
        }, function(error) {
            return res.status(404).json(error);
        });
    },
    /**
     * noteController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;
        noteDao.remove(id, function () {
            return res.status(204).json("Deleted");
        }, function(error) {
            return res.status(404).json(error);
        })
    }

};
