/**
 * Created by xiaochen on 3/19/17.
 */

var config = require('config');
let announceModel = require('../models/announceModel.js')
let userModel = require('../models/userModel.js');

module.exports = class AnnounceDao {
    /**
     * annouceController.list()
     */
    list(success, error){
        announceModel
            .find({})
            .populate('announcer')
            .sort({created_at: -1})
            .exec(function (err, announces) {
                if (err){
                    return error({
                        message: 'Error when getting announcements.',
                        error: err
                    });
                }
                return success(announces)
            });
    }

    /**
     * announceController.findById()
     */
    findById(id, success, error) {
        announceModel
            .findOne({_id: id})
            .populate('announcer')
            .exec(function (err, announce) {
                if (err){
                    return error({
                        message: 'Error when getting announcements.',
                        error: err
                    });
                }
                // if (!announce){
                //     return error({message: 'No such announce'});
                // }
                return success(announce._doc);
            });
    }

    /**
     * announceController.create()
     */
    create(announceObj, success, error) {

        let announceToCreate = announceModel(announceObj);
        userModel.findOne({_id: announceObj.announcer}, function (err, announcer) {
            if (announcer.role != 'COORDINATOR' && announcer.role != 'ADMIN') {
                return error({
                    message: 'You do not have the permission to post an announcement.',
                    error: err
                });
            }
            announceToCreate.save(function (err, announce) {
                if (err) {
                    return error({
                        message: 'Error when creating announce.',
                        error: err
                    });
                }
                return success(announce._doc);
            });
        });

    }

    /**
     * announceController.update()
     */
    update(announceToUpdate, success, error) {

        announceModel.findOne({_id: announceToUpdate.id}, function (err, announce) {
            if (err) {
                return error({
                    message: 'Error when getting announce.',
                    error: err
                });
            }
            // if (!announce) {
            //     return error({
            //         message: 'No such announce.'
            //     });
            // }

            announce.id = announceToUpdate.id;
            announce.announcer = announceToUpdate.announcer ? announceToUpdate.announcer : announce.announcer;
            announce.content = announceToUpdate.content ? announceToUpdate.content : announce.content;
            announce.created_at = announceToUpdate.created_at ? announceToUpdate.created_at : announce.created_at;
            announce.location = announceToUpdate.location ? announceToUpdate.location : announce.location;

            announce.save(function (err, announce) {
                if (err) {
                    return error({
                        message: 'Error when updating announce.',
                        error: err
                    });
                }
                return success(announce);
            });
        });
    }

    /**
     * announceController.remove()
     */
    remove(id, success, error) {

        announceModel.findByIdAndRemove(id, function (err, announce) {
            if (err) {
                return error({
                    message: 'Error when deleting the announce.',
                    error: err
                });
            }
            return success();
        });
    }


}
