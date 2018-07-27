let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class Tag {
  constructor(data) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
    this.uuid = uuid.v1();

    this.name = null;

    this.product = null;

    if (!data) return;
    if (data.name) this.name = data.name;

    if (data.product) this.product = data.product;
  };
};
