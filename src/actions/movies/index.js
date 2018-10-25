var { createReadStream } = require('fs'),
  { join } = require('path'),
  ProgressBar = require('progress'),
  cosmetic = require('cosmetic'),
  parse = require('csv-parse'),
  util = require('util'),
  rimraf = require('rimraf'),
  { lib, models } = require('@gameroom/gameroom-kit'),
  { Import } = lib,
  // { Catalog } = models,
  typos = require('./typos'),
  { separateOptions, removeOptionsFromName } = require('./options'),
  createProduct = require('./createProduct'),
  createTags = require('./createTags'),
  createProperties = require('./createProperties'),
  createPrices = require('./createPrices'),
  createOptionGroups = require('./createOptionGroups'),
  types = require('./types'),
  { pad, saveImportFiles } = require('../../helpers');

rimraf = util.promisify(rimraf);

let catalogsChildren = {},
  catalogs = {},
  keys = [],
  i = 0;

let results = {
  blurays: {},
  num: {},
  a: {},
  b: {},
  c: {},
  d: {},
  e: {},
  f: {},
  g: {},
  h: {},
  i: {},
  j: {},
  k: {},
  l: {},
  m: {},
  n: {},
  o: {},
  p: {},
  q: {},
  r: {},
  s: {},
  t: {},
  u: {},
  v: {},
  w: {},
  x: {},
  y: {},
  z: {},
  umds: {},
  global: {}
};

let games = 0;

var switchover = (options) => {
  return new Promise ((resolve, reject) => {
    let { file } = options;
    let dir = options._parents.switchover.dir || './switchover';
    dir = join(dir, 'movies');
    for (let key of Object.keys(results)) results[key] = new Import();
    createReadStream(file)
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
        // console.log(games, 'games skipped');
        for (let key of Object.keys(results)) {
          console.log(key);
          let keyDir = join(dir, key);
          await saveImportFiles(keyDir, results[key], { products: 250000 });
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
  object = removeOptionsFromName(object);
  if (object.options) {
    object = separateOptions(object);
  } else {
    object.type = ['DVD'];
  };

  if (object.discs == 1) object = getDiscsFromType(object);

  var product = createProduct(object);

  let { product_tags, tags } = createTags(object, product);
  product.tags = product_tags;
  results.global.push(...tags)

  product.properties = createProperties(object, product);

  let prices = createPrices(object, product);
  results[catalog].prices.push(...prices);

  let { optionGroups, priceOptionGroups } = createOptionGroups(object, product, prices);
  results.global.option_groups.push(...optionGroups);
  results[catalog].price_option_groups.push(...priceOptionGroups);

  results[catalog].products.push(product);

  return results;
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
