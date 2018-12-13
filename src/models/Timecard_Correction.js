let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongooseHidden = require('mongoose-hidden')(),
  { helpers, models } = require('@infinitetoken/cashierfu-api-kit'),
  { getMongoAttributes } = helpers,
  { attributes } = models.Timecard_Correction_Schema;

let schema = new Schema(getMongoAttributes(attributes));

schema.plugin(mongooseHidden, { hidden: { _id: true } });

module.exports = mongoose.model('Timecard_Correction', schema);
