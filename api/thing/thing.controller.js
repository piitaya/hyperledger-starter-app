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

    blockchain.chaincode.invoke.buyThing([username, thingId], function(err, data) {
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
    URL: /api/things?market=bool&me=bool
    Response:
        { message: "OK" }
*/
exports.getAll = function(req, res) {
    var market = req.query.market ? true : false;
    var me = req.query.me ? true : false;

    var username = req.account.username;

    var args = [market.toString()];
    if (me) {
        args.push(username);
    }

    blockchain.chaincode.query.getThings(args, function(err, data) {
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
