var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = 'mongodb://localhost:27017/swapzapp',
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  ProgressBar = require('progress'),
  convert = require('../games/convert'),
  models = require('../models'),
  Product = models.product,
  Price = models.price,
  Catalog = models.catalog,
  Entity = models.entity,
  colors = require('../colors');

var switchover = (save, verbose, location) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      getResponse(db).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  });
};
let getResponse = async (db) => {
  let items = await findItems(db);
  let catalog = new Catalog({name: "Other", color: colors.grey, index: 0});
  let objects = await extractGamesFromItemsList(items, catalog);
  db.close();
  let response = {
    name: "Other Products",
    objects
  };
  return response;
}
var extractGamesFromItemsList = (items, catalog) => {
  return new Promise((resolve, reject) => {
    var objects = [catalog];
    items.forEach((item) => {
      if (!item.name.startsWith("GAMES ") && !item.name.startsWith("XBOX 360 ")) {
        item.createdAt = item['created_at'];
        var product = new Product(item);
        product.color = colors.purple;
        product.catalog = catalog.uuid;
        let prices = createPriceEntities(item, product);
        objects.push(product);
        objects.push(...prices);
      };
    });
    resolve(objects);
  });
};
var createPriceEntities = (item, product) => {
  return [
    new Price({name: 'Buy In', amount: -item['price_cash'], index: 0, color: colors.blue, product: product.uuid}),
    new Price({name: 'Sale', amount: item['price'], index: 1, color: colors.green, product: product.uuid})
  ];;
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
