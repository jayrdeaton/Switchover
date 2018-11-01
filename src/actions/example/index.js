let { join } = require('path'),
  faker = require('faker'),
  uuid = require('uuid'),
  { lib, models } = require('@gameroom/gameroom-kit'),
  { Import } = lib,
  { Customer, Credit, Note, Option_Group, Price_Option_Group, Price, Product, Tag, Timecard_Correction, Timecard, User } = models,
  { saveImportFiles } = require('../../helpers');

let switchover = (options) => {
  let dir = options._parents.switchover.dir || './switchover';
  let credit = new Credit({
    amount: faker.random.number(),
    posted: faker.random.boolean(),
    customer: uuid.v1()
  });
  let customer = new Customer({
    address: {
      city: faker.address.city(),
      country: faker.address.country(),
      state: faker.address.state(),
      street: faker.address.streetAddress(),
      zip: faker.address.zipCode()
    },
    date_of_birth: faker.date.past().getTime() / 1000,
    first_name: faker.name.firstName(),
    email: faker.internet.email(),
    identification: {
      identifier: faker.finance.account(),
      type: faker.random.word()
    },
    last_name: faker.name.lastName(),
    locked: faker.random.boolean(),
    password: faker.random.word(),
    phone: faker.phone.phoneNumber()
  });
  let note = new Note({
    info: faker.random.words(),
    account: uuid.v1()
  });
  let option_group = new Option_Group({
    color: {
      alpha: faker.random.number() / 100000,
      red: faker.random.number() / 100000,
      green: faker.random.number() / 100000,
      blue: faker.random.number() / 100000
    },
    identifier: uuid.v1(),
    info: faker.random.words(),
    multitudinal: faker.random.boolean(),
    name: faker.random.words(),
    rank: faker.random.number()
  });
  let price_option_group = new Price_Option_Group({
    price: uuid.v1(),
    option_group: uuid.v1()
  });
  let price = new Price({
    active: faker.random.boolean(),
    amount: faker.random.number(),
    color: {
      alpha: faker.random.number() / 100000,
      red: faker.random.number() / 100000,
      green: faker.random.number() / 100000,
      blue: faker.random.number() / 100000
    },
    identifier: uuid.v1(),
    info: faker.random.words(),
    name: faker.random.words(),
    quantity: faker.random.number(),
    rank: faker.random.number(),
    product: uuid.v1()
  });
  let product = new Product({
    color: {
      alpha: faker.random.number() / 100000,
      red: faker.random.number() / 100000,
      green: faker.random.number() / 100000,
      blue: faker.random.number() / 100000
    },
    depth: {
      value: (faker.random.number() / 10).toString(),
      unit: 'in'
    },
    height: {
      value: (faker.random.number() / 10).toString(),
      unit: 'in'
    },
    identifier: uuid.v1(),
    info: faker.random.words(),
    name: faker.random.words(),
    properties: {
      a: faker.random.words(),
      b: faker.random.words(),
      c: faker.random.words()
    },
    tags: [
      faker.random.word(),
      faker.random.word(),
      faker.random.word()
    ],
    rank: faker.random.number(),
    weight: {
      value: (faker.random.number() / 10).toString(),
      unit: 'lb'
    },
    width: {
      value: (faker.random.number() / 10).toString(),
      unit: 'in'
    }
  });
  let tag = new Tag({
    name: faker.random.word()
  });
  let timecard_correction = new Timecard_Correction({
    correction: faker.random.number(),
    status: 1,
    timecard: uuid.v1()
  });
  let timecard = new Timecard({
    completed: faker.random.boolean(),
    ended_at: Date.now() / 1000,
    started_at: faker.date.past().getTime() / 1000,
    user: uuid.v1()
  });
  let user = new User({
    admin: faker.random.boolean(),
    email: faker.internet.email(),
    password: faker.random.word()
  });

  let result = new Import({
    credits: [ credit ],
    customers: [ customer ],
    notes: [ note ],
    option_groups: [ option_group ],
    price_option_groups: [ price_option_group ],
    prices: [ price ],
    products: [ product ],
    tags: [ tag ],
    timecard_corrections: [ timecard_correction ],
    timecards: [ timecard ],
    users: [ user ]
  });

  saveImportFiles(join(dir, 'example'), result);
};

module.exports = switchover;
