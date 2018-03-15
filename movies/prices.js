var models = require('../models'),
  Price = models.price,
  Wrapper = models.objectWrapper,
  colors = require('../colors');

module.exports.create = (object, product) => {
  var prices = [];
  var index = 0;
  var price = new Price({name: 'Buy In', index, color: colors.blue, product: product.uuid});
  if (object.type.includes('Blu-ray')) {
    price.amount = '-1.00';
  } else {
    price.amount = '-0.25';
  };
  prices.push(price);
  index++;
  price = new Price({name: 'Cover Artwork', index, color: colors.mutedGreen, product: product.uuid});
  prices.push(price);
  index++;
  price = new Price({name: 'Disc Plus', index, color: colors.green, product: product.uuid});
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
    price = new Price({name: 'Buy In Disc Only', index, color: colors.blue, product: product.uuid, amount: '-0.10'});
  };

  let wrappers = [];
  for (let price of prices) {
    wrappers.push(new Wrapper({type: 'Price', object: price}));
  };

  return wrappers;
};
