const { readFileSync } = require('fs'),
  { join } = require('path'),
  { lib, models } = require('@gameroom/emporium'),
  { Import } = require('../../models'),
  { Charge, Gift_Certificate } = models,
  { saveImportFiles } = require('../../helpers');

module.exports = async (options) => {
  const dir = options._parents.switchover.dir || './switchover';
  const { file } = options;

  let result = new Import();

  const items = JSON.parse(readFileSync(file));

  for (const item of items) {
    const gift_certificate = new Gift_Certificate({
      pan: item.code
    });
    result.gift_certificates.push(gift_certificate);
    if (item.value !== item.balance) {
      const initial_charge = new Charge({
        chargeable: gift_certificate.uuid,
        chargeable_type: 'GiftCertificate',
        amount: item.value * 100,
        posted: true
      });
      const updated_charge = new Charge({
        chargeable: gift_certificate.uuid,
        chargeable_type: 'GiftCertificate',
        amount: -((item.value * 100) - (item.balance * 100)),
        posted: true
      });
      result.charges.push(initial_charge, updated_charge);
    } else {
      const charge = new Charge({
        chargeable: gift_certificate.uuid,
        chargeable_type: 'GiftCertificate',
        amount: item.balance * 100,
        posted: true
      });
      result.charges.push(charge);
    };
  };
  saveImportFiles(join(dir, 'gamers_giftcards'), result);
};
