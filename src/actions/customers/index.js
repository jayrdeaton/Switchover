let MongoClient = require('mongodb').MongoClient,
  { join } = require('path'),
  assert = require('assert'),
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  cosmetic = require('cosmetic'),
  uuid = require('uuid').v1,
  { lib, models } = require('@gameroom/gameroom-kit'),
  { Address, Identification, Import } = lib,
  { Credit, Customer, Note } = models,
  { saveImportFiles } = require('../../helpers');

  // Entity = require('../models').entity;

class Transition {
  constructor(c) {
    this.created_at = c['created_at'].getTime() / 1000;
    this.updated_at = c['updated_at'].getTime() / 1000;
    let identifier = null;
    if (c['_id']) identifier = c['_id'];
    this.identifier = identifier;
    let info = null;
    let phone = null;
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
      let bday = new Date(c['date_of_birth']);
      this.date_of_birth = bday.getTime() / 1000;
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
    this.first_name = c['first_name'];
    this.last_name = c['last_name'];
    // this.middleName = null;

    // Street in info
    this.address = new Address();

    let city = null;
    let street = null;
    let zip = null;
    if (c.addresses && c.addresses[0])  {
      let address = c.addresses[0];
      if (address.city) this.address.city = address.city;
      if (address.country) this.address.country = address.country;
      if (address.state) this.address.state = address.state;
      if (address.first_line) this.address.street = address.first_line;
      if (address.second_line) this.address.street += ` ${address.second_line}`;
      if (address.zip) this.address.zip = address.zip;
    };

    // this.city = city;
    // this.street = street;
    // this.zip = zip;
    // this.state = null;

    this.identification = new Identification();
    if (c.identifier) this.identification.identifier = c.identifier;
    if (!c.identifier && c.organization) this.identification.identifier = c.organization;
    if (c.identifier_type) this.identification.type = c.identifier_type;

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

let result;

let switchover = function(options) {
  return new Promise((resolve, reject) => {
    let dir = options._parents.switchover.dir || './switchover';
    result = new Import();
    MongoClient.connect(process.env.SWAPZAPP_MONGO_URI, function(err, db) {
      assert.equal(null, err);
        findCustomers(db).then(function(customers) {
          console.log(cosmetic.green(customers.length + " customers found"));
          refactorCustomers(customers).then(function(data) {
            console.log(cosmetic.green(data.length + " customers refactored"));
            console.log(cosmetic.yellow(customers.length - data.length + " customers ignored"));
            db.close();
            saveImportFiles(join(dir, 'customers'), result);
            resolve(result);
            // resolve(data);
          });
        });
    });
  })
};
let findCustomers = async (db) => {
  let collection = db.collection('customers');
  let limit = 1000;
  let skip = 0;
  let customers = [];
  let done = false;
  do {
    let batch = await findCustomerBatch(collection, skip, limit);
    customers.push(...batch);
    skip += limit;
    if (batch.length === 0) done = true;
  } while (!done);
  return customers;
};
findCustomerBatch = (collection, skip, limit) => {
  return new Promise(function(resolve, reject) {
    collection.find({}).sort({name: 1}).skip(skip).limit(limit).toArray((err, customers) => {
      assert.equal(err, null);
      resolve(customers);
    });
  });
};
let refactorCustomers = function(swapzappCustomers) {
  return new Promise(function(resolve, reject) {
    let customers = [];
    swapzappCustomers.forEach((c, index) => {
      if (c.credit || c.notes) {
        let trans = new Transition(c);
        let customer = new Customer(trans);

        let note = new Note({
          account: customer.uuid,
          info: `Swapzapp: ${JSON.stringify(c, null, 2)}`
        });
        result.notes.push(note);
        if (trans.info) {
          let note = new Note({
            account: customer.uuid,
            info: trans.info
          });
          result.notes.push(note);
        };
        if (c.credit) {
          let credit = new Credit({
            amount: c.credit,
            posted: true,
            customer: customer.uuid
          });
          result.credits.push(credit);
        };
        result.customers.push(customer);
        customers.push(customer);
      };
    });
    resolve(customers);
  });
};

module.exports = switchover;
