module.exports = class Wrapper {
  constructor(data) {
    this.type = null;
    this.object = null;
    if (!data) return;
    if (data.type) this.type = data.type;
    if (data.object) this.object = data.object;
  };
};
