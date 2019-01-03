let { MongoClient, ObjectId } = require('mongodb'),
  { join } = require('path'),
  assert = require('assert'),
  fs = require('fs'),
  cosmetic = require('cosmetic'),
  ProgressBar = require('progress'),
  convert = require('./convert'),
  createPrices = require('./createPrices'),
  createTags = require('./createTags'),
  { lib, models } = require('@gameroom/gameroom-kit'),
  { Import } = lib,
  { Option_Group, Product, Tag, Product_Tag } = models,
  i = 0,
  colors = require('../../colors'),
  consoles = require('./consoles'),
  { saveImportFiles } = require('../../helpers');

let result;

let switchover = (options) => {
  return new Promise ((resolve, reject) => {
    let dir = options._parents.switchover.dir || './switchover';
    MongoClient.connect(process.env.SWAPZAPP_MONGO_URI, (err, db) => {
      assert.equal(null, err);
      result = new Import();
      getResponse(db).then(() => {
        db.close();
        saveImportFiles(join(dir, 'games'), result);
        resolve(result);
      }).catch((err) => {
        db.close();
        reject(err);
      });
    });
  });
};
let getResponse = async (db) => {
  let items = await findItems(db);
  let games = extractGamesFromItemsList(items);
  let data = await extractInventoriesFromGamesList(games);
  return;
};
let extractGamesFromItemsList = (items) => {
  let games = [];
  for (let item of items) {
    if (item.name.startsWith("GAMES ")) {
      item.name = item.name.replace("GAMES ", "");
      games.push(item);
    } else if (item.name.startsWith("XBOX 360 ")) {
      games.push(item);
    };
  };
  return games;
};
let extractInventoriesFromGamesList = async (games) => {
  catalogs = {};
  let tags = {};
  for (let game of games) {
    // Get Catalog Name
    let catalog;
    for (let conversion of convert) {
      let name = game.name.toLowerCase();
      if (name.startsWith(`${conversion.original.toLowerCase()} `)) {
        game.name = game.name.replace(new RegExp(`${conversion.original.toLowerCase()} `, 'i'), '');
        catalog = conversion.translation;
        break;
      };
    };

    if (!catalog) {
      console.log(`${cosmetic.red('Error:')} finding game catalog for ${cosmetic.cyan(game.name)}`);
      continue;
    } else {
      game.subname = catalog;
    };

    if (game.name.startsWith('The ')) game.name = game.name.replace('The ', '') + ", The";
    game.created_at = game['created_at'];
    // Tags
    let tagNames = consoles[catalog].tags;
    let tags = createTags(tagNames);
    result.tags.push(...tags);
    // Product
    let product = new Product(game);
    product.tags = tagNames;
    result.products.push(product);
    let optionGroupNames = consoles[catalog].optionGroups
    let { option_groups, prices, price_option_groups } = createPrices(game, catalog, product, optionGroupNames);
    result.option_groups.push(...option_groups);
    result.prices.push(...prices);
    result.price_option_groups.push(...price_option_groups);
  };
  return;
};
let findInventories = (db) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection('inventories');
    collection.find({}).sort({name: 1}).toArray((err, inventories) => {
      assert.equal(err, null);
      resolve(inventories);
    });
  });
};
let findItems = (db, inventory_id) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection('items');
    collection.find({}).toArray((err, items) => {
      console.log(items.length)
      assert.equal(err, null);
      resolve(items);
    });
  });
};

module.exports = switchover;
