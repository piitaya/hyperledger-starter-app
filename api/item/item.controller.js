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
