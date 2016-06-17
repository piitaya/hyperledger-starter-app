'use strict';

var Thing = require('./thing.model');
var blockchain = require('../../blockchain');

/*
    Create Thing
    METHOD: POST
    URL: /api/things
    Parameters:
        { name: name }
    Response:
        { message: "OK" }
*/
exports.create = function(req, res) {
    var username = req.account.username;
    var thing = new Thing(req.body);

    blockchain.chaincode.invoke.createThing([username, JSON.stringify(thing)], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else {
            res.status(200).json({message: "OK"});
        }
    });
};

/*
    Sell Thing
    METHOD: PUT
    URL: /api/things/:id/sell
    Parameters:
        { price: price }
    Response:
        { message: "OK" }
*/
exports.sell = function(req, res) {
    var username = req.account.username;
    var thingId = req.params.id;
    var price = req.body.price;

    blockchain.chaincode.invoke.sellThing([username, thingId, price.toString()], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else {
            res.status(200).json({message: "OK"});
        }
    });
};

/*
    Buy Thing
    METHOD: PUT
    URL: /api/things/:id/buy
    Response:
        { message: "OK" }
*/
exports.buy = function(req, res) {
    var username = req.account.username;
    var thingId = req.params.id;

    blockchain.chaincode.invoke.buyThing([username, thingId, price.toString()], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else {
            res.status(200).json({message: "OK"});
        }
    });
};

/*
    Get ALl Things
    METHOD: GET
    URL: /api/things
    Response:
        { message: "OK" }
*/
exports.getAll = function(req, res) {
    var market = false;

    blockchain.chaincode.query.getThings([market.toString()], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else if (!data || data == "null") {
            res.status(200).json([]);
        }
        else {
            var things = JSON.parse(data);
            res.status(200).json(things);
        }
    });
};

/*
    Get market
    METHOD: GET
    URL: /api/things/market
    Response:
        { message: "OK" }
*/
exports.getMarket = function(req, res) {
    var market = true;

    blockchain.chaincode.query.getThings([market.toString()], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else if (!data || data == "null") {
            res.status(200).json([]);
        }
        else {
            var things = JSON.parse(data);
            res.status(200).json(things);
        }
    });
};
