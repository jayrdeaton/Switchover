var { MongoClient, ObjectId } = require('mongodb'),
  { join } = require('path'),
  assert = require('assert'),
  url = 'mongodb://heroku_app17482906:bdjnq4u1dssloe53epj0ggbiq0@candidate.15.mongolayer.com:10169/swapzapp',
  fs = require('fs'),
  chalk = require('chalk'),
  ProgressBar = require('progress'),
  convert = require('./convert'),
  prices = require('./prices'),
  { Catalog, Import, Option_Group, Product, Tag, Product_Tag } = require('@gameroom/gameroom-api-kit').models,
  i = 0,
  colors = require('../../colors'),
  consoles = require('./consoles'),
  { saveImportFiles } = require('../../helpers');

let result;

var switchover = (options) => {
  return new Promise ((resolve, reject) => {
    let dir = options._parents.switchover.dir || './switchover';
    MongoClient.connect(url, (err, db) => {
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
  // let catalog = new Catalog({name: 'Video Games', color: colors.grey});
  // result.catalogs.push(catalog);
  let data = await extractInventoriesFromGamesList(games);
  result.catalogs.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    return 0;
  });
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
var extractInventoriesFromGamesList = async (games) => {
  catalogs = {};
  let tags = {};
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
      let gameCatalog = new Catalog({name: `${catalog}`, color: colors.grey, index: 1});
      // let optionGroupCatalog = new Catalog({name: `${catalog} Option Groups`, color: colors.grey, index: 0});
      // result.catalogs.push(optionGroupCatalog);
      let optionGroups = [];
      // for (let [index, name] of consoles[catalog].optionGroups.entries()) {
      //   let optionGroup = new Option_Group({name: `${catalog} ${name}`, index, color: colors.blue, catalog: gameCatalog.uuid});
      //   optionGroups.push(optionGroup);
      // };
      let chunk = {
        objects: []
        // optionGroups
      };
      chunk.catalog = gameCatalog;
      result.catalogs.push(chunk.catalog);
      catalogs[catalog] = chunk;
      // result.option_groups.push(...optionGroups);
      index++;
    };
    product.catalog = catalogs[catalog].catalog.uuid;
    product.index = catalogs[catalog].objects.length;
    product.color = colors.purple;
    // catalogs[catalog].objects.push(new ObjectWrapper({type: 'Product', object: product}));
    result.products.push(product);
    let objects = prices.getWith(game, catalog, product, catalogs[catalog].optionGroups);
    result.prices.push(...objects);

    if (!consoles[catalog].tags) console.log("ERR")
    for (let name of consoles[catalog].tags) {
      let tag;
      if (tags[name]) {
        tag = tags[name];
      } else {
        tag = new Tag({ name });
        tags[name] = tag;
        result.tags.push(tag);
      };
      let product_tag = new Product_Tag({ product: product.uuid, tag: tag.uuid });
      result.product_tags.push(product_tag);
    };

    // result.price_option_groups.push(...objects.priceOptionGroups);
  };
  return catalogs;
};
var findInventories = (db) => {
  return new Promise((resolve, reject) => {
    var collection = db.collection('inventories');
    collection.find({}).sort({name: 1}).toArray((err, inventories) => {
      assert.equal(err, null);
      resolve(inventories);
    });
  });
};
var findItems = (db, inventory_id) => {
  return new Promise((resolve, reject) => {
    var collection = db.collection('items');
    collection.find({}).toArray((err, items) => {
      assert.equal(err, null);
      resolve(items);
    });
  });
};

module.exports = switchover;
