var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = 'mongodb://localhost:27017/swapzapp',
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  ProgressBar = require('progress'),
  convert = require('../games/convert'),
  { Catalog, Import, Price, Product } = require('@infinitetoken/cashierfu-api-kit').models,
  { fractureArray, saveImportFiles } = require('../../helpers'),
  colors = require('../../colors');

let result;

var switchover = (data) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      result = new Import();
      getResponse(db).then(() => {
        db.close();
        saveImportFiles('products', result);
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  });
};
let getResponse = async (db) => {
  let items = await findItems(db);
  let catalog = new Catalog({name: "Other", color: colors.grey, index: 0});
  result.catalogs.push(catalog);
  await extractGamesFromItemsList(items, catalog);
  return;
}
var extractGamesFromItemsList = (items, catalog) => {
  return new Promise((resolve, reject) => {
    items.forEach((item) => {
      if (!item.name.startsWith("GAMES ") && !item.name.startsWith("XBOX 360 ")) {
        item.created_at = item['created_at'];
        var product = new Product(item);
        product.color = colors.purple;
        product.catalog = catalog.uuid;
        createPriceEntities(item, product);
        result.products.push(product);
      };
    });
    resolve();
  });
};
var createPriceEntities = (item, product) => {
  result.prices.push(new Price({name: 'Buy In', amount: new String(-item['price_cash']), index: 0, color: colors.blue, product: product.uuid}));
  result.prices.push(new Price({name: 'Sale', amount: new String(item['price']), index: 1, color: colors.green, product: product.uuid, rank: 1000}));
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
module.exports = switchover;
