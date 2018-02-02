module.exports = class Tag {
  constructor(data) {
    this.type = 'Tag';
    this.index = 0;
    this.name = null;
    this.product = null;
    if (data.name) this.name = data.name;
    if (data.product) this.product = data.product;
    if (data.index) this.index = data.index;
  };
};
