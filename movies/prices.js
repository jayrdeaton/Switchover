var Price = require('../models').price;

module.exports.create = (product) => {
  var prices = [];
  var index = 0;
  var price = new Price({name: 'Buy In', index, color: 'blue'});
  if (product.tags.includes('Blu-ray')) {
    price.amount = -100;
  } else {
    price.amount = -25;
  };
  prices.push(price);
  index++;
  price = new Price({name: 'Cover Artwork', index, color: 'mutedGreen'});
  prices.push(price);
  index++;
  price = new Price({name: 'Disc Plus', index, color: 'green'});
  prices.push(price);
  index++;
  if (product.tags.includes('Multidisc')) {
    price = new Price({name: 'Multidisc Only', index, color: 'mutedGreen'});
    prices.push(price);
    index++;
  } else {
    price = new Price({name: 'Disc Only', index, color: 'mutedGreen'});
    prices.push(price);
    index++;
    price = new Price({name: 'Buy In Disc Only', index, color: 'blue', amount: -10});
  };
  return prices;
};
