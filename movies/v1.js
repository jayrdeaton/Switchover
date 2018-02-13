var fs = require('fs'),
  ProgressBar = require('progress'),
  parse = require('csv-parse'),
  typos = require('./typos'),
  prices = require('./prices'),
  options = require('./options'),
  Product = require('../models').product,
  Catalog = require('../models').catalog,
  i = 0;

var catalogs = {
  'DVDs': {},
  'Blu-Rays': [],
  'UMDs': []
};
var keys = [];
var dvdsCount = 0;

var switchover = function(csvFile) {
  return new Promise ((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(parse({delimiter: ','}))
      .on('data', function(row) {
        if (i === 0 || row.length !== keys.length) {
          setKeys(row);
        } else {
          makeObjects(row);
        };
        i++;
      })
      .on('end',function() {
        var dvdCatalogs = [];
        var index = 0;
        Object.keys(catalogs.DVDs).forEach((key) => {
          var catalog = new Catalog({name: key, index, color: "grey", products: catalogs.DVDs[key]});
          dvdCatalogs.push(catalog);
          index++;
        });
        var catalog = new Catalog({name: "Movies", color: "grey", catalogs: [
          new Catalog({name: "DVDs", index: 0, color: "grey", catalogs: dvdCatalogs}),
          new Catalog({name: "Blu-rays", index: 1, color: "grey", products: catalogs['Blu-Rays']}),
          new Catalog({name: "UMDs", index: 2, color: "grey", products: catalogs.UMDs})
        ]})
        console.log('dvd', dvdsCount);
        console.log('blu-ray', catalogs['Blu-Rays'].length);
        console.log('umd', catalogs.UMDs.length);
        resolve([catalog]);
      });
  });
};
var setKeys = (objectKeys) => {
  objectKeys.forEach((key) => {
    keys.push(key.toLowerCase());
  })
};
var makeObjects = (row) => {
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
  var product = createProduct(object);
  product.prices = prices.create(product, object);
  if (product.tags.includes('Blu-ray')) {
    catalogs['Blu-Rays'].push(product);
    // product.catalog = 'Blu-Rays';
  } else if (product.tags.includes('UMD')) {
    catalogs.UMDs.push(product);
    // product.catalog = 'UMDs';
  } else {
    let subCatalog = object.name.charAt(0).toUpperCase();
    if (!subCatalog.match(/[a-z]/i)) subCatalog = '#';
    if (!catalogs.DVDs[subCatalog]) {
      catalogs.DVDs[subCatalog] = [];
    };
    catalogs.DVDs[subCatalog].push(product);
    // product.catalog = subCatalog;
    dvdsCount++;
  };
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

var createProduct = (object) => {
  var product = new Product(object);
  if (object.edition) product.name += ' ' + object.edition;
  product.tags = [object.genre, object.rating];
  object.type.forEach((type) => {
    product.tags.push(type);
  });
  if (object.discs > 1) product.tags.push('Multidisc');
  if (object.format) product.tags.push(object.format);
  if (object.steelbook) product.tags.push("Steelbook");
  if (object.aspect && object.aspect !== "VAR") product.tags.push(object.aspect);
  product.identifier = object.upc;
  product.index = i;
  product.properties = getPropertiesFromObject(object)
  product.color = 'purple';
  // console.log(product.tags)
  // if (product.tags) console.log(product)
  return product;
};
var getPropertiesFromObject = (object) => {
  var properties = {};
  // console.log("|")
  // Object.keys(object).forEach((key) => {
  //   console.log(key)
  // });
  // console.log("|")
  if (object.studio) properties.studio = object.studio;
  if (object.released) properties.released = object.released;
  // if (object.released) console.log(properties.released);
  properties.releaseDate = object['dvd_releasedate'];
  if (object.discs > 1) properties.discs = object.discs;
  if (object.collection) properties.version = object.collection
  if (object.anniversary && properties.version) {
    properties.version += " " + object.anniversary;
  } else if (object.anniversary) properties.version = object.anniversary;
  if (object.version && properties.version) {
    properties.version += " " + object.version;
  } else if (object.version) properties.version = object.version;
  if (object.steelbook && properties.version) {
    properties.version += " Steelbook";
  } else if (object.steelbook) properties.version = "Steelbook"
  return properties;
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
