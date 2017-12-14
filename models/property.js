module.exports = class Property {
  constructor(data) {
    this.type = 'Property';
    if (data.key) this.name = data.key;
    if (data.value) this.value = data.value;
    if (data.product) this.product = data.product;
  };
};
