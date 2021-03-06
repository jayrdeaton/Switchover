const { MongoClient, ObjectId } = require('mongodb'),
  { join } = require('path'),
  cosmetic = require('cosmetic'),
  assert = require('assert'),
  { helpers, lib, models } = require('@gameroom/emporium'),
  { getSecondsFromDate } = helpers,
  { Import } = require('../../models'),
  { Charge, Gift_Certificate } = models,
  { promisify } = require('util'),
  { saveImportFilesToCSV } = require('../../helpers');

module.exports = async (options) => {
  const dir = options._parents.switchover.dir || './switchover';

  result = new Import();

  const db = await MongoClient.connect(process.env.SWAPZAPP_MONGO_URI);
  const certificates = await findCertificates(db);

  for (const certificate of certificates) {
    const gift_certificate = new Gift_Certificate({
      created_at: getSecondsFromDate(certificate.created_at),
      pan: certificate.sku
    });
    result.gift_certificates.push(gift_certificate);
    if (certificate.amount !== certificate.balance) {
      const initial_charge = new Charge({
        chargeable_id: gift_certificate.id,
        chargeable_type: 'GiftCertificate',
        amount: certificate.amount,
        posted: true
      });
      const updated_charge = new Charge({
        chargeable_id: gift_certificate.id,
        chargeable_type: 'GiftCertificate',
        amount: - certificate.amount - certificate.balance,
        posted: true
      });

      result.charges.push(initial_charge, updated_charge);
    } else {
      const charge = new Charge({
        chargeable_id: gift_certificate.id,
        chargeable_type: 'GiftCertificate',
        amount: certificate.balance,
        posted: true
      });

      result.charges.push(charge);
    };
  };
  db.close();
  saveImportFilesToCSV(join(dir, 'gift_certificates'), result);
  return result;
};
const findCertificates = async (db) => {
  let collection = db.collection('certificates');
  let limit = 1000;
  let skip = 0;
  let certificates = [];
  let done = false;
  do {
    let batch = await findCertificateBatch(collection, skip, limit);
    certificates.push(...batch);
    skip += limit;
    if (batch.length < limit) done = true;
  } while (!done);
  return certificates;
};
const findCertificateBatch = (collection, skip, limit) => {
  return new Promise((resolve, reject) => {
    collection.find({ active: true, balance: { $gt: 0 } }).sort({name: 1}).skip(skip).limit(limit).toArray((err, certificates) => {
      assert.equal(err, null);
      resolve(certificates);
    });
  });
};
