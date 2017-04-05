/**
 * Created by xiaochen on 3/19/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announceSchema = new Schema({
    'content': {type: String, default: null},
    'announcer': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'created_at': {
        type: Date,
        default: Date.now
    },
    'location': {type: String, default: null}
})

module.exports = mongoose.model('announce', announceSchema);
