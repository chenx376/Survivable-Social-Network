
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
        noteToCreate.save(function (err, note) {
            if (err) {
                return error({
                    message: 'Error when creating announce.',
                    error: err
                });
            }
            return success(note._doc);
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
            note.content = noteToUpdate.content ? noteToUpdate.content : note.content;
            note.created_at = noteToUpdate.created_at ? noteToUpdate.created_at : note.created_at;
            note.e_type = noteToUpdate.e_type ? noteToUpdate.e_type : note.e_type;
            note.note_title = noteToUpdate.note_title ? noteToUpdate.note_title : note.note_title;


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

    listspecial(id, success, error) {
        let notes_present = [];
        let notes_output = [];
        var person_ids = "";
        var content_all = "";
        var emergencies = ['fire', 'earthquake', 'flood'];
        var emergencies_string = 'fire earthquake flood';
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

                       if (person_ids.indexOf(person_id) < 0) {
                           person_ids = person_ids + " " + person_id;
                       }
                       content_all = content_all + content;
                   });
                    notemodel
                        .find({})
                        .populate('sender')
                        .exec(function (err, notes) {
                            if(notes) {
                                notes.forEach(function (item, index) {
                                    var sender_id = item.sender._id;
                                    var emergency_type = item.e_type;

                                    var content = content_all.toLowerCase();
                                    for (var i =0; i < emergencies.length; i++) {
                                        var emergency = emergencies[i];
                                        if (content.indexOf(emergency) >= 0 ){
                                            if ((emergency_type == emergency) && (emergencies_string.indexOf(emergency) >=0)) {
                                                emergencies_string = emergencies_string.replace(emergency, " ");
                                                item.note_title = "How to deal with " + emergency_type;
                                                notes_present.push(item);
                                            }
                                        }
                                    }

                                    if(person_ids.indexOf(sender_id)>=0 || sender_id == id){
                                        if (sender_id == id) {
                                            item.note_title = "Mynote";
                                        }
                                        if (person_ids.indexOf(sender_id)>=0 && (sender_id != id)) {
                                            item.note_title = "Note From Admin";
                                        }
                                        notes_present.push(item);
                                    }
                                })
                            }

                            for (var i = 0; i < notes_present.length; i++){
                                var title = notes_present[i].note_title;
                                if (title.indexOf("How") >=0) {
                                    notes_output.push(notes_present[i]);
                                }
                            }
                            for (var i = 0; i < notes_present.length; i++){
                                var title = notes_present[i].note_title;
                                if (title.indexOf("Admin") >=0) {
                                    notes_output.push(notes_present[i]);
                                }
                            }
                            for (var i = 0; i < notes_present.length; i++){
                                var title = notes_present[i].note_title;
                                if (title.indexOf("Mynote") >=0) {
                                    notes_output.push(notes_present[i]);
                                }
                            }
                            return success(notes_output);
                        });
                }
            });
    }

};
