let uuid = require('uuid'),
  { clear } = require('../colors');

module.exports = class Product {
  constructor(data) {
    this.generator = 0;

    this.color = clear;
    this.createdAt = Date.now();
    this.depth = { value : 0, unit : "in" };
    this.height = { value : 0, unit : "in" };
    this.hidden = false;
    this.identifier = null;
    this.index = 0;
    this.info = null;
    this.name = null;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();
    this.weight = { value : 0, unit : "lb" };
    this.width = { value : 0, unit : "in" };

    this.catalog = null;

    if (!data) return;
    if (data.color) this.color = data.color;
    if (data.createdAt) this.createdAt = data.createdAt.getTime();
    if (data.identifier) this.identifier = data.identifier;
    if (data.index) this.index = data.index;
    if (data.name) this.name = data.name;
    if (data.uuid) this.uuid = data.uuid;

    if (data.catalog) this.catalog = data.catalog;
  };
};
