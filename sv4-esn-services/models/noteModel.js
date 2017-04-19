
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var noteSchema = new Schema({
    'sender' : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'created_at': {
        type: Date,
        default: Date.now
    },
    'content': {type: String, default: null},
    'e_type' : {type: String, default: null},//fire, earthquake}
    'note_title': {type: String, default: null}
});

module.exports = mongoose.model('note', noteSchema);