'use strict';

var Account = require('./account.model');
var blockchain = require('../../blockchain')
/*
    Create account
    METHOD: POST
    URL: /api/account
    Response:
        { account }
*/

exports.create = function(req, res) {
    var account = new Account({
        username: "username1",
        money: 100
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
    blockchain.chaincode.query.getAccount(['username1'], function(err, data){
        if (err) {
            res.status(500).json({message: "Internal Error"});
        }
        else {
            var account = new Account(JSON.parse(data));
            res.status(200).json(account);
        }
    });
};
