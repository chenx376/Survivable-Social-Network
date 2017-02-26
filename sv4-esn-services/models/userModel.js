var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({	'name' : String,	'email' : String,	'password' : String,	'created_at' : Date,	'updated_at' : Date,	'role' : String});

module.exports = mongoose.model('user', userSchema);
