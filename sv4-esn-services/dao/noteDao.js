
var config = require('config');
let notemodel = require('../models/noteModel.js');
let announceModel = require('../models/announceModel');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = class NoteDao {
    /**
     * noteController.list()
     */
    list(success, error){
        notemodel
            .find({})
            .populate('sender')
            .exec(function (err, notes) {
                if (err){
                    return error({
                        message: 'Error when getting notes.',
                        error: err
                    });
                }
                return success(notes)
            });
    }
    /**
     * noteController.findById()
     */
    findById(id, success, error) {
        notemodel
            .findOne({_id: id})
            .populate('sender')
            .exec(function (err, notes) {
                if (err){
                    return error({
                        message: 'Error when getting notes.',
                        error: err
                    });
                }
                return success(notes._doc);
            });
    }
    /**
     * noteController.create()
     */
    create(noteObj, success, error) {
        let noteToCreate = notemodel(noteObj);
        noteToCreate.save(function (err, notes) {
            if (err) {
                return error({
                    message: 'Error when creating announce.',
                    error: err
                });
            }
            return success(noteObj._doc);
        });
    }
    /**
     * noteController.update()
     */
    update(noteToUpdate, success, error) {

        notemodel.findOne({_id: noteToUpdate.id}, function (err, note) {
            if (err) {
                return error({
                    message: 'Error when getting note.',
                    error: err
                });
            }

            note.id = noteToUpdate.id;
            note.sender = noteToUpdate.sender ? noteToUpdate.sender : note.sender;

            // if (noteToUpdate.online !== null && noteToUpdate.online !== undefined) {
            //     note.content = noteToUpdate.content;
            // }
            note.content = noteToUpdate.content ? noteToUpdate.content : note.content;
            note.created_at = noteToUpdate.created_at ? noteToUpdate.created_at : note.created_at;


            note.save(function (err, note) {
                if (err) {
                    return error({
                        message: 'Error when updating note.',
                        error: err
                    });
                }
                return success(note);
            });

        });
    }

    /**
     * announceController.remove()
     */
    remove(id, success, error) {

        notemodel.findByIdAndRemove(id, function (err, note) {
            if (err) {
                return error({
                    message: 'Error when deleting the note.',
                    error: err
                });
            }
            return success();
        });
    }


    list_special(id, success, error) {
        let notes_present = [];
        announceModel
            .find({})
            .populate('announcer')
            .exec(function (err, announces) {
                if (err){
                    return error({
                        message: 'Error when getting announcements.',
                        error: err
                    });
                }

                //Find admin announcers' notes
                if (announces) {
                   announces.forEach(function (item, index) {
                       var person_id = item.announcer._id;
                       var content = item.content;

                       //Display the announcer's notes
                       notemodel
                           .find({sender: new ObjectId(person_id)})
                           .populate('sender')
                           .exec(function (err, notes) {
                               if(notes){
                                   notes.forEach(function (item, index) {
                                       notes_present.push(item);
                                   })
                               }
                       });

                       //Display the defaults' note
                       if (content.indexOf("fire") >=0 ){
                           notemodel
                               .find({system: "fire"})
                               .populate('sender')
                               .exec(function (err, notes) {
                                   if(notes){
                                       notes.forEach(function (item, index) {
                                           notes_present.push(item);
                                       })
                                   }
                               });
                       }

                       //find notes that the user creates
                       notemodel
                           .find({_id:id})
                           .populate('sender')
                           .exec(function (err, notes) {
                               if(notes){
                                   notes.forEach(function (item, index) {
                                       notes_present.push(item);
                                   })
                               }
                           });
                   })
                }
                return success(notes);
            });

    }

};
