'use strict';

var express = require('express');
var controller = require('./item.controller');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id/sell', controller.sell);
router.put('/:id/buy', controller.buy);

module.exports = router;
