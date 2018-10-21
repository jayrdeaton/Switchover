let { Product_Tag, Tag } = require('@gameroom/gameroom-api-kit').models;

let tags = {};
let keys = [];

module.exports.create = (object, product, result) => {
  for (let key of Object.keys(object)) if (!keys.includes(key)) keys.push(key);

  let product_tags = [];

  let tagNames = [object.rating];
  for (let type of object.type) tagNames.push(type);
  for (let genre of object.genre.split('/')) tagNames.push(genre);

  if (object.discs > 1) tagNames.push('Multidisc');
  if (object.year && object.year !== "VAR" && object.year != "UNK") tagNames.push(object.year);

  for (let name of tagNames) {
    if (!tags[name]) {
      let tag = new Tag({ name });
      tags[name] = tag;
      result.tags.push(tag);
    };
    let product_tag = new Product_Tag({ product: product.uuid, tag: tags[name].uuid });
    product_tags.push(product_tag);
  };

  return product_tags;
  // console.log(tagNames);

  // if (object.aspect && object.aspect !== "VAR") tagNames.push(object.aspect);
  // if (object.format) tagNames.push(object.format);
  // if (object.steelbook) tagNames.push("Steelbook");
  // if (object.edition) {
  //   // Edition
  // };
  // if (object.format) {
  //   // Widescreen
  //   // console.log(object.format)
  // };
  // if (object.collection) {
  //
  // };
  // if (object.anniversary) {
  //
  // };
  // if (object.version) {
  //
  // };
  // if (object.steelbook) {
  //
  // };
  //
  // if (object.exclusive) {
  //
  // };
  // if (object.cut) {
  //   if (object.cut === "Unrated Director's Cut") console.log(object.rating);
  //   console.log(object.cut);
  // };

  // console.log()
  // console.log(tagNames);
  // let tags = [];
  // for (let i = 0; i < tagNames.length; i++) {
  //   let tag = new Tag({name: tagNames[i], index: i, product: product.uuid});
  //   tags.push(tag);
  // };
  // return tags;
};
