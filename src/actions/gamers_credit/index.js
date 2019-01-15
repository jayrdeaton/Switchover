const { readFileSync } = require('fs'),
  { join } = require('path'),
  { lib, models } = require('@gameroom/gameroom-kit'),
  { Import } = lib,
  { Charge, Customer, Note } = models,
  { saveImportFiles } = require('../../helpers');


module.exports = async (options) => {
  const dir = options._parents.switchover.dir || './switchover';
  const { file } = options;

  let result = new Import();

  const items = JSON.parse(readFileSync(file));
  let count = 0;
  for (let item of items) {
    if (item.balance > 0) continue;
    count++;
    const names = item.customerName.split(', ');

    let firstAndMiddle = names.length > 2 ? names[2] : names[1];
    firstAndMiddle = firstAndMiddle.replace(' (LAYAWAY)', '');
    firstAndMiddle = firstAndMiddle.replace(' (lay away)', '');
    firstAndMiddle = firstAndMiddle.replace(' (Layaway)', '');
    firstAndMiddle = firstAndMiddle.split(' ');

    const first_name = firstAndMiddle[0].trim();
    const middle_name = firstAndMiddle.length > 1 ? firstAndMiddle[1].trim() : null;
    const last_name = names[0].trim();
    const suffix = names.length > 2 ? names[1].trim() : null;

    const customer = new Customer({
      first_name,
      last_name,
      middle_name,
      suffix
    });
    result.customers.push(customer);

    const note = new Note({
      info: JSON.stringify({
        gamers: {
          customerID: item.customerID,
          customerCardCode: item.customerCardCode !== '' ? item.customerCardCode : null
        }
      }, null, 2),
      noteable: customer.uuid,
      noteable_type: 'Customer'
    });
    result.notes.push(note);

    const charge = new Charge({
      amount: Math.round(Math.abs(item.balance) * 100),
      posted: true,
      chargeable: customer.uuid,
      chargeable_type: 'Customer'
    })
    result.charges.push(charge);
  };
  saveImportFiles(join(dir, 'gamers_credit'), result);
};
