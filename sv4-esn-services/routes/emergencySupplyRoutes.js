/**
 * Created by xiaochen on 3/19/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var emergencySupplyController = require('../controllers/emergencySupplyController.js');

/*
 * GET
 */
router.get('/', emergencySupplyController.list);

/*
 * GET
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), emergencySupplyController.show);

/*
 * GET
 */
router.get('/user/:id', passport.authenticate('jwt', { session: false }), emergencySupplyController.suppliesByUser);

/*
 * POST
 */
router.post('/', emergencySupplyController.create);


/*
 * POST
 */
router.post('/confirm', emergencySupplyController.confirmSupplyRequest);


/*
 * PUT
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), emergencySupplyController.update);

/*
 * DELETE
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), emergencySupplyController.remove);

module.exports = router;
