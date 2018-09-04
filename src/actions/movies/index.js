var fs = require('fs'),
  path = require('path'),
  ProgressBar = require('progress'),
  chalk = require('chalk'),
  parse = require('csv-parse'),
  util = require('util'),
  rimraf = require('rimraf'),
  { Import, Catalog } = require('@infinitetoken/cashierfu-api-kit').models,
  typos = require('./typos'),
  options = require('./options'),
  productsProcessor = require('./products'),
  catalogsProcessor = require('./catalogs'),
  tagsProcessor = require('./tags'),
  propertiesProcessor = require('./properties'),
  pricesProcessor = require('./prices'),
  types = require('./types'),
  { pad, saveImportFiles } = require('../../helpers');

rimraf = util.promisify(rimraf);

let catalogsChildren = {},
  catalogs = {},
  keys = [],
  i = 0,
  results = {};

let games = 0;

// let switchover = async () => {
//   let alpha = new Catalog();
//   let beta = new Catalog();
//   alpha.color.alpha = 5;
//   console.log(beta.color.alpha)
// };

var switchover = (options) => {
  return new Promise ((resolve, reject) => {
    let { file } = options;
    catalogs = catalogsProcessor.create();
    for (let key of Object.keys(catalogs)) results[key] = new Import({ catalogs: [ catalogs[key] ] });
    results.global = new Import();
    fs.createReadStream(file)
      .pipe(parse({delimiter: ','}))
      .on('data', async (row) => {
        if (keys.length === 0) {
          for (let key of row) keys.push(key.toLowerCase());
        } else {
          let object = makeObject(row, catalogs);

          if (object.genre === 'Games') {
            games++;
            return;
          };

          await makeCashierFuObject(object);
        };
        i++;
      })
      .on('end', async () => {
        console.log(games, 'games skipped')
        for (let key of Object.keys(results)) {
          console.log(key);
          await saveImportFiles(key, results[key], { products: 250000 });
        };
        resolve(results);
      });
  });
};
var makeObject = (row) => {
  var object = {};
  for (let [index, key] of keys.entries()) object[key] = row[index];
  return object;
};
var makeCashierFuObject = (object) => {
  object = typos.title(object);
  object.name = object['dvd_title'];
  // object.discs;
  // object.edition = '';
  object.options = '';
  // object.format = '';
  // object.collection = '';
  // object.anniversary = '';
  // object.version = '';
  // object.steelbook = false;
  object = options.removeFromName(object);
  if (object.options) {
    object = options.separate(object);
  } else {
    object.type = ['DVD'];
  };

  if (object.discs == 1) object = getDiscsFromType(object);

  var product = productsProcessor.create(object);
  let product_tags = tagsProcessor.create(object, product, results.global);
  let properties = propertiesProcessor.create(object, product);
  product.info = JSON.stringify(properties, null, 2);

  let prices = pricesProcessor.create(object, product);

  let catalog = getCatalog(object, product);
  results[catalog].products.push(product);
  results[catalog].product_tags.push(...product_tags);
  // result.tags.push(...tags);
  // result.properties.push(...properties);
  results[catalog].prices.push(...prices);

  return results;
};
let getCatalog = (object, product) => {
  let catalog;
  if (object.type.includes('Blu-ray')) {
    catalog = 'blurays';
    product.catalog = catalogs.blurays.uuid;
  } else if (object.type.includes('UMD')) {
    catalog = 'umds';
    product.catalog = catalogs.umds.uuid;
  } else {
    catalog = object.name.charAt(0).toLowerCase();
    if (!catalog.match(/[a-z]/i)) catalog = 'num';
    product.catalog = catalogs[catalog].uuid;
  };

  if (!catalogsChildren[product.catalog]) catalogsChildren[product.catalog] = 0;

  product.index = catalogsChildren[product.catalog];
  catalogsChildren[product.catalog]++;
  return catalog;
};
var getDiscsFromType = (object) => {
  object.discs = object.type.length;
  if (object.type.includes('Book')) --object.discs;
  if (object.type.includes('Booklet')) --object.discs;
  if (object.type.includes('Digital Copy')) --object.discs;
  if (object.type.includes('4k')) --object.discs;
  return object;
};
var getDiscsFromName = (object) => {
  var name = object.name;
  var count = 0;
  while (name.includes('/')) {
    name = name.replace('/', '');
    count++;
  };
  object.discs += count
  return object;
};


module.exports = switchover;
