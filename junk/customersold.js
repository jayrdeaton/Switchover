var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/swapzapp';
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');
var chalk = require('chalk');

class Customer {
  constructor(c) {
    this.uuid = guid().toUpperCase();
    this.createdAt = c['created_at'];
    // this.generator = null;
    var identifier = null;
    if (c['_id']) identifier = c['_id'];
    this.identifier = identifier;
    // this.index = null;
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
    if (c.info) {
      if (info) {
        info = info + " " + c.notes;
      } else {
        info = c.notes;
      };
    };
    this.info = info;
    this.phone = phone;
    // this.match = null;
    this.name = null;
    // this.order = null;
    this.reference = null;
    this.symbology = null;
    // this.updatedAt = null;
    // this.uuid = null;
    // this.attachments = null;
    // this.destinations = null;
    // this.sources = null;
    this.company = null;
    // this.country = null;
    this.email = c.email;
    this.firstName = c['first_name'];
    this.lastName = c['last_name'];
    this.middleName = null;

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
    this.city = city;
    this.street = street;
    this.zip = zip;
    this.state = null;

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
    this.licenseNumber = licenseNumber;
    this.licenseState = null;
    // this.giftCertificates = null;
    // this.sales = null;
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
// Use connect method to connect to the server
var switchover = function() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
        findCustomers(db).then(function(customers) {
          console.log(chalk.green(customers.length + " customers found"));
          refactorCustomers(customers).then(function(data) {
            console.log(chalk.green(data.customers.length + " customers refactored"));
            console.log(chalk.green(data.adjustments.length + " total adjustments made"));
            console.log(chalk.yellow(customers.length - data.customers.length + " customers ignored"));
            db.close();
            resolve(data);
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
    // swapzappCustomers = swapzappCustomers.slice(0, 99)
    swapzappCustomers.forEach(c => {
      if (c.credit || c.notes) {
        var customer = new Customer(c);
        if (c.credit) adjustments.push(new Adjustment(customer.uuid, c.credit));
        customers.push(customer);
      };
    });
    resolve({customers, adjustments});
  });
};

// var saveCustomer = function(customer, dir) {
//   dir = dir + "/Store/Customer/" + customer.uuid + ".json";
//   var data = JSON.stringify(customer);
//   fs.writeFileSync(dir, data);
// };
// var getAdjustment = function(credit, customer, dir) {
//   var uuid = guid();
//   dir = dir + "/Store/Adjustment/" + uuid + ".json";
//   var adjustment = {};
//   adjustment.amount = credit;
//   adjustment.source = null;
//   adjustment.destination = customer.uuid;
//   adjustment.summary = "Swapzapp";
//   adjustment.uuid = uuid;
//   var data = JSON.stringify(adjustment);
//   fs.writeFileSync(dir, data);
// };
var guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};
  // if (!c.credit && !c.notes) {
  //   ignore++;
  //   console.log(ignore, oldCustomers.length);
  // };
module.exports.switchover = switchover;
