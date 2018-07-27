module.exports = class ImportWrapper {
  constructor(data) {
    this.objects = [];
    this.priority = false;
    if (!data) return;
    if (data.objects) this.objects = data.objects;
    if (data.priority) this.priority = data.priority;
  };
};
