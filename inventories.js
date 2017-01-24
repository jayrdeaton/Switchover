var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/swapzapp';
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');
var ProgressBar = require('progress');
// var items = require('./items');

var switchover = function(save, location) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
      findInventories(db).then(function(inventories) {
        console.log("inventories to refactor: ", inventories.length);
        var i = 0;
        var barOpts = {
          total: inventories.length,
          clear: true
        };
        var bar = new ProgressBar(' inventories [:bar] :percent :etas', barOpts);
        inventories.forEach(inventory => {
          findItems(db, inventory['_id']).then(function(items) {
            i++;
            bar.tick();
            var itemBarOpts = {
              total: items.length,
              clear: true
            };
            // var itemBar = new ProgressBar(' items [:bar] :percent :etas', itemBarOpts);
            items.forEach(item => {
              refactorItems(item).then(updated => {
                console.log(updated.name);
              });
              // itemBar.tick();
            });
            if (i >= inventories.length) {
              db.close();
            };
          });
        })
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
          var data = JSON.stringify(inventories);
          fs.writeFile(dir + "/inventories.js", data, function(err) {
              if(err) {
                  return console.log(err);
              };
              console.log(dir + "/inventories.js was saved!");
          });
        };
        // db.close();
      });
  });
};
var findInventories = function(db) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('inventories');
    collection.find({}).sort({name: 1}).toArray(function(err, inventories) {
      assert.equal(err, null);
      resolve(inventories);
    });
  });
};
var findItems = function(db, inventory_id) {
  return new Promise(function(resolve, reject) {
    var collection = db.collection('items');
    collection.find({inventory_id}).toArray(function(err, items) {
      assert.equal(err, null);
      resolve(items);
    });
  });
};
var refactorItems = function(swapzapp) {
  return new Promise(function(resolve, reject) {
    var cashierfu = {};
    cashierfu = swapzapp;
    resolve(cashierfu);
  });
};
module.exports.switchover = switchover;
