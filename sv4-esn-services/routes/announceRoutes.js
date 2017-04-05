/**
 * Created by xiaochen on 3/19/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var announceController = require('../controllers/announceController.js');

/*
 * GET
 */
router.get('/', passport.authenticate('jwt', { session: false }), announceController.list);

/*
 * GET
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), announceController.show);

/*
 * POST
 */
router.post('/', announceController.create);

/*
 * PUT
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), announceController.update);

/*
 * DELETE
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), announceController.remove);

module.exports = router;
