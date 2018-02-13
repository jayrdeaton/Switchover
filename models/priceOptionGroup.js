let uuid = require('uuid');

module.exports = class PriceOptionGroup {
  constructor(data) {
    this.type = 'PriceOptionGroup';

    this.color = null;
    this.name = null;
    this.optionGroup = null;
    this.price = null;

    if (data.color) this.color = data.color;
    if (data.name) this.name = data.name;
    if (data.optionGroup) this.optionGroup = data.optionGroup;
    if (data.price) this.price = data.price;
  };
};
