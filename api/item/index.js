'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);

module.exports = router;
