let models = require('../models'),
  Property = models.property,
  Wrapper = models.objectWrapper;

module.exports.create = (object, product) => {
  properties = [];
  let index = 0;

  let property = new Property({key: "releaseDate", value: object['dvd_releasedate'], index, product: product.uuid});
  index++;
  properties.push(property);

  if (object.studio) {
    let property = new Property({key: 'studio', value: object.studio, index, product: product.uuid});
    index++;
    properties.push(property);
  };

  if (object.released) {
    let property = new Property({key: 'released', value: object.released, index, product: product.uuid});
    index++;
    properties.push(property);
  };

  if (object.discs > 1) {
    let property = new Property({key: 'discs', value: object.discs.toString(), index, product: product.uuid});
    index++;
    properties.push(property);
  };

  let version;
  if (object.collection) {
    version = object.collection
  };
  if (object.anniversary && version) {
    version += " " + object.anniversary;
  } else if (object.anniversary) {
    version = object.anniversary;
  };
  if (object.version && version) {
    version += " " + object.version;
  } else if (object.version) {
    version = object.version;
  };
  if (object.steelbook && version) {
    version += " Steelbook";
  } else if (object.steelbook) {
    version = "Steelbook";
  };
  if (version) {
    let property = new Property({key: 'version', value: version, index, product: product.uuid});
    properties.push(property);
  };

  let wrappers = [];
  for (let property of properties) {
    wrappers.push(new Wrapper({type: 'Property', object: property}));
  };

  return wrappers;
};
