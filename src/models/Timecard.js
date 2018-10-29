let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongooseHidden = require('mongoose-hidden')(),
  { models } = require('@gameroom/gameroom-kit'),
  { attributes } = models.Timecard_Schema;

let schema = new Schema(attributes);

schema.plugin(mongooseHidden, { hidden: { _id: true } });

module.exports = mongoose.model('Timecard', schema);
