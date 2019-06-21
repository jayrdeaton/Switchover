let { Product } = require('@gameroom/emporium').models,
  uuid = require('uuid'),
  colors = require('../../colors');

module.exports = (object) => {
  let product = new Product(object);
  product.id = uuid.v1();
  if (object.edition) product.name += ' ' + object.edition;
  product.identifier = object.upc;
  // product.color = colors.purple;
  return product;
};
