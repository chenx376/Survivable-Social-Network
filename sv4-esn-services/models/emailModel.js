var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
    'title': {type: String, default: null},
    'content': {type: String, default: null},
    'created_at': {
        type: Date,
        default: Date.now
    },
    'sender': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'receivers_group': [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

module.exports = mongoose.model('email', emailSchema);
