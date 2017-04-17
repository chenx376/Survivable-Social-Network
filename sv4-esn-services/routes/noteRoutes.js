var express = require('express');
var router = express.Router();
var passport = require('passport');
var noteController = require('../controllers/noteController.js');

/*
 * GET
 */
router.get('/', passport.authenticate('jwt', { session: false }), noteController.list);

//
router.get('/test/:id', passport.authenticate('jwt', { session: false }), noteController.list_sepcial);

/*
 * GET
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), noteController.show);

/*
 * POST
 */
router.post('/', noteController.create);

/*
 * PUT
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), noteController.update);

/*
 * DELETE
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), noteController.remove);

module.exports = router;
