var express = require('express');
var router = express.Router();
var messageController = require('../controllers/messageController.js');

var passport = require('passport');

/*
 * GET
 */
router.get('/',passport.authenticate('jwt', { session: false }), messageController.list);

/*
 * GET
 */
router.get('/:id',passport.authenticate('jwt', { session: false }), messageController.show);

/*
 * POST
 */
router.post('/',passport.authenticate('jwt', { session: false }), messageController.create);

/*
 * PUT
 */
router.put('/:id',passport.authenticate('jwt', { session: false }), messageController.update);

/*
 * DELETE
 */
router.delete('/:id',passport.authenticate('jwt', { session: false }), messageController.remove);

/*
 * GET - PRIVATE CHAT
 */
router.get('/:uid1/:uid2',passport.authenticate('jwt', { session: false }), messageController.privateMessages);


module.exports = router;
