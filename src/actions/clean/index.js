let { MongoClient, ObjectId } = require('mongodb'),
  { join } = require('path'),
  assert = require('assert'),
  fs = require('fs'),
  cosmetic = require('cosmetic'),
  ProgressBar = require('progress'),
  { lib, models } = require('@gameroom/emporium'),
  { Import } = require('../../models'),
  { Option_Group, Product, Tag, Product_Tag } = models,
  i = 0,
  colors = require('../../colors'),
  { saveImportFiles } = require('../../helpers'),
  { promisify } = require('util');

let connect = promisify(MongoClient.connect);
let total = 0;

let switchover = async (options) => {
  let dir = options._parents.switchover.dir || './switchover';

  let db = await connect(process.env.SWAPZAPP_MONGO_URI);
  await getResponse(db)
  db.close();
  return;
};
let getResponse = async (db) => {
  let tables = [
    'activities',
    'certificates',
    'components',
    'conditions',
    'customers',
    'inventories',
    'items',
    'locations',
    'purchases',
    'repairs',
    'reports',
    'sales',
    'stores',
    'tills',
    'timecards',
    'units',
    'users',
    'variants'
  ];
  for (let table of tables) await removeItems(db, table);
  console.log(`\nDeleted ${total} total`);
  return;
};
let removeItems = (db, table) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(table);
    collection.remove({ account_id: ObjectId('520a45c07fc8cfae6c000001') }, (err, data) => {
      assert.equal(err, null);
      console.log(`Deleted ${data.result.n} ${table}`);
      total += data.result.n;
      resolve();
    });
  });
};

module.exports = switchover;
