let uuid = require('uuid');

module.exports = class Price {
  constructor(data) {
    this.type = 'Price';
    this.amount = 0;
    this.index = 0;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    this.product = null;
    if (data.name) this.name = data.name;
    if (data.amount) this.amount = data.amount;
    if (data.color) this.color = data.color;
    if (data.index) this.index = data.index;
    if (data.info) this.info = data.info;
    if (data.uuid) {
      this.uuid = data.uuid;
      this.identifier = data.uuid;
    };
    if (data.product) this.product = data.product;
  };
};
