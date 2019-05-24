var { Price } = require('@gameroom/emporium').models,
  types = require('./types'),
  { blue, green, mutedGreen } = require('../../colors');

module.exports = (object, product) => {
  var prices = [];
  var index = 0;

  if (object.types.includes('Blu-Ray')) {
    for (let name of Object.keys(types['Blu-Ray'].prices)) {
      let amount = 0;
      let color = mutedGreen;
      let rank = 0;
      if (name === 'Buy In') {
        amount = -100;
        color = blue;
      };
      if (name === 'Disc Plus' || name === 'Cart Plus') {
        color = green;
        rank = 1000;
      }
      let price = new Price({})
    };
  } else if (object.types.includes('UMD')) {
    for (let name of Object.keys(types['UMD'].prices)) {

    };
  } else {
    for (let name of Object.keys(types['DVD'].prices)) {

    };
  };

  var price = new Price({name: 'Buy In', index, color: colors.blue, product: product.uuid});
  if (object.type.includes('Blu-ray')) { price.amount = '-100' } else { price.amount = '-25' };
  prices.push(price);
  index++;
  price = new Price({name: 'Cover Artwork', index, color: colors.mutedGreen, product: product.uuid});
  prices.push(price);
  index++;
  price = new Price({name: 'Disc Plus', index, color: colors.green, product: product.uuid, rank: 1000 });
  prices.push(price);
  index++;
  if (object.type.includes('Multidisc')) {
    price = new Price({name: 'Multidisc Only', index, color: colors.mutedGreen, product: product.uuid});
    prices.push(price);
    index++;
  } else {
    price = new Price({name: 'Disc Only', index, color: colors.mutedGreen, product: product.uuid});
    prices.push(price);
    index++;
    price = new Price({name: 'Buy In Disc Only', index, color: colors.blue, product: product.uuid, amount: '-10'});
  };
  return prices;
};
