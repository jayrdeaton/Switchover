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
  optionGroupsProcessor = require('./optionGroups'),
  { pad } = require('../../helpers'),
  i;

rimraf = util.promisify(rimraf);

var catalogsChildren = {};
var catalogs = {};
var keys = [];
var dvdsCount = 0;

let fileCounts = {
  catalogs: 0,
  option_groups: 0,
  prices: 0,
  products: 0,
  properties: 0,
  tags: 0
};
// let result;

var switchover = (data, csvFile) => {
  return new Promise ((resolve, reject) => {
    let objects = [];
    catalogs = catalogsProcessor.create();
    fs.createReadStream(csvFile)
      .pipe(parse({delimiter: ','}))
      .on('data', async (row) => {
        if (i == undefined || row.length !== keys.length) {
          setKeys(row);
          i = 0;
        } else {
          let object = makeObject(row, catalogs);
          objects.push(object);
          // result.products.push(...data.products);
          // result.option_groups.push(...data.option_groups);
          // result.tags.push(...data.tags);
          // result.properties.push(...data.properties);
          // result.prices.push(...data.prices);
        };
        // console.log(i)
        // if (i >= 50000) {
        //   console.log(i);
        //   result = null;
        //   result = new Import();
        //   i = 0;
        // };
        i++;
        // console.log(i);
      })
      .on('end', async () => {
        let dir = './switchover';
        await rimraf(dir);
        fs.mkdirSync(dir);
        let lengths = {
          catalogs: 0,
          option_groups: 0,
          prices: 0,
          products: 0,
          properties: 0,
          tags: 0
        };
        var result = {
          catalogs: [],
          products: [],
          option_groups: [],
          tags: [],
          properties: [],
          prices: []
        };
        let i = 0;
        while(objects.length > 0) {
          let object = objects.pop();
          await makeCashierFuObject(object, result);
          // console.log(objects.length);
          i++;
          if (i >= 20000) {
            lengths.catalogs += result.catalogs.length;
            lengths.option_groups += result.option_groups.length;
            lengths.prices += result.prices.length;
            lengths.products += result.products.length;
            lengths.properties += result.properties.length;
            lengths.tags += result.tags.length;
            // console.log(i);
            // await timeout(5000);

            // SAVE
            await saveResult(result);

            result = undefined;
            result = {
              catalogs: [],
              products: [],
              option_groups: [],
              tags: [],
              properties: [],
              prices: []
            };
            i = 0;
            // console.log(result);
          };
          // console.log(objects.length);
        };
        // let results = [];
        // let total = 0;
        // let head = new ImportWrapper();
        Object.keys(catalogs).forEach((key) => {
          result.catalogs.push(catalogs[key]);
          // let result = [];
          // head.objects.push(new ObjectWrapper({type: 'Catalog', object: catalogs[key]}));
          // let n = 0;
          // if (catalogsChildren[catalogs[key].uuid]) {
          //   let children = catalogsChildren[catalogs[key].uuid];
          //   total += children.length;
          //   let i = 0;
          //   let result = new ImportWrapper();
          //   for (let child of children) {
          //     n++;
          //     i++;
          //     if (i >= 10000 && child.type == 'Product') {
          //       results.push(result);
          //       result = new ImportWrapper();
          //       i = 0;
          //     };
          //     result.objects.push(child);
          //   };
          //   results.push(result);
          // };
          // console.log(chalk.green(`${catalogs[key].name} | ${n}`));
        });
        lengths.catalogs += result.catalogs.length;
        lengths.option_groups += result.option_groups.length;
        lengths.prices += result.prices.length;
        lengths.products += result.products.length;
        lengths.properties += result.properties.length;
        lengths.tags += result.tags.length;

        // SAVE
        await saveResult(result);

        // results.unshift(head);
        // console.log(`${total} Objects`);
        // console.log(results.length);
        resolve(result);
      });
  });
};
var setKeys = (objectKeys) => {
  objectKeys.forEach((key) => {
    keys.push(key.toLowerCase());
  });
};

var makeObject = (row) => {
  var object = {};
  keys.forEach((key, index) => {
    object[key] = row[index];
  });
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
  object = checkObject(object);
  if (object.discs == 1) object = getDiscsFromType(object);
  // object = getDiscsFromName(object);
  var product = productsProcessor.create(object);
  let tags = tagsProcessor.create(object, product);
  let properties = propertiesProcessor.create(object, product);
  let prices = pricesProcessor.create(object, product);

  if (object.type.includes('Blu-ray') || object.type.includes('Blu-ray 3D')) {
    // console.log('blu-ray option groups');
  } else if (object.type.includes('UMD')) {
    // console.log('umd option groups');
  } else {
    // console.log('dvd option groups');
  };


  getCatalog(object, product);

  let optionGroups = optionGroupsProcessor.create(object, catalogs);
  result.products.push(product);
  // resultProducts.push(product);
  // resultOptionGroups.push(...optionGroups);
  result.option_groups.push(...optionGroups);
  // resultTags.push(...tags);
  result.tags.push(...tags);
  // resultProperties.push(...properties);
  result.properties.push(...properties);
  // resultPrices.push(...prices);
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
  if (!catalogsChildren[product.catalog]) {
    catalogsChildren[product.catalog] = [];
  };
  product.index = catalogsChildren[product.catalog].length;

};
var checkObject = (object) => {
  return object;
};
var getDiscsFromType = (object) => {
  object.discs = object.type.length;
  if (object.type.includes('Book')) --object.discs;
  if (object.type.includes('Digital Copy')) --object.discs;
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

let timeout = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

let saveResult = async (data) => {
  var dir = './switchover';
  for (let key of Object.keys(data)) {
    if (data[key].length === 0) continue;
    // let arrays = fractureArray(data[key], 10000);
    // let padding = arrays.length.toString().length;
    let i = pad(fileCounts[key], 2);
    fileCounts[key]++;
    let fileData = {};
    fileData[key] = data[key];
    fs.writeFileSync(path.resolve(`${dir}/${key}_${i}.json`), JSON.stringify(fileData, null, 2));
  };
};

module.exports = switchover;
