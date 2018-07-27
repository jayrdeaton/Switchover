module.exports = class Entity {
  constructor(data) {
    this.type = null;
    // this.parent = null;
    // this.parentType = null;
    this.object = {};
    if (data.type) this.type = data.type;
    // if (data.parent) this.parent = data.parent;
    // if (data.parentType) this.parentType = data.parentType;
    if (data.object) this.object = data.object;
  };
};
