let uuid = require('uuid'),
  { clear } = require('../../colors');

module.exports = class Component {
  constructor(data) {
    this.attachments = [];
    this.color = clear;
    this.createdAt = Date.now();
    this.images = [];
    this.index = 0;
    this.info = null;
    this.name = null;
    this.rank = 0;
    this.reference = null;
    this.updatedAt = this.createdAt;
    this.uuid = uuid.v1();
    this.identifier = this.uuid;
    this.videos = [];

    if (!data) return;

    if (data.attachments) this.attachments = data.attachments;
    if (data.color) this.color = data.color;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.images) this.images = data.images;
    if (data.index) this.index = data.index;
    if (data.info) this.info = data.info;
    if (data.name) this.name = data.name;
    if (data.rank) this.rank = data.rank;
    if (data.reference) this.reference = data.reference;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
    if (data.uuid) this.uuid = data.uuid;
    if (data.identifier) this.identifier = data.identifier;
    if (data.videos) this.videos = data.videos;
  };
};
