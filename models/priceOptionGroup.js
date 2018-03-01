let uuid = require('uuid'),
  { clear } = require('../colors');

module.exports = class PriceOptionGroup {
  constructor(data) {
    this.generator = 0;

    this.color = clear;
    this.createdAt = Date.now();
    this.hidden = false;
    this.identifier = null;
    this.index = 0;
    this.info = null;
    this.name = null;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();

    this.optionGroup = null;
    this.price = null;

    if (!data) return;
    if (data.color) this.color = data.color;
    if (data.name) this.name = data.name;
    if (data.optionGroup) this.optionGroup = data.optionGroup;
    if (data.price) this.price = data.price;
  };
};
