let { Schema } = require('emporium'),
  store = require('../store'),
  { models } = require('@gameroom/gameroom-kit'),
  { attributes } = models.Import_Schema;

var schema = new Schema(attributes);

module.exports = store.storable('Import', schema);
