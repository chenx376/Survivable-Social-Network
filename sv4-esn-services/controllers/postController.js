var postModel = require('../models/postModel.js');

/**
 * postController.js
 *
 * @description :: Server-side logic for managing posts.
 */
module.exports = {

    /**
     * postController.list()
     */
    list: function (req, res) {
        postModel.find(function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
            return res.json(posts);
        });
    },

    /**
     * postController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        postModel.findOne({_id: id}, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }
            return res.json(post);
        });
    },

    /**
     * postController.create()
     */
    create: function (req, res) {
        var post = new postModel({			content : req.body.content,			created_at : req.body.created_at
        });

        post.save(function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating post',
                    error: err
                });
            }
            return res.status(201).json(post);
        });
    },

    /**
     * postController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        postModel.findOne({_id: id}, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post',
                    error: err
                });
            }
            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }

            post.content = req.body.content ? req.body.content : post.content;			post.created_at = req.body.created_at ? req.body.created_at : post.created_at;			
            post.save(function (err, post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating post.',
                        error: err
                    });
                }

                return res.json(post);
            });
        });
    },

    /**
     * postController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        postModel.findByIdAndRemove(id, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the post.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
