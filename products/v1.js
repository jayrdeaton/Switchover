let MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = 'mongodb://localhost:27017/swapzapp',
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  ProgressBar = require('progress'),
  convert = require('../games/convert'),
  Product = require('../models').product,
  Price = require('../models').price,
  Catalog = require('../models').catalog;

var switchover = function(save, verbose, location) {
  return new Promise ((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      findItems(db).then((items) => {
        extractGamesFromItemsList(items).then((products) => {
          let catalog = new Catalog({name: "Other", color: 'grey', index: 0, products})
          resolve([catalog]);
          db.close();
        });
      });
    });
  });
};
var extractGamesFromItemsList = (items) => {
  return new Promise((resolve, reject) => {
    var products = [];
    items.forEach((item) => {
      if (!item.name.startsWith("GAMES ") && !item.name.startsWith("XBOX 360 ")) {
        item.createdAt = item['created_at'];
        item.color = 'purple';
        var product = new Product(item);
        product.tags = [];
        product.prices = createPrices(item);
        products.push(product);
      };
    });
    resolve(products);
  });
};
var createPrices = (item) => {
  return [
    new Price({name: 'Buy In', amount: -item['price_cash'], index: 0, color: 'blue'}),
    new Price({name: 'Sale', amount: item['price'], index: 1, color: 'green'})
  ];
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
