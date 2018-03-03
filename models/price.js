let uuid = require('uuid'),
  { clear } = require('../colors');

module.exports = class Price {
  constructor(data) {
    this.generator = 0;

    this.amount = "0";
    this.color = clear;
    this.createdAt = Date.now();
    this.hidden = false;
    this.index = 0;
    this.info = null;
    this.name = null;
    this.quantity = 0;
    this.reference = null;
    this.sign = 0;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;

    this.product = null;
    this.taxGroup = null;

    if (!data) return;
    if (data.amount) this.amount = data.amount;
    if (data.color) this.color = data.color;
    if (data.index) this.index = data.index;
    if (data.info) this.info = data.info;
    if (data.name) this.name = data.name;
    if (data.uuid) this.uuid = data.uuid;
    if (data.uuid) this.identifier = data.uuid;

    if (data.product) this.product = data.product;
  };
};
