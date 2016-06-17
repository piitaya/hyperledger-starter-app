'use strict';

var Account = require('./account.model');
var blockchain = require('../../blockchain');

/*
    Create account
    METHOD: POST
    URL: /api/account
    Response:
        { message: "OK" }
*/
exports.create = function(req, res) {
    var account = new Account({
        username: req.account.username,
        money: 1000
    });

    blockchain.chaincode.invoke.createAccount([JSON.stringify(account)], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else {
            res.status(200).json({message: "OK"});
        }
    });
};

/*
    Get the account detail
    METHOD: GET
    URL: /api/account
    Response:
        [{ account }]
*/
exports.get = function(req, res) {

    console.log(req.account.username);
    blockchain.chaincode.query.getAccount([req.account.username], function(err, data) {
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else if (!data || data == "null") {
            res.status(204).json({});
        }
        else {
            var account = new Account(JSON.parse(data));
            res.status(200).json(account);
        }
    });
};
