'use strict';

// Module dependencies.
var express = require('express');
var bodyParser = require('body-parser');
var path          = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var blockchain = require('./blockchain');

blockchain.init().then(function() {
    console.log('Blockchain deployed!')
});

// Create Express server.
var app = express();

// Express configuration.
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve client part
app.use(express.static(path.join(__dirname, '/client')));

// Error Handler.
app.use(errorHandler());

// Start Express server.
app.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

var router = express.Router();
app.use('/api', router);

router.use('/items', require('./api/item'));

module.exports = app;
