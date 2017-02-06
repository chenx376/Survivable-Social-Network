var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js');

/**
 * If we need to customize these Endpoints
 * We should remove the generated stub, for example: usersController.list
 * and include a function or a service call instead.
 * The code would end up being:
 * router.get('/', function(param1, param2) {
 *  CODE FOR ORCHESTRATING AND EXECUTING FUNCTIONALITY
 *  Write Response using: res.json({OBJECT})
 * })
 */

/*
 * GET
 */
router.get('/', usersController.list);

/*
 * GET
 */
router.get('/:id', usersController.show);

/*
 * POST
 */
router.post('/', usersController.create);

/*
 * PUT
 */
router.put('/:id', usersController.update);

/*
 * DELETE
 */
router.delete('/:id', usersController.remove);

module.exports = router;
