const { createReadStream, createWriteStream, existsSync } = require('fs'),
  { join } = require('path'),
  ProgressBar = require('progress'),
  cosmetic = require('cosmetic'),
  parse = require('csv-parse'),
  { lib, models } = require('@gameroom/emporium'),
  { Option_Group, Price, Price_Option_Group, Product, Tag } = models,
  fastcsv = require('fast-csv'),
  { Import } = require('../../models'),
  typos = require('./typos'),
  { separateOptions, removeOptionsFromName } = require('./options'),
  createProduct = require('./createProduct'),
  createTags = require('./createTags'),
  createProperties = require('./createProperties'),
  createPrices = require('./createPrices'),
  // createOptionGroups = require('./createOptionGroups'),
  types = require('./types'),
  { createDirectories, pad, prepairForCsv, saveImportFiles, saveImportFilesToCSV } = require('../../helpers');

const catalogsChildren = {},
  catalogs = {},
  keys = [];

// const results = {
//   blurays: {},
//   num: {},
//   a: {},
//   b: {},
//   c: {},
//   d: {},
//   e: {},
//   f: {},
//   g: {},
//   h: {},
//   i: {},
//   j: {},
//   k: {},
//   l: {},
//   m: {},
//   n: {},
//   o: {},
//   p: {},
//   q: {},
//   r: {},
//   s: {},
//   t: {},
//   u: {},
//   v: {},
//   w: {},
//   x: {},
//   y: {},
//   z: {},
//   umds: {},
//   global: {}
// };

// const results = new Import();

let games = 0, i = 0;

let option_group_stream,
  product_stream,
  price_stream,
  price_option_group_stream,
  tag_stream;

const option_group_keys = Object.keys(new Option_Group()),
  product_keys = Object.keys(new Product()),
  price_keys = Object.keys(new Price()),
  price_option_group_keys = Object.keys(new Price_Option_Group()),
  tag_keys = Object.keys(new Tag());

const switchover = (options) => {
  return new Promise ((resolve, reject) => {

    const { file } = options;
    let dir = options._parents.switchover.dir || './switchover';
    dir = join(dir, 'movies');
    // if (existsSync(dir)) rimraf(dir);
    // createDirectories(dir);
    option_group_stream = createWriteStream(join(dir, 'option_groups.csv'));
    option_group_stream.write(`${option_group_keys.join()}\n`);
    product_stream = createWriteStream(join(dir, 'products.csv'));
    product_stream.write(`${product_keys.join()}\n`);
    price_stream = createWriteStream(join(dir, 'prices.csv'));
    price_stream.write(`${price_keys.join()}\n`);
    price_option_group_stream = createWriteStream(join(dir, 'price_option_groups.csv'));
    price_option_group_stream.write(`${price_option_group_keys.join()}\n`);
    tag_stream = createWriteStream(join(dir, 'tags.csv'));
    tag_stream.write(`${tag_keys.join()}\n`);
    // for (let key of Object.keys(results)) results[key] = new Import();
    createReadStream(file)
      .pipe(parse({delimiter: ','}))
      .on('data', async (row) => {
        process.stdout.write(`${i}\r`);
        if (keys.length === 0) {
          for (const key of row) keys.push(key.toLowerCase());
        } else {
          const object = parseRow(row);
          if (object.genre === 'Games') return games++;
          const data = await makeObject(object);
          pipeToFile(data);
        };
        i++;

      })
      .on('end', async () => {
        console.log('success!');
        // console.log(games, 'games skipped');
        // for (const key of Object.keys(results)) {
        //   console.log(key);
        //   const keyDir = join(dir, key);
        //   await saveImportFiles(keyDir, results[key], { products: 250000 });
        // };
        // await saveImportFilesToCSV(dir, results);
        // resolve(results);
      });
  });
};
const pipeToFile = (data) => {
  prepairForCsv(data);
  const {
    option_groups,
    prices,
    price_option_groups,
    products,
    tags
  } = data;
  for (const row of option_groups) {
    const values = [];
    for (const key of option_group_keys) values.push(row[key]);
    option_group_stream.write(`${values.join()}\n`);
  };
  for (const row of prices) {
    const values = [];
    for (const key of price_keys) values.push(row[key]);
    price_stream.write(`${values.join()}\n`);
  };
  for (const row of price_option_groups) {
    const values = [];
    for (const key of price_option_group_keys) values.push(row[key]);
    price_option_group_stream.write(`${values.join()}\n`);
  };
  for (const row of products) {
    const values = [];
    for (const key of product_keys) values.push(row[key]);
    product_stream.write(`${values.join()}\n`);
    // for (const [index, key] of product_keys.entries()) {
    //   product_stream.write(row[key] ? row[key] : '');
    //   if (index !== product_keys.length - 1) product_stream.write(',');
    // };
    // product_stream.write('\n');
    // values.push(row[key]);
    // product_stream.write(`${values.join()}\n`);
  };
  for (const row of tags) {
    const values = [];
    for (const key of tag_keys) values.push(row[key]);
    tag_stream.write(`${values.join()}\n`);
  };
};
const parseRow = (row) => {
  const object = {};
  for (const [index, key] of keys.entries()) object[key] = row[index];
  return object;
};
const makeObject = (object) => {
  object = typos.title(object);
  object = typos.genre(object);
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

  const product = createProduct(object);

  const { product_tags, tags } = createTags(object, product);
  product.tags = product_tags;
  // results.global.tags.push(...tags)
  // results.tags.push(...tags);

  product.properties = createProperties(object, product);

  // const prices = createPrices(object, product);

  // const catalog = getCatalog(object, product);

  // if (!results[catalog]) console.log(catalog)
  // results[catalog].prices.push(...prices);

  const { optionGroups, prices, priceOptionGroups } = createPrices(object, product);
  // console.log(optionGroups.length, prices.length, priceOptionGroups.length);

  // results.global.option_groups.push(...optionGroups);
  // results[catalog].prices.push(...prices);
  // results[catalog].price_option_groups.push(...priceOptionGroups);
  // results[catalog].products.push(product);

  // results.option_groups.push(...optionGroups);
  // results.prices.push(...prices);
  // results.price_option_groups.push(...priceOptionGroups);
  // results.products.push(product);

  return {
    option_groups: optionGroups,
    prices,
    price_option_groups: priceOptionGroups,
    products: [ product ],
    tags
  };
  // return results;
};
let getCatalog = (object, product) => {
  let catalog;
  if (object.type.includes('Blu-ray')) {
    catalog = 'blurays';
  } else if (object.type.includes('UMD')) {
    catalog = 'umds';
  } else {
    catalog = product.name.charAt(0).toLowerCase();
    if (!catalog.match(/[a-z]/i)) catalog = 'num';
  };
  return catalog;
};
const getDiscsFromType = (object) => {
  object.discs = object.type.length;
  if (object.type.includes('Book')) --object.discs;
  if (object.type.includes('Booklet')) --object.discs;
  if (object.type.includes('Digital Copy')) --object.discs;
  if (object.type.includes('4k')) --object.discs;
  return object;
};
const getDiscsFromName = (object) => {
  let name = object.name;
  let count = 0;
  while (name.includes('/')) {
    name = name.replace('/', '');
    count++;
  };
  object.discs += count
  return object;
};


module.exports = switchover;
