'use strict';

var Item = require('./item.model');

/*
    Get Items
    METHOD: GET
    URL: /api/items
    Response:
        { item }
*/
exports.getAll = function(req, res) {
    var item1 = new Item({
        name: "item1",
        price: 100
    });
    var item2 = new Item({
        name: "item2",
        price: 200
    });
    res.status(200).json([item1, item2])
};

/*
    Get Item
    METHOD: GET
    URL: /api/items/:id
    Response:
        [{ item }]
*/
exports.get = function(req, res) {
    var id = req.params.id;
    var item = new Item({
        name: id,
        price: 100
    });
    res.status(200).json(item);
};

/*
    Create Item
    METHOD: POST
    URL: /api/items
    Parameters:
        { name: name }
    Response:
        { message: "OK" }
*/
exports.create = function(req, res) {
    var username = req.account.username;
    var item = new Item(req.body);

    blockchain.chaincode.invoke.createItem([JSON.stringify(item)], username, function(err, data) {

    });
    res.status(200).json(item);
};

/*
    Sell Item
    METHOD: PUT
    URL: /api/items/:id/sell
    Parameters:
        { price: price }
    Response:
        { message: "OK" }
*/
exports.sell = function(req, res) {
    var username = req.account.username;
    var itemId = req.params.id;
    var price = req.body.price;

    blockchain.chaincode.invoke.sellItem([itemId, price], username, function(err, data) {

    });
    res.status(200).json(item);
};

/*
    Buy Item
    METHOD: PUT
    URL: /api/items/:id/buy
    Response:
        { message: "OK" }
*/
exports.buy = function(req, res) {
    var username = req.account.username;
    var itemId = req.params.id;

    blockchain.chaincode.invoke.buyItem([itemId, price], username, function(err, data) {

    });
    res.status(200).json(item);
};
