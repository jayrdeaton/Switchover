let { Tag } = require('@gameroom/emporium').models;

let existingTags = {};
let keys = [];

module.exports = (object, product) => {
  for (let key of Object.keys(object)) if (!keys.includes(key)) keys.push(key);

  let product_tags = [];
  let tags = [];

  product_tags = [object.rating];
  for (let type of object.type) product_tags.push(type);
  for (let genre of object.genre.split('/')) product_tags.push(genre);

  if (object.discs > 1) product_tags.push('Multidisc');
  if (object.year && object.year !== "VAR" && object.year != "UNK") product_tags.push(object.year);

  for (let name of product_tags) {
    if (!existingTags[name]) {
      let tag = new Tag({ name });
      existingTags[name] = tag;
      tags.push(tag);
    };
  };
  return { product_tags, tags };
};
