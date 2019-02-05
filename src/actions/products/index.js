const { MongoClient, ObjectId } = require('mongodb'),
  assert = require('assert'),
  { join } = require('path'),
  ProgressBar = require('progress'),
  convert = require('../games/convert'),
  { Catalog, Import, Price, Product } = require('@gameroom/gameroom-kit').models,
  { fractureArray, saveImportFiles } = require('../../helpers'),
  colors = require('../../colors'),
  { promisify } = require('util'),
  tagList = require('./tagList'),
  consoles = require('../games/consoles');

const connect = promisify(MongoClient.connect);
let result;

const switchover = async (options) => {
  const dir = options._parents.switchover.dir || './switchover';
  const db = await MongoClient.connect(process.env.SWAPZAPP_MONGO_URI);
  result = new Import();
  await getResponse(db)
  db.close();
  // saveImportFiles(join(dir, 'products'), result);
  return result;
};
const getResponse = async (db) => {
  const items = await findItems(db);
  console.log(items.length);
  items = extractProductsFromItemsList(items);
  console.log(items.length);
  items = getTaggedItems(items);
  console.log(items.length);
  return;
}
const extractProductsFromItemsList = (items) => {
  const products = []
  for (const item of items) if (!item.name.toLowerCase().startsWith('games ')) products.push(item);
  return products;
};
const getTaggedItems = (items) => {
  const taggedItems = [];
  for (const item of items) {
    item.tags = [];
    const words = item.name.split(' ');
    for (const tag of tagList) {
      if (item.name.includes(tag.input)) {
        item.name = item.name.replace(`${tag.input} `, '');
        item.tags.push(tag.output);
        break;
      };
    };
    console.log(item.tags)
    for (const key of Object.keys(consoles)) {
      if (item.name.includes(`${key} `)) {
        item.name = item.name.replace(`${key} `, '');
        item.tags.push(...consoles[key].tags);
      };
    };
    if (item.tags.length > 0) console.log('item.name:', item.name, 'item.tags', item.tags, '');
    if (item.tags.length > 0) taggedItems.push(item);
  };
  return taggedItems;
};
const createPriceEntities = (item, product) => {
  result.prices.push(new Price({name: 'Buy In', amount: new String(-item['price_cash']), index: 0, color: colors.blue, product: product.uuid}));
  result.prices.push(new Price({name: 'Sale', amount: new String(item['price']), index: 1, color: colors.green, product: product.uuid, rank: 1000}));
};
const findItems = (db) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection('items');
    collection.find({ account_id: ObjectId('520a524451f0c12d32000001') }).toArray((err, items) => {
      assert.equal(err, null);
      resolve(items);
    });
  });
};
const findVariants = (db, item_id) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection('variants');
    collection.find({ item_id: ObjectId(item_id) }).toArray((err, variants) => {
      assert.equal(err, null);
      resolve(variants);
    });
  });
};
module.exports = switchover;
