let uuid = require('uuid'),
  { clear } = require('../colors');

module.exports = class Catalog {
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

    this.catalog = null;

    if (!data) return;
    if (data.catalog) this.catalog = data.catalog;
    if (data.color) this.color = data.color;
    if (data.index) this.index = data.index;
    if (data.name) this.name = data.name;
    if (data.uuid) this.uuid = data.uuid;
  };
};
