var { Price } = require('@gameroom/emporium').models,
  types = require('./types'),
  { blue, green, mutedGreen } = require('../../colors');

module.exports = (object, product) => {
  var prices = [];
  var index = 0;

  if (object.type.includes('Blu-Ray')) {
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
  } else if (object.type.includes('UMD')) {
    for (let name of Object.keys(types['UMD'].prices)) {

    };
  } else {
    for (let name of Object.keys(types['DVD'].prices)) {

    };
  };

  var price = new Price({name: 'Buy In', index, color: blue, product: product.id});
  if (object.type.includes('Blu-ray')) { price.amount = '-100' } else { price.amount = '-25' };
  prices.push(price);
  index++;
  price = new Price({name: 'Cover Artwork', index, color: mutedGreen, product: product.id});
  prices.push(price);
  index++;
  price = new Price({name: 'Disc Plus', index, color: green, product: product.id, rank: 1000 });
  prices.push(price);
  index++;
  if (object.type.includes('Multidisc')) {
    price = new Price({name: 'Multidisc Only', index, color: mutedGreen, product: product.id});
    prices.push(price);
    index++;
  } else {
    price = new Price({name: 'Disc Only', index, color: mutedGreen, product: product.id});
    prices.push(price);
    index++;
    price = new Price({name: 'Buy In Disc Only', index, color: blue, product: product.id, amount: '-10'});
  };
  return prices;
};
