'use strict';

var shortid =  require('shortid');

/*
    {
        "id"                    :   String,
        "name"                  :   String,
        "price"                 :   Integer,
        "inMarket"              :   Bool,
        "owner"                 :   String
    }
*/
function Thing(thing) {
    for (var key in arguments){
        if(!arguments[key]){
            throw new Error("Incorrect arguments for new document.");
        }
    }

    // Attributes for thing object
    this.id                 = thing.id || shortid.generate();
    this.name               = thing.name;
    this.price              = thing.price;
    this.inMarket           = thing.inMarket ? true : false;
    this.owner              = thing.owner;
}

module.exports = Thing;
