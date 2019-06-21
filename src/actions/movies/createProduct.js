let { Product } = require('@gameroom/emporium').models,
  uuid = require('uuid'),
  colors = require('../../colors');

module.exports = (object) => {
  let product = new Product(object);
  product.id = uuid.v1();
  if (object.edition) product.name += ' ' + object.edition;
  product.identifier = object.upc;
  // product.color = colors.purple;
  // subname and measurements
  if (object.type.includes('Blu-ray')) {
    product.subname = 'Blu-ray';
    product.depth = 0.5;
    product.height = 5.5;
    product.width = 6.75;
    product.weight = 5.0;
  } else if (object.type.includes('UMD')) {
    product.subname = 'UMD';
  } else {
    product.subname = 'DVD';
    product.depth = 0.75;
    product.height = 7.5;
    product.width = 5.5;
    product.weight = 5.0;
  };
  product.subname += ` ${object.genre} ${object.year} ${object.rating}`;
  return product;
};
