let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class Product {
  constructor(data) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
    this.uuid = uuid.v1();

    this.color = clear;
    this.depth = {
      value: '0.0',
      unit:  "in"
    };
    this.height = {
      value: '0.0',
      unit:  "in"
    };
    this.identifier = this.uuid;
    this.index = 0;
    this.info = null;
    this.name = null;
    this.rank = 0;
    this.weight = {
      value: '0.0',
      unit:  "lb"
    };
    this.width = {
      value: '0.0',
      unit:  "in"
    };

    this.catalog = null;

    if (!data) return;
    if (data.created_at) this.created_at = data.created_at.getTime();
    if (data.uuid) this.uuid = data.uuid;

    if (data.color) this.color = data.color;
    if (data.uuid) this.identifier = data.uuid;
    if (data.index) this.index = data.index;
    if (data.name) this.name = data.name;

    if (data.catalog) this.catalog = data.catalog;
  };
};
