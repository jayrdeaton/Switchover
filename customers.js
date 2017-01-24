var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/swapzapp';
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');

// Use connect method to connect to the server
var switchover = function(save, location) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
      findCustomers(db).then(function(customers) {
        console.log("Customers to refactor: ", customers.length);
        if (save) {
          var dir;
          if (location) {
            dir = location;
          } else {
            dir = "./switchover";
          };
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          };
          var data = JSON.stringify(customers);
          fs.writeFile(dir + "/customers.js", data, function(err) {
              if(err) {
                  return console.log(err);
              };
              console.log(dir + "/customers.js was saved!");
          });
        };
        console.log('close');
        db.close();
      });
  });
};
var findCustomers = function(db) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('customers');
    collection.find({}).sort({name: 1}).toArray(function(err, customers) {
      assert.equal(err, null);
      resolve(customers);
    });
  });
};

module.exports.switchover = switchover;
