var { MongoClient, ObjectId } = require('mongodb'),
  assert = require('assert'),
  url = 'mongodb://localhost:27017/swapzapp',
  fs = require('fs'),
  chalk = require('chalk'),
  ProgressBar = require('progress'),
  convert = require('./convert'),
  prices = require('./prices'),
  { Catalog, Import, Option_Group, Product } = require('@infinitetoken/cashierfu-api-kit').models,
  i = 0,
  colors = require('../../colors'),
  consoles = require('./consoles'),
  { saveFile } = require('../../helpers');

let result;

var switchover = (options) => {
  return new Promise ((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      result = new Import();
      getResponse(db).then(() => {
        db.close();
        saveFile('games', JSON.stringify(result));
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
  let catalog = new Catalog({name: 'Video Games', color: colors.grey});
  result.catalogs.push(catalog);
  let data = await extractInventoriesFromGamesList(games, catalog);
  // var objects = [new ImportWrapper({objects: [new ObjectWrapper({type: 'Catalog', object: catalog})], priority: true})];
  // let keys = Object.keys(data);
  // keys.sort();
  // keys.forEach(inventory => {
  //   let chunk = [];
  //   chunk.push(data[inventory].topCatalog);
  //   chunk.push(data[inventory].catalog);
  //   chunk.push(...data[inventory].optionGroups);
  //   chunk.push(...data[inventory].objects);
  //   objects.push(new ImportWrapper({objects: chunk}));
  // });
  return;
};
var extractGamesFromItemsList = (items) => {
  var games = [];
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
var extractInventoriesFromGamesList = (games, parentCatalog) => {
  return new Promise((resolve, reject) => {
    catalogs = {};
    let index = 0;
    for (let game of games) {
      // Get Catalog Name
      var catalog;
      for (let conversion of convert) {
        var name = game.name.toLowerCase();
        if (name.startsWith(conversion.original.toLowerCase() + ' ')) {
          game.name = game.name.replace(new RegExp(conversion.original + " ", "i"), "");
          catalog = conversion.translation;
          break;
        };
      };
      if (!catalog) {
        console.log(chalk.red('Error finding game catalog for', game.name));
        continue;
      };
      if (game.name.startsWith('The ')) game.name = game.name.replace('The ', '') + ", The";
      game.createdAt = game['created_at'];
      var product = new Product(game);
      if (!catalogs[catalog]) {
        let topCatalog = new Catalog({name: catalog, color: colors.grey, index, catalog: parentCatalog.uuid});
        let optionGroupCatalog = new Catalog({name: 'Option Groups', color: colors.grey, index: 0, catalog: topCatalog.uuid});
        let optionGroups = [];
        optionGroups.push(optionGroupCatalog);
        for (let [index, name] of consoles[catalog].optionGroups.entries()) {
          let optionGroup = new Option_Group({name, index, color: colors.blue, catalog: optionGroupCatalog.uuid});
          optionGroups.push(optionGroup);
        };
        let chunk = {
          topCatalog,
          objects: [],
          optionGroups
        };
        chunk.catalog = new Catalog({name: 'Games', color: colors.grey, index: 1, catalog: topCatalog.uuid});
        catalogs[catalog] = chunk;
        result.option_groups.push(...optionGroups);
        index++;
      };
      product.catalog = catalogs[catalog].catalog.uuid;
      product.index = catalogs[catalog].objects.length;
      product.color = colors.purple;
      // catalogs[catalog].objects.push(new ObjectWrapper({type: 'Product', object: product}));
      result.products.push(product);
      let objects = prices.getWith(game, catalog, product, catalogs[catalog].optionGroups);
      result.prices.push(...objects.prices);
      result.price_option_groups.push(...objects.priceOptionGroups);
    };
    resolve(catalogs);
  });
};
var findInventories = (db) => {
  return new Promise((resolve, reject) => {
    var collection = db.collection('inventories');
    collection.find({}).sort({name: 1}).toArray(function(err, inventories) {
      assert.equal(err, null);
      resolve(inventories);
    });
  });
};
var findItems = (db, inventory_id) => {
  return new Promise((resolve, reject) => {
    var collection = db.collection('items');
    collection.find({}).toArray(function(err, items) {
      assert.equal(err, null);
      resolve(items);
    });
  });
};

module.exports = switchover;
