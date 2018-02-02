module.exports = class Property {
  constructor(data) {
    this.type = 'Property';
    this.key = null;
    this.value = null;
    this.product = null;
    this.index = 0;
    if (data.key) this.name = data.key;
    if (data.value) this.value = data.value;
    if (data.product) this.product = data.product;
    if (data.index) this.index = data.index;
  };
};
