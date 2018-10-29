// let { MongoClient, ObjectId } = require('mongodb'),
//   { join } = require('path'),
//   assert = require('assert'),
//   cosmetic = require('cosmetic'),
//   ProgressBar = require('progress'),
//   { lib, models } = require('@gameroom/gameroom-kit'),
//   { Import } = lib,
//   { User } = models,
//   i = 0,
//   colors = require('../../colors'),
//   { saveImportFiles } = require('../../helpers');
//
// let result;
//
// let switchover = (options) => {
//   return new Promise ((resolve, reject) => {
//     let dir = options._parents.switchover.dir || './switchover';
//     MongoClient.connect(process.env.CASHIERFU_MONGO_URI, (err, db) => {
//       assert.equal(null, err);
//       result = new Import();
//       getResponse(db).then(() => {
//         db.close();
//         saveImportFiles(join(dir, 'timecards'), result);
//         resolve(result);
//       }).catch((err) => {
//         db.close();
//         reject(err);
//       });
//     });
//   });
// };
// let getResponse = async (db) => {
//   let timecards = await findTimecards(db);
//   result.timecards.push(...timecards);
//   let timecardCorrections = await findTimecardCorrections(db);
//   result.timecard_corrections.push(...timecardCorrections);
//   console.log(timecards, timecardCorrections);
//   return;
// };
// let findTimecardCorrections = (db, inventory_id) => {
//   return new Promise((resolve, reject) => {
//     let collection = db.collection('timecard_corrections');
//     collection.find({}).toArray((err, items) => {
//       assert.equal(err, null);
//       resolve(items);
//     });
//   });
// };
// let findTimecards = (db, inventory_id) => {
//   return new Promise((resolve, reject) => {
//     let collection = db.collection('timecards');
//     collection.find({}).toArray((err, items) => {
//       assert.equal(err, null);
//       resolve(items);
//     });
//   });
// };
//
// module.exports = switchover;
