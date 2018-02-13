let uuid = require('uuid');

module.exports = class OptionGroup {
  constructor(data) {
    this.type = 'OptionGroup';
    // this.color =d {};
    this.index = 0;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    this.name = null;

    if (data.color) this.color = data.color;
    if (data.index) this.index = data.index;
    if (data.name) this.name = data.name;
  };
};
