'use strict';

var express = require('express');
var controller = require('./account.controller');
var auth = require('../auth/auth.controller');
var router = express.Router();

router.post('/', auth.verify, controller.create);
router.get('/', auth.verify, controller.get);

module.exports = router;
