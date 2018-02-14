var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = 'mongodb://localhost:27017/swapzapp',
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  chalk = require('chalk'),
  ProgressBar = require('progress'),
  convert = require('./convert'),
  prices = require('./prices'),
  models = require('../models'),
  Product = models.product,
  Catalog = models.catalog,
  OptionGroup = models.optionGroup,
  PriceOptionGroup = models.priceOptionGroup;
  i = 0,
  colors = require('../colors'),
  consoles = require('./consoles');

var switchover = (save, verbose, location) => {
  return new Promise ((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      getResponse(db).then((response) => {
        db.close();
        resolve(response);
      }).catch((err) => {
        db.close();
        reject(err);
      });
    });
  });
};
let getResponse = async (db) => {
  let items = await findItems(db);
  let games = await extractGamesFromItemsList(items);
  let catalog = new Catalog({name: 'Video Games', color: colors.grey});
  let data = await extractInventoriesFromGamesList(games, catalog);
  var objects = [{
    name: 'Video Games',
    objects: [catalog]
  }];
  let keys = Object.keys(data);
  keys.sort();
  keys.forEach(inventory => {
    let chunk = {
      name: inventory,
      objects: []
    };
    chunk.objects.push(data[inventory].topCatalog);
    chunk.objects.push(data[inventory].catalog);
    chunk.objects.push(...data[inventory].optionGroups);
    chunk.objects.push(...data[inventory].objects);
    objects.push(chunk);
  });
  return objects;
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
var extractInventoriesFromGamesList = (games, parentCatalog) => {
  return new Promise((resolve, reject) => {
    catalogs = {};
    let index = 0;
    for (let game of games) {
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
      // console.log(catalog)
      if (game.name.startsWith('The ')) game.name = game.name.replace('The ', '') + ", The";
      game.createdAt = game['created_at'];
      var product = new Product(game);
      if (!catalogs[catalog]) {
        let topCatalog = new Catalog({name: catalog, color: colors.grey, index, catalog: parentCatalog.uuid});
        let optionGroups = [];
        let optionGroupCatalog = new Catalog({name: 'Option Groups', color: colors.grey, index: 0, catalog: topCatalog.uuid});
        optionGroups.push(optionGroupCatalog);
        for (let [index, name] of consoles[catalog].optionGroups.entries()) {
          let optionGroup = new OptionGroup({name, index, color: colors.blue, catalog: optionGroupCatalog.uuid});
          optionGroups.push(optionGroup);
        };

        let chunk = {
          topCatalog,
          objects: [],
          optionGroups
        };
        chunk.catalog = new Catalog({name: 'Games', color: colors.grey, index: 1, catalog: topCatalog.uuid});
        catalogs[catalog] = chunk;
        index++;
      };
      product.catalog = catalogs[catalog].catalog.uuid;
      product.index = catalogs[catalog].objects.length;
      product.color = colors.purple;
      catalogs[catalog].objects.push(product);
      let objects = prices.getWith(game, catalog, product, catalogs[catalog].optionGroups);
      catalogs[catalog].objects.push(...objects);
    };
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
