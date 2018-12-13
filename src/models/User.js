let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongooseHidden = require('mongoose-hidden')(),
  { models } = require('@infinitetoken/cashierfu-api-kit'),
  { attributes } = models.User_Schema;

let schema = new Schema(attributes);

schema.plugin(mongooseHidden, { hidden: { _id: true } });

module.exports = mongoose.model('User', schema);
