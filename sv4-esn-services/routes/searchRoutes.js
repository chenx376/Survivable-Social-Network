/**
 * Created by xiaochen on 3/27/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('../controllers/userController.js');
var messageController = require('../controllers/messageController.js');
var announceController = require ('../controllers/announceController.js');


/*
 * GET all the users
 */

router.get('/user', passport.authenticate('jwt', { session: false }), userController.list);

/*
 * GET all the announcements
 */

router.get('/announcement', passport.authenticate('jwt', { session: false }), announceController.list);

/*
 * GET all the public messages
 */

router.get('/public_message', passport.authenticate('jwt', { session: false }), messageController.list);

/*
 * GET all the private messages
 */

router.get('/private_message', passport.authenticate('jwt', { session: false }), messageController.list_receiver(), messageController.list_sender());