module.exports = class Tag {
  constructor(data) {
    this.generator = 0;

    this.color = {
      alpha: 0,
      red: 0,
      green: 0,
      blue: 0
    };
    this.createdAt = Date.now();
    this.hidden = false;
    this.identifier = null;
    this.index = 0;
    this.info = null;
    this.name = null;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();

    this.product = null;

    if (!data) return;
    if (data.name) this.name = data.name;
    if (data.index) this.index = data.index;
    if (data.product) this.product = data.product;
  };
};
