let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class PriceOptionGroup {
  constructor(data) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
    this.uuid = uuid.v1();

    this.option_group = null;
    this.price = null;

    if (!data) return;
    if (data.option_group) this.option_group = data.option_group;
    if (data.price) this.price = data.price;
  };
};
