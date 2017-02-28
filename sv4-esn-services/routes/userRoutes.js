var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', passport.authenticate('jwt', { session: false }), userController.list);

/*
 * GET
 */
router.get('/:id', passport.authenticate('jwt', { session: false }),  userController.show);

/*
 * POST
 */
router.post('/', passport.authenticate('jwt', { session: false }),  userController.create);

/*
 * PUT
 */
router.put('/:id', passport.authenticate('jwt', { session: false }),  userController.update);

/*
 * DELETE
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }),  userController.remove);

module.exports = router;
