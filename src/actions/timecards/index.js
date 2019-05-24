let mongoose = require('mongoose'),
  { join } = require('path'),
  assert = require('assert'),
  cosmetic = require('cosmetic'),
  ProgressBar = require('progress'),
  { helpers, lib, models } = require('@gameroom/emporium'),
  { getDateFromSeconds, getSecondsFromDate } = helpers,
  { Import } = lib,
  { Timecard, User } = models,
  i = 0,
  colors = require('../../colors'),
  { saveImportFiles } = require('../../helpers');

mongoose.Promise = global.Promise;

let result = new Import();

const deletedUsers = [
  '7d44a1c4-d86e-4b1c-9813-b03cb9754860', //mediaencyclopedia@gmail.com
  'e064cd23-8095-4557-ac08-0ab8c8066050', //example@example.com
  '7ddaf3d8-0ba4-4927-9ff9-7fe18084cfc7', //paul.ben.foster@gmail.com
  '55e59be1-20ef-4cf3-90b3-f23a7ceb4255', // cynthiasuehickman@gmail.com
  '5951bfa1-cf6d-4c15-96c0-b945892d83f1', // breykeckgameroom@gmail.com
  '110e1a69-4ae6-4366-9430-0c283b605afc', // jacksonmeredithgameroom@gmail.com
  '63003e45-20c8-4491-af6b-0e8daacaa479', // treyheg@gmail.com
  '026fcc8d-c53d-4e80-a3b1-b2a299a86102', // soraalee2017@gmail.com
  'b5e9cb94-1dd9-44c0-bbe7-6f34d0e2309c', // fakecashierfu@gmail.com
  'a662c98c-4151-41a0-ab0e-1b19ee168a7c', // kylegibson@outlook.com
  '72bfb031-22bd-44f6-9f05-802aa473cf71', // kokoki89@gmail.com
  '1b67599c-6c0e-4315-95c9-f3fd316e0aac', // ibethepaul@gmail.com
  '2baba2e4-61a7-40c5-8d95-6ef60b2d1ea2', // dakotatru1211@gmail.com
  '307c40c1-dd8a-4964-81a8-9c733fa80fe6', // reena.daniell@example.com
  '54db5782-7a40-4baa-a531-2d3e765815f7', // w.ridgley@yahoo.com
  '644d5b71-08c8-47c3-8c58-e87bcfba0aaf' // w_ridgley@yahoo.com
];

let switchover = async (options) => {
  let { business_uuid } = options
  let connection, dir = options._parents.switchover.dir || './switchover';

  connection = await mongoose.createConnection(`${process.env.CASHIERFU_MONGO_URI}_${business_uuid.replace(/-/g, '_')}_schedule`, { useNewUrlParser: true });
  let CashierFu_Timecard = connection.model('Timecard');
  let timecards = await CashierFu_Timecard.find();
  let CashierFu_Timecard_Correction = connection.model('Timecard_Correction');
  for (let [index, timecard] of timecards.entries()) {
    console.log(`${index} of ${timecards.length}`);
    if (!timecard.started_at || !timecard.ended_at) continue;
    if (deletedUsers.includes(timecard.user)) continue;
    timecard.status = 1;
    timecard.created_at = getSecondsFromDate(timecard.created_at);
    timecard.started_at = getSecondsFromDate(timecard.started_at);
    timecard.started_correction = timecard.started_at;
    timecard.ended_at = getSecondsFromDate(timecard.ended_at);
    timecard.ended_correction = timecard.ended_at;
    timecard.updated_at = getSecondsFromDate(timecard.updated_at);
    timecard = new Timecard(timecard);
    let timecard_corrections = await CashierFu_Timecard_Correction.find({ timecard: timecard.uuid });
    for (let correction of timecard_corrections) {
      if (correction.status === 0) {
        // pending
        timecard.ended_correction = timecard.ended_at + correction.correction;
        timecard.status = 2
      } else if (correction.status === 1) {
        // approved
        timecard.ended_correction = timecard.ended_at + correction.correction;
        timecard.status = 3
      } else {
        // declined
        timecard.ended_correction = timecard.ended_at + correction.correction;
        timecard.status = 4
      };
    };
    result.timecards.push(timecard);
  };
  mongoose.disconnect();
  console.log(result.timecards.length)
  saveImportFiles(join(dir, 'timecards'), result);

};


module.exports = switchover;
