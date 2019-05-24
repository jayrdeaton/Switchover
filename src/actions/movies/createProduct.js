let { Product } = require('@gameroom/emporium').models,
  colors = require('../../colors');

module.exports = (object) => {
  var product = new Product(object);
  if (object.edition) product.name += ' ' + object.edition;
  product.identifier = object.upc;
  product.color = colors.purple;
  return product;
};
