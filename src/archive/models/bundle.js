let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class Bundle {
  constructor(data) {
    this.amount = null;
    this.attachments = [];
    this.color = clear;
    this.createdAt = Date.now();
    this.images = [];
    this.index = 0;
    this.minimum = 0;
    this.name = null;
    this.rank = 0;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    this.videos = [];

    this.catalog = null;

    if (!data) return;

    if (data.amount) this.amount = data.amount;
    if (data.attachments) this.attachments = data.attachments;
    if (data.color) this.color = data.color;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.images) this.images = data.images;
    if (data.index) this.index = data.index;
    if (data.minimum) this.minimum = data.minimum;
    if (data.name) this.name = data.name;
    if (data.rank) this.rank = data.rank;
    if (data.reference) this.reference = data.reference;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
    if (data.uuid) this.uuid = data.uuid;
    if (data.identifier) this.identifier = data.identifier;
    if (data.videos) this.videos = data.videos;

    if (data.catalog) this.catalog = data.catalog;
  };
};
