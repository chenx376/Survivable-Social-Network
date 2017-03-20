/**
 * Created by xiaochen on 3/19/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announceSchema = new Schema({
    'content' : {type: String, default: null},
    'username' : {type: String, default: null},
    'created_at' : {
        type: Date,
        default : Date.now
    },
    'updated_at' : {
        type: Date,
        default : Date.now
    },
    'location' : {type: String, default: null}
})

module.exports = mongoose.model('announce', announceSchema);