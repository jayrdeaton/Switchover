let mongoose = require('mongoose'),
  { join } = require('path'),
  assert = require('assert'),
  cosmetic = require('cosmetic'),
  ProgressBar = require('progress'),
  { lib, models } = require('@gameroom/gameroom-kit'),
  { Import } = lib,
  { User } = models,
  i = 0,
  colors = require('../../colors'),
  { saveImportFiles } = require('../../helpers');

mongoose.Promise = global.Promise;

let result;

let switchover = async (options) => {
  let { business_uuid } = options
  let dir = options._parents.switchover.dir || './switchover';

  let connection = await mongoose.createConnection(`${process.env.CASHIERFU_MONGO_URI}_${business_uuid.replace(/-/g, '_')}_schedule`, { useNewUrlParser: true });
  let Timecard = connection.model('Timecard');
  let timecards = await Timecard.find();
  let Timecard_Correction = connection.model('Timecard_Correction');
  let timecard_corrections = await Timecard_Correction.find();

  connection = await mongoose.createConnection(process.env.CASHIERFU_MONGO_URI, { useNewUrlParser: true });
  let User = connection.model('User');
  let users = await User.find();

  result = new Import({ timecards, timecard_corrections, users });
  mongoose.disconnect();

  saveImportFiles(join(dir, 'timecards'), result);

};


module.exports = switchover;
