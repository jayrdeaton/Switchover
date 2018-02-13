let Product = require('../models').product,
  colors = require('../colors');

module.exports.create = (object) => {
  var product = new Product(object);
  if (object.edition) product.name += ' ' + object.edition;
  product.identifier = object.upc;
  product.color = colors.purple;
  return product;
};
