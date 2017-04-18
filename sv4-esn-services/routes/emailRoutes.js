var express = require('express');
var router = express.Router();
var passport = require('passport');
var emailController = require('../controllers/emailController.js');

/*
 * GET
 */
router.get('/', passport.authenticate('jwt', { session: false }), emailController.list);

/*
 * GET
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), emailController.show);

/*
 * POST
 */
router.post('/', emailController.create);

/*
 * PUT
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), emailController.update);

/*
 * DELETE
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), emailController.remove);

module.exports = router;
