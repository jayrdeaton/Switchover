var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = 'mongodb://heroku_app17482906:bdjnq4u1dssloe53epj0ggbiq0@candidate.15.mongolayer.com:10169/swapzapp',
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  chalk = require('chalk'),
  uuid = require('uuid').v1;
  // Entity = require('../models').entity;

class Customer {
  constructor(c) {
    this.type = 'Customer';
    this.uuid = uuid();
    this.createdAt = c['created_at'];
    var identifier = null;
    if (c['_id']) identifier = c['_id'];
    this.identifier = identifier;
    var info = null;
    var phone = null;
    if (c.phones && c.phones[0]) {
      if (c.phones[0].number !== '555-555-5555' && c.phones[0].number !== 'New Phone') {
        phone = c.phones[0].number;
      };
      if (c.phones.length > 1) {
        if (info) {
          info = info + " other phone: " + c.phones[1].name + " " + c.phones[1].number;
        } else {
          info = "Other phone: " + c.phones[1].name + " " + c.phones[1].number;
        }
      };
    };
    if (c['date_of_birth']) {
      var bday = new Date(c['date_of_birth']);
      var month = bday.getMonth();
      month++;
      var date = bday.getDate();
      var year = bday.getFullYear();
      var dob = month + "/" + date + "/" + year;
      if (info) {
        info = info + " DOB: " + dob;
      } else {
        info = "DOB: " + dob;
      };
    };
    // console.log(c)
    if (c.notes) {
      if (info) {
        info = info + " " + c.notes;
      } else {
        info = c.notes;
      };
    };
    if (info) this.info = info;
    // this.phone = phone;
    this.name = null;
    this.index = 0;
    // this.reference = null;
    // this.symbology = null;
    // this.company = null;
    // this.email = c.email;
    this.name = c['first_name'] + ' ' + c['last_name']
    this.firstName = c['first_name'];
    this.lastName = c['last_name'];
    // this.middleName = null;

    // Street in info
    var city = null;
    var street = null;
    var zip = null;
    if (c.addresses && c.addresses[0])  {
      var address = c.addresses[0];
      var street;
      if (address['first_line'] && address['first_line'] !== 'New Address') {
        street = address['first_line'];
        city = address.city + " " + address.state;
        zip = address.zip;
      };
      if (address['second_line']) {
        street = street + " " + address['second_line'];
      };
      if (street) {
        street = street;
      };
    };

    // this.city = city;
    // this.street = street;
    // this.zip = zip;
    // this.state = null;

    var licenseNumber = null;
    if (c.identifier) {
      licenseNumber = c.identifier;
    };
    if (c['identifier_type']) {
      if (licenseNumber) {
        licenseNumber = licenseNumber + " " + c['identifier_type'];
      } else {
        licenseNumber = c['identifier_type'];
      };
    };
    if (c.organization) {
      if (licenseNumber) {
        licenseNumber = licenseNumber + " " + c.organization;
      } else {
        licenseNumber = c.organization;
      };
    };

    // if (this.info) {
      // this.info.replace('/\n/g', 'thishadone');
      // if (this.info.includes('thishadone')) {
      //   console.log(this)
      // }
      // console.log(this.info)
    // }

    // if (this.notes && this.notes.includes('/\n/g')) {
    //   console.log(this)
    // }
    // this.licenseNumber = licenseNumber;
    // this.licenseState = null;

    //
    // this.hidden = false;
    // this.color = {
    //   "red" : 0,
    //   "alpha" : 0,
    //   "blue" : 0,
    //   "green" : 0
    // };
    // this.updatedAt = 534463337.51323998;
    // this.createdAt = 534463337.51323998;
  };
};

class Adjustment {
  constructor(destination, amount) {
    this.amount = amount;
    this.posted = true;
    this.summary = "Swapzapp import";
    this.source = null;
    this.destination = destination;
  };
};
var switchover = function() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
        findCustomers(db).then(function(customers) {
          console.log(chalk.green(customers.length + " customers found"));
          refactorCustomers(customers).then(function(data) {
            console.log(chalk.green(data.length + " customers refactored"));
            // console.log(chalk.green(data.adjustments.length + " total adjustments made"));
            console.log(chalk.yellow(customers.length - data.length + " customers ignored"));
            db.close();
            let object = {
              name: "Customers",
              objects: data
            }
            resolve(object);
            // resolve(data);
          });
        });
    });
  })
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
var refactorCustomers = function(swapzappCustomers) {
  return new Promise(function(resolve, reject) {
    var customers = [];
    var adjustments = [];
    swapzappCustomers.forEach((c, index) => {
      if (c.credit || c.notes) {
        var customer = new Customer(c);
        customer.index = index;
        // let tempCustomer = {
        //   name: customer.name,
        //   index: customer.index,
        //   createdAt: customer.createdAt,
        //   hidden: false,
        //   identifier: customer.identifier,
        //   uuid: customer.uuid
        // };
        // let entity = new Entity({object: customer, type: 'Customer'});
        // console.log(chunk)
        // if (c.credit) adjustments.push(new Adjustment(customer.uuid, c.credit));
        customers.push(customer);
      };
    });
    resolve(customers);
  });
};
var guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};
module.exports = switchover;
