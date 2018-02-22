module.exports = class Property {
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
    this.key = null;
    this.name = null;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();
    this.value = null;

    this.product = null;

    if (!data) return;
    if (data.index) this.index = data.index;
    if (data.key) this.name = data.key;
    if (data.product) this.product = data.product;
    if (data.value) this.value = data.value;
  };
};
