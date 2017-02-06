var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({	'content' : String,	'created_at' : Date});

module.exports = mongoose.model('post', postSchema);
