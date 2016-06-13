'use strict';

var shortid =  require('shortid');

/*
    {
        "name"                  :   String,
        "price"                 :   Integer
    }
*/
function Item(item) {
    for (var key in arguments){
        if(!arguments[key]){
            throw new Error("Incorrect arguments for new document.");
        }
    }

    // Attributes for item object
    this.id                 = shortid.generate();
    this.name               = item.name;
    this.price              = item.price;
    this.creationDate       = item.creationDate || new Date();
}

module.exports = Item;
