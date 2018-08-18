var fs = require('fs'),
  path = require('path'),
  ProgressBar = require('progress'),
  chalk = require('chalk'),
  parse = require('csv-parse'),
  util = require('util'),
  rimraf = require('rimraf'),
  { Import } = require('@infinitetoken/cashierfu-api-kit').models,
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
  result;

let games = 0;

var switchover = (options) => {
  return new Promise ((resolve, reject) => {
    let { file } = options;
    result = new Import();
    catalogs = catalogsProcessor.create();
    for (let key of Object.keys(catalogs)) result.catalogs.push(catalogs[key]);
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

          await makeCashierFuObject(object, result);
        };
        i++;
      })
      .on('end', async () => {
        console.log(games, 'games skipped')
        saveImportFiles('movies', result, { products: 250000 });
        resolve(result);
      });
  });
};
var makeObject = (row) => {
  var object = {};
  for (let [index, key] of keys.entries()) object[key] = row[index];
  return object;
};
var makeCashierFuObject = (object, result) => {
  object = typos.title(object);
  object.name = object['dvd_title'];
  object.discs = 1;
  object.edition = '';
  object.options = '';
  object.format = '';
  object.collection = '';
  object.anniversary = '';
  object.version = '';
  object.steelbook = false;
  object = options.removeFromName(object);
  if (object.options) {
    object = options.separate(object);
  } else {
    object.type = ['DVD'];
  };

  if (object.discs == 1) object = getDiscsFromType(object);

  var product = productsProcessor.create(object);
  // let tags = tagsProcessor.create(object, product);
  let properties = propertiesProcessor.create(object, product);
  product.info = JSON.stringify(properties, null, 2);

  let prices = pricesProcessor.create(object, product);

  getCatalog(object, product);

  result.products.push(product);
  // result.tags.push(...tags);
  // result.properties.push(...properties);
  result.prices.push(...prices);

  return result;
};
let getCatalog = (object, product) => {
  if (object.type.includes('Blu-ray')) {
    product.catalog = catalogs.blurays.uuid;
  } else if (object.type.includes('UMD')) {
    product.catalog = catalogs.umds.uuid;
  } else {
    let catalog = object.name.charAt(0).toLowerCase();
    if (!catalog.match(/[a-z]/i)) catalog = 'num';
    product.catalog = catalogs[catalog].uuid;
  };

  if (!catalogsChildren[product.catalog]) catalogsChildren[product.catalog] = 0;

  product.index = catalogsChildren[product.catalog];
  catalogsChildren[product.catalog]++;
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
