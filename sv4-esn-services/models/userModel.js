var mongoose = require('mongoose');var Schema   = mongoose.Schema;var userSchema = new Schema({	'username' : {type: String, default: null},	'email' : {type: String, default: null},	'password' : {type: String, default: null},	'created_at' : {type: String, default: Date.now},	'updated_at' : {type: String, default: Date.now},	'role' : {type: String, default: 'CITIZEN'},	'status': {type: Number, default: 0}, //OK, Help, EMERGENCY, Undefined	'online': {type: Boolean, default: false},	'location': {type: String, default: null}});module.exports = mongoose.model('user', userSchema);