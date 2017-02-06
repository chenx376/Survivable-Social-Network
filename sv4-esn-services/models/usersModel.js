var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({	'name' : String,	'email' : String,	'password' : String,	'created_at' : Date,	'updated_at' : Date,	'role' : String,	'status' : String});

module.exports = mongoose.model('users', usersSchema);
