'use strict';

var shortid =  require('shortid');

/*
    {
        "name"                  :   String,
        "price"                 :   Integer
    }
*/
function Account(account) {
    for (var key in arguments){
        if(!arguments[key]){
            throw new Error("Incorrect arguments for new document.");
        }
    }

    // Attributes for item object
    // this.id                 = account.id || shortid.generate();
    this.username           = account.username;
    this.money              = account.money;
}

module.exports = Account;
