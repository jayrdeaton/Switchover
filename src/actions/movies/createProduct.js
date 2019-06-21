let { Product } = require('@gameroom/emporium').models,
  uuid = require('uuid'),
  colors = require('../../colors');

module.exports = (object) => {
  let product = new Product(object);
  product.id = uuid.v1();
  if (object.edition) product.name += ' ' + object.edition;
  product.identifier = object.upc;
  // product.color = colors.purple;
  // subname
  if (object.type.includes('Blu-ray')) {
    object.subname = 'Blu-ray';
  } else if (object.type.includes('UMD')) {
    object.subname = 'UMD';
  } else {
    object.subname = 'DVD';
  };
  object.subname += ` ${object.genre} ${object.year} ${object.rating}`;
  return product;
};
