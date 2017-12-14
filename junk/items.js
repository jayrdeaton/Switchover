var assert = require('assert')

var find = function(db, inventory_id) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('items');
    collection.find({inventory_id}).toArray(function(err, items) {
      assert.equal(err, null);
      resolve(items);
    });
  });
};
var refactor = function(swapzapp) {
  return new Promise(function(resolve, reject) {
    var cashierfu = {};
    cashierfu = swapzapp;
    resolve(cashierfu);
  });
};
module.exports.find = find;
