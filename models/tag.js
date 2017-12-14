module.exports = class Tag {
  constructor(data) {
    this.type = 'Tag';
    if (data.name) this.name = data.name;
    if (data.product) this.product = data.product;
  };
};
