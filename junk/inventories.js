var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/swapzapp';
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');
var ProgressBar = require('progress');
// var items = require('./items');
var translations = require('./translations');

class Item {
  constructor(item) {
    this.name = item.name;
    this.priceCash = item['price_cash'];
    this.price = item['price'];
    this.createdAt = item['created_at'];
  };
};

var switchover = function(save, verbose, location) {
  return new Promise ((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      findItems(db).then((items) => {
        var inventory;
        extractGamesFromItemsList(items).then((games) => {
          extractInventoriesFromGamesList(games).then((inventories) => {
            resolve(inventories);
            // console.log(Object.keys(inventories), Object.keys(inventories).length);
            // Object.keys(inventories).forEach(inventoryName => {
            //   console.log(inventoryName);
            // });
            db.close();
          });
        });
      });
    });
  })

};
var extractGamesFromItemsList = (items) => {
  return new Promise((resolve, reject) => {
    var games = [];
    items.forEach((item) => {
      if (item.name.startsWith("GAMES ")) {
        item.name = item.name.replace("GAMES ", "");
        games.push(item);
      };
    });
    resolve(games);
  });
};
var extractInventoriesFromGamesList = (games) => {
  return new Promise((resolve, reject) => {
    var inventories = [];
    games.forEach(game => {
      var inventory = null;
      var name;
      translations.every(data => {
        var name = game.name.toLowerCase();
        if (name.startsWith(data.original.toLowerCase())) {
          name = game.name.replace(new RegExp(data.original + " ", "i"), "");
          game.name = name;
          inventory = data.translation;
          return false;
        } else return true;
      });
      var item = new Item(game);
      if (!inventories[inventory]) inventories[inventory] = [];
      inventories[inventory].push(item);
    });
    // inventories['null'].forEach(missing => {
    //   console.log(missing.name)
    // })
    resolve(inventories);
  });
};
var findInventories = function(db) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('inventories');
    collection.find({}).sort({name: 1}).toArray(function(err, inventories) {
      assert.equal(err, null);
      resolve(inventories);
    });
  });
};
var findItems = function(db, inventory_id) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('items');
    collection.find({}).toArray(function(err, items) {
      assert.equal(err, null);
      resolve(items);
    });
  });
};
var refactorItems = function(swapzapp) {
  return new Promise(function(resolve, reject) {
    var cashierfu = {};
    cashierfu = swapzapp;
    resolve(cashierfu);
  });
};
module.exports.switchover = switchover;
