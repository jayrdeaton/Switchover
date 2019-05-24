const MongoClient = require('mongodb').MongoClient,
  { join } = require('path'),
  assert = require('assert'),
  ObjectId = require('mongodb').ObjectId,
  fs = require('fs'),
  cosmetic = require('cosmetic'),
  uuid = require('uuid').v1,
  { lib, models } = require('@gameroom/emporium'),
  { Import } = require('../../models'),
  { Address, Charge, Customer, Note } = models,
  { saveImportFilesToCSV } = require('../../helpers'),
  Transition = require('./Transition'),
  { promisify } = require('util');

const connect = promisify(MongoClient.connect);

// FIND AND KILL amoun === 1000000000000!!!
let result;

module.exports = async (options) => {
  const dir = options._parents.switchover.dir || './switchover';
  result = new Import();
  const db = await MongoClient.connect(process.env.SWAPZAPP_MONGO_URI);
  const customers = await findCustomers(db);
  console.log(cosmetic.green(customers.length + " customers found"));
  const data = await refactorCustomers(customers);
  console.log(cosmetic.green(data.length + " customers refactored"));
  console.log(cosmetic.yellow(customers.length - data.length + " customers ignored"));
  db.close();
  saveImportFilesToCSV(join(dir, 'customers'), result);
  return result;
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
    if (batch.length < limit) done = true;
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
    let customers = [];
    swapzappCustomers.forEach((c, index) => {
      if (c.credit || c.notes) {
        let trans = new Transition(c);
        let customer = new Customer(trans);
        let addresses = generateAddresses(c, customer);
        result.addresses.push(...addresses);
        result.notes.push(new Note({
          noteable_id: customer.id,
          noteable_type: 'Customer',
          info: `Swapzapp: ${JSON.stringify(c, null, 2)}`
        }));
        if (trans.info) result.notes.push(new Note({
          noteable_id: customer.id,
          noteable_type: 'Customer',
          info: trans.info
        }));
        if (c.credit) result.charges.push(new Charge({
          amount: c.credit,
          posted: true,
          chargeable_id: customer.id,
          chargeable_type: 'Customer'
        }));
        result.customers.push(customer);
        customers.push(customer);
        console.log(customer)
      };
    });
  return customers;
};
let generateAddresses = (c, customer) => {
  let addresses = [];
  if (c.addresses) for (let [index, a] of c.addresses.entries()) {
    let city = a.city || '';
    let country = a.country || '';
    let state = a.state || '';
    let street1 = a.first_line || '';
    let street2 = a.second_line;
    let zip = a.zip || '';
    let address = new Address({
      city,
      country,
      state,
      street1,
      street2,
      zip,
      name: `Address ${index}`,
      addressable_id: customer.id,
      addressable_type: 'Customer'
    });
    addresses.push(address);
  };
  return addresses;
};
