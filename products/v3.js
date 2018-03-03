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
  Wrapper = models.wrapper,
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
  return objects;
}
var extractGamesFromItemsList = (items, catalog) => {
  return new Promise((resolve, reject) => {
    let wrapper = new Wrapper({type: 'Catalog', object: catalog});
    var objects = [wrapper];
    items.forEach((item) => {
      if (!item.name.startsWith("GAMES ") && !item.name.startsWith("XBOX 360 ")) {
        item.createdAt = item['created_at'];
        var product = new Product(item);
        product.color = colors.purple;
        product.catalog = catalog.uuid;
        let prices = createPriceEntities(item, product);
        wrapper = new Wrapper({type: 'Product', object: product });
        objects.push(wrapper);
        for (let price of prices) {
          wrapper = new Wrapper({type: 'Price', object: price });
          objects.push(wrapper);
        };
      };
    });
    resolve(objects);
  });
};
var createPriceEntities = (item, product) => {
  return [
    new Price({name: 'Buy In', amount: new String(-item['price_cash'] / 100), index: 0, color: colors.blue, product: product.uuid}),
    new Price({name: 'Sale', amount: new String(item['price'] / 100), index: 1, color: colors.green, product: product.uuid})
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
