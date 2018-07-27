let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class Property {
  constructor(data) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
    this.uuid = uuid.v1();

    this.key = null;
    this.value = null;

    this.product = null;

    if (!data) return;
    if (data.key) this.name = data.key;
    if (data.value) this.value = data.value;

    if (data.product) this.product = data.product;
  };
};
