const { MongoClient, ObjectId } = require('mongodb'),
  assert = require('assert'),
  { join } = require('path'),
  ProgressBar = require('progress'),
  convert = require('../games/convert'),
  { lib, models } = require('@gameroom/emporium'),
  { Import } = require('../../models'),
  { Price, Product, Tag } = models,
  { fractureArray, saveImportFiles } = require('../../helpers'),
  colors = require('../../colors'),
  { promisify } = require('util'),
  typoList = require('./typoList'),
  tagList = require('./tagList');

const connect = promisify(MongoClient.connect);
let result;

const switchover = async (options) => {
  const dir = options._parents.switchover.dir || './switchover';
  const db = await MongoClient.connect(process.env.SWAPZAPP_MONGO_URI);
  result = new Import();
  await getResponse(db);
  saveImportFiles(join(dir, 'products'), result);
  db.close();
  return result;
};
const getResponse = async (db) => {
  generateTags();
  let items = await findItems(db);
  console.log('all items: ', items.length);
  items = extractProductsFromItemsList(items);
  console.log('items minus games: ', items.length);
  fixTypos(items);
  items = getTaggedItems(items);
  removeSpaces(items);
  console.log('tagged items: ', items.length);
  for (const item of items) {
    const variants = await findVariants(db, item._id);
    if (variants.length > 0) {
      for (const variant of variants) {
        // Create product from item and variant
        if (variant.adjustment_percentage || variant.adjustment_cash_percentage) console.log(item, variant, '\n\n');
        const product = new Product({
          info: `${item.description}\n${variant.description}`,
          name: `${item.name} | ${variant.name}`,
          subname: item.subname,
          tags: item.tags
        });
        const buyInPrice = new Price({
          amount: -(item.price_cash + variant.adjustment_cash * 100),
          name: 'Buy In',
          product: product.uuid
        });
        const salePrice = new Price({
          amount: item.price + variant.adjustment * 100,
          name: 'Sale',
          rank: 1000,
          product: product.uuid
        });
        result.products.push(product);
        result.prices.push(buyInPrice);
        result.prices.push(salePrice);
      };
    } else {
      // Create product from item only;
      const product = new Product({
        info: item.description,
        name: item.name,
        subname: item.subname,
        tags: item.tags,
        properties: {
          swapzapp_name: item.swapzapp_name
        }
      });
      const buyInPrice = new Price({
        amount: -(item.price_cash),
        name: 'Buy In',
        product: product.uuid
      });
      const salePrice = new Price({
        amount: item.price,
        name: 'Sale',
        rank: 1000,
        product: product.uuid
      });
      result.products.push(product);
      result.prices.push(buyInPrice);
      result.prices.push(salePrice);
    };
  };
  return;
};
const fixTypos = (items) => {
  for (const item of items) for (typo of typoList) if (item.name.includes(typo.input)) item.name = item.name.replace(new RegExp(typo.input, 'g'), typo.output);
};
const removeSpaces = (items) => {
  for (const item of items) {
    item.name.trim();
    do {
      item.name = item.name.replace(/  /g, ' ');
    } while (item.name.includes('  '));
  };
};
const extractProductsFromItemsList = (items) => {
  const products = []
  for (const item of items) if (!item.name.toLowerCase().startsWith('games ')) products.push(item);
  return products;
};
const getTaggedItems = (items) => {
  const taggedItems = [];
  for (const item of items) {
    item.swapzapp_name = item.name;
    item.tags = [];
    for (const tags of tagList) if (item.name.includes(tags.input)) {
      item.subname = tags.subname;
      item.name = item.name.replace(new RegExp(tags.input, 'g'), '');
      for (const tag of tags.output) if (!item.tags.includes(tag)) item.tags.push(tag);
    };
    if (item.tags.length > 0) {
      taggedItems.push(item);
    } else {
      if (!item.name.includes('misc item')) {
        item.subname = 'Other';
        item.tags.push('Other');
        taggedItems.push(item);
      };
    };
  };
  return taggedItems;
};
const generateTags = () => {
  const existingTags = [];
  for (const tags of tagList) for (const name of tags.output) if (!existingTags.includes(name)) {
    result.tags.push(new Tag({ name }));
    existingTags.push(name);
  };
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
    collection.find({ account_id: ObjectId('520a524451f0c12d32000001'), item_id: ObjectId(item_id) }).toArray((err, variants) => {
      assert.equal(err, null);
      resolve(variants);
    });
  });
};
module.exports = switchover;
