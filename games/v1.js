var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = 'mongodb://localhost:27017/swapzapp',
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  chalk = require('chalk'),
  ProgressBar = require('progress'),
  convert = require('./convert'),
  prices = require('./prices'),
  Product = require('../models').product,
  Catalog = require('../models').catalog,
  i = 0,
  colors = require('../colors');

var switchover = function(save, verbose, location) {
  return new Promise ((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      findItems(db).then((items) => {
        extractGamesFromItemsList(items).then((games) => {
          extractInventoriesFromGamesList(games).then((data) => {
            console.log(data)
            var gameInventory = [];
            var c = 0;
            var catalogs = [];
            Object.keys(data).forEach(inventoryName => {
              let games = new Catalog({name: "Games", color: colors.grey, products: data[inventoryName]});
              let catalog = new Catalog({name: inventoryName, color: colors.grey, index: c, catalogs: [games]});
              catalogs.push(catalog);
              c++;
            });
            let catalog = new Catalog({name: 'Video Games', color: colors.grey, catalogs})
            resolve([catalog]);
            db.close();
          });
        });
      });
    });
  });
};
var extractGamesFromItemsList = (items) => {
  return new Promise((resolve, reject) => {
    var games = [];
    items.forEach((item) => {
      if (item.name.startsWith("GAMES ")) {
        item.name = item.name.replace("GAMES ", "");
        games.push(item);
      } else if (item.name.startsWith("XBOX 360 ")) {
        games.push(item);
      };
    });
    resolve(games);
  });
};
var extractInventoriesFromGamesList = (games) => {
  return new Promise((resolve, reject) => {
    catalogs = {};
    games.forEach(game => {
      i++;
      var catalog = null;
      convert.consoles.every(data => {
        var name = game.name.toLowerCase();
        if (name.startsWith(data.original.toLowerCase() + " ")) {
          game.name = game.name.replace(new RegExp(data.original + " ", "i"), "");
          catalog = data.translation;
          return false;
        } else return true;
      });
      if (game.name.startsWith('The ')) game.name = game.name.replace('The ', '') + ", The";
      game.createdAt = game['created_at'];
      var product = new Product(game);
      if (catalog) {
        var productPrices = prices.getWith(game, catalog);
        product.prices = productPrices;
        if (!catalogs[catalog]) catalogs[catalog] = [];
        catalogs[catalog].push(product);
      } else {
        console.log(chalk.red('Error finding game catalog for', game.name));
      };
    });
    resolve(catalogs);
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

module.exports.switchover = switchover;
