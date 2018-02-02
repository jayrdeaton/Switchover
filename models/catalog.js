let uuid = require('uuid');

module.exports = class Catalog {
  constructor(data) {
    this.type = 'Catalog';
    this.index = 0;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    // this.products = [];
    // this.catalogs = [];
    if (data.name) this.name = data.name;
    if (data.index) this.index = data.index;
    if (data.color) this.color = data.color;
    if (data.catalog) this.catalog = data.catalog;
    if (data.uuid) {
      this.uuid = data.uuid;
      this.identifier = data.uuid;
    };
    // if (data.products) this.products = data.products;
    // if (data.catalogs) this.catalogs = data.catalogs;
  };
};
