let uuid = require('uuid');

module.exports = class Product {
  constructor(data) {
    this.type = 'Product';
    this.createdAt = new Date();
    this.index = 0;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    // this.tags = [];
    // this.properties = {};
    // this.prices = [];
    if (data.catalog) this.catalog = data.catalog;
    if (data.color) this.color = data.color;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.identifier) this.identifier = data.identifier;
    if (data.index) this.index = data.index;
    if (data.name) this.name = data.name;
    if (data.uuid) {
      this.uuid = data.uuid;
      this.identifier = data.uuid;
    }
    // if (data.tags) this.tags = data.tags;
    // if (data.properties) this.properties = data.properties;
    // if (data.prices) this.prices = data.prices;
  };
};
