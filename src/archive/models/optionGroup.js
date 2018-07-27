let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class OptionGroup {
  constructor(data) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
    this.uuid = uuid.v1();

    this.color = clear;
    this.identifier = this.uuid;
    this.index = 0;
    this.info = null;
    this.multitudinal = false;
    this.name = null;
    this.rank = 0;

    this.catalog = null;

    if (!data) return;
    if (data.color) this.color = data.color;
    if (data.index) this.index = data.index;
    if (data.name) this.name = data.name;

    if (data.catalog) this.catalog = data.catalog;
  };
};
