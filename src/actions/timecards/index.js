// let { MongoClient, ObjectId } = require('mongodb'),
//   { join } = require('path'),
//   assert = require('assert'),
//   fs = require('fs'),
//   cosmetic = require('cosmetic'),
//   ProgressBar = require('progress'),
//   convert = require('./convert'),
//   createPrices = require('./createPrices'),
//   createTags = require('./createTags'),
//   { lib, models } = require('@gameroom/gameroom-kit'),
//   { Import } = lib,
//   { Option_Group, Product, Tag, Product_Tag } = models,
//   i = 0,
//   colors = require('../../colors'),
//   consoles = require('./consoles'),
//   { saveImportFiles } = require('../../helpers');

let result;

module.exports = (options) => {
  return new Promise ((resolve, reject) => {
    resolve();
    // let dir = options._parents.switchover.dir || './switchover';
    // MongoClient.connect(url, (err, db) => {
    //   assert.equal(null, err);
    //   result = new Import();
    //   getResponse(db).then(() => {
    //     db.close();
    //     saveImportFiles(join(dir, 'games'), result);
    //     resolve(result);
    //   }).catch((err) => {
    //     db.close();
    //     reject(err);
    //   });
    // });
  });
};
