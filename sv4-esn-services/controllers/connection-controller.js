/**
 * @author Arthur M Sampaio
 */
var mongoose = require('mongoose');
var config = require('../config');

module.exports = class ConnectionController {

    constructor() {
        this.db = mongoose.connection;
        this.connected = false;
        this.connect();
    }

    errorHandler() {
        console.log('MongoDB Error Connecting to database');
    }

    openHandler() {
        console.log('MongoDB connection succesfull');
        this.connected = true;
    }

    connect() {
        if (!this.connected) {
            mongoose.connect(config.get('mongo_url'));
            this.db.on('error', this.errorHandler);
            this.db.once('open', this.openHandler);
        }
    }
}