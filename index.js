var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/swapzapp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
    findDocuments(db, function(inventories) {
      db.close();
    });
});
var findDocuments = function(db) {
  // Get the documents collection
  var collection = db.collection('inventories');
  // Find some documents
  collection.find({}).toArray(function(err, inventories) {
    assert.equal(err, null);
    callback(inventories);
  });
}
