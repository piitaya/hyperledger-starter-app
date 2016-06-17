'use strict';

var express = require('express');
var controller = require('./thing.controller');
var auth = require('../auth/auth.controller');
var router = express.Router();

router.post('/', auth.verify, controller.create);
router.put('/:id/sell', auth.verify, controller.sell);
router.put('/:id/buy', auth.verify, controller.buy);
router.get('/', controller.getAll);
router.get('/market', controller.getMarket);

module.exports = router;
