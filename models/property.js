let uuid = require('uuid'),
  { clear } = require('../colors');

module.exports = class Property {
  constructor(data) {
    this.generator = 0;

    this.color = clear;
    this.createdAt = Date.now();
    this.hidden = false;
    this.index = 0;
    this.info = null;
    this.key = null;
    this.name = null;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    this.value = null;

    this.product = null;

    if (!data) return;
    if (data.index) this.index = data.index;
    if (data.key) this.name = data.key;
    if (data.product) this.product = data.product;
    if (data.value) this.value = data.value;
  };
};
