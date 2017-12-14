var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/swapzapp';
var ObjectId = require('mongodb').ObjectId;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

    findInventories(db).then(function(inventories) {
      var i = 0;
      inventories.forEach(inventory => {
        findItems(db, inventory['_id']).then(function(items) {
          console.log(inventory.name, items.length);
          i++;
          if (i >= inventories.length) {
            db.close();
          };
        });
      });
    });
});

var findInventories = function(db) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('inventories');
    collection.find({}).sort({name: 1}).toArray(function(err, inventories) {
      assert.equal(err, null);
      resolve(inventories);
    });
  });
};

var findItems = function(db, inventory) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('items');
    collection.find({inventory_id: inventory}).toArray(function(err, items) {
      assert.equal(err, null);
      resolve(items);
    });
  });
};
