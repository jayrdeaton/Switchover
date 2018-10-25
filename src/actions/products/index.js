var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  { join } = require('path'),
  ProgressBar = require('progress'),
  convert = require('../games/convert'),
  { Catalog, Import, Price, Product } = require('@gameroom/gameroom-kit').models,
  { fractureArray, saveImportFiles } = require('../../helpers'),
  colors = require('../../colors');

let result;

var switchover = (options) => {
  return new Promise((resolve, reject) => {
    let dir = options._parents.switchover.dir || './switchover';
    MongoClient.connect(process.env.SWAPZAPP_MONGO_URI, (err, db) => {
      assert.equal(null, err);
      result = new Import();
      getResponse(db).then(() => {
        db.close();
        saveImportFiles(join(dir, 'products'), result);
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
