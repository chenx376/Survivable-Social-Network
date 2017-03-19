/**
 * Created by xiaochen on 3/19/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announceSchema = new Schema({
    'content' : String,
    'username' : String,
    'created_at' : {
        type: Date,
        default : Date.now
    },
    'updated_at' : {
        type: Date,
        default : Date.now
    },
    'location' : String
})

module.exports = mongoose.model('announce', announceSchema);