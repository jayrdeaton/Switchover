let models = require('../models'),
  Tag = models.tag,
  ObjectWrapper = models.objectWrapper;

module.exports.create = (object, product) => {
  let tagsToCreate = [object.genre, object.rating];
  object.type.forEach((type) => {
    tagsToCreate.push(type);
  });
  if (object.discs > 1) tagsToCreate.push('Multidisc');
  if (object.format) tagsToCreate.push(object.format);
  if (object.steelbook) tagsToCreate.push("Steelbook");
  if (object.aspect && object.aspect !== "VAR") tagsToCreate.push(object.aspect);

  let wrappers = [];
  for (let i = 0; i < tagsToCreate.length; i++) {
    let tag = new Tag({name: tagsToCreate[i], index: i, product: product.uuid});
    wrappers.push(new ObjectWrapper({type: 'Tag', object: tag}));
  };
  return wrappers;
};
