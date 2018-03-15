var fs = require('fs'),
  ProgressBar = require('progress'),
  chalk = require('chalk'),
  parse = require('csv-parse'),
  typos = require('./typos'),
  options = require('./options'),
  productsProcessor = require('./products'),
  catalogsProcessor = require('./catalogs'),
  tagsProcessor = require('./tags'),
  propertiesProcessor = require('./properties'),
  pricesProcessor = require('./prices'),
  types = require('./types'),
  optionGroups = require('./optionGroups'),
  models = require('../models'),
  ObjectWrapper = models.objectWrapper,
  ImportWrapper = models.importWrapper,
  i = 0;

var catalogsChildren = {};
var catalogs = {};
var keys = [];
var dvdsCount = 0;

var switchover = function(csvFile) {
  return new Promise ((resolve, reject) => {
    catalogs = catalogsProcessor.create();
    fs.createReadStream(csvFile)
      .pipe(parse({delimiter: ','}))
      .on('data', (row) => {
        if (i === 0 || row.length !== keys.length) {
          setKeys(row);
        } else {
          makeObject(row, catalogs);
        };
        i++;
      })
      .on('end',function() {
        let results = [];
        let total = 0;
        let head = new ImportWrapper();
        Object.keys(catalogs).forEach((key) => {
          let result = [];
          head.objects.push(new ObjectWrapper({type: 'Catalog', object: catalogs[key]}));
          let n = 0;
          if (catalogsChildren[catalogs[key].uuid]) {
            let children = catalogsChildren[catalogs[key].uuid];
            total += children.length;
            let i = 0;
            let result = new ImportWrapper();
            for (let child of children) {
              n++;
              i++;
              if (i >= 10000 && child.type == 'Product') {
                results.push(result);
                result = new ImportWrapper();
                i = 0;
              };
              result.objects.push(child);
            };
            results.push(result);
          };
          console.log(chalk.green(`${catalogs[key].name} | ${n}`));
        });
        results.unshift(head);
        console.log(`${total} Objects`);
        console.log(results.length);
        resolve(results);
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
  // getOptionGroups();
  // let newOptionGroups = optionGroups.create(object, catalogs);
  // console.log(newOptionGroups);

  catalogsChildren[product.catalog].push(new ObjectWrapper({type: 'Product', object: product}));

  // catalogsChildren[product.catalog].push(...tags);

  // catalogsChildren[product.catalog].push(...properties);
  // for (let property of properties) {
  //   catalogsChildren[product.catalog].push(property);
  // };
  // catalogsChildren[product.catalog].push(...prices);
  for (let price of prices) {
    catalogsChildren[product.catalog].push(price);
  };
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
module.exports.switchover = switchover;
