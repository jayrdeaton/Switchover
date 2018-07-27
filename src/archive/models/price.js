let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class Price {
  constructor(data) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
    this.uuid = uuid.v1();

    this.active = true;
    this.amount = 0;
    this.color = clear;
    this.identifier = this.uuid;
    this.index = 0;
    this.info = null;
    this.name = null;
    this.quantity = 0;
    this.rank = 0;

    this.product = null;

    if (!data) return;
    if (data.amount) this.amount = data.amount;
    if (data.color) this.color = data.color;
    if (data.uuid) this.identifier = data.uuid;
    if (data.index) this.index = data.index;
    if (data.info) this.info = data.info;
    if (data.name) this.name = data.name;
    if (data.uuid) this.uuid = data.uuid;

    if (data.product) this.product = data.product;
  };
};
