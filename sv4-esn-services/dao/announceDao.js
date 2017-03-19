/**
 * Created by xiaochen on 3/19/17.
 */

var mongoose = require('mongoose');
var config = require('../config');

let announceModel = require('../models/announceModel.js')

module.exports = class AnnounceDao {
    /**
     * annouceController.list()
     */
    list(success, error){
        announceModel.find(function (err,announce) {
            if(err) {
                error({
                    message: 'Error when getting announce.',
                    error: err
                });
            }
            success(announce);
        });
    }

    /**
     * announceController.findById()
     */
    findById(id, success, error) {
        announceModel.findOne({_id: id}, function (err, announce) {
            if (err) {
                error({
                    message: 'Error when getting announce.',
                    error: err
                });
            }
            if (!announce) {
                error({
                    message: 'No such announce.'
                });
            }
            success(announce);
        });
    };

    /**
     * announceController.create()
     */
    create(announceObj, success, error) {

        let announceToCreate = announceModel(announceObj);
        announceToCreate.save(function (err, announce) {
            if (err) {
                return error({
                    message: 'Error when creating announce.',
                    error: err
                });
            }
            return success(announce);
        });
    };

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
            if (!announce) {
                return error({
                    message: 'No such announce.'
                });
            }

            announce.id = announceToUpdate.id;
            announce.content = announceToUpdate.content ? announceToUpdate.content : announce.content;
            announce.username = announceToUpdate.username ? announceToUpdate.username : announce.username;
            announce.created_at = announceToUpdate.created_at ? announceToUpdate.created_at : announce.created_at;
            announce.updated_at = announceToUpdate.updated_at ? announceToUpdate.updated_at : announce.updated_at;
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
    };

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
    };


}