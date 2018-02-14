var models = require('../models'),
  Price = models.price,
  PriceOptionGroup = models.priceOptionGroup
  consoles = require('./consoles'),
  colors = require('../colors');

module.exports.getWith = (game, catalog, product, optionGroups) => {
  let pricesToMake = consoles[catalog].prices;
  var objects = [];
  var index = 0;
  if (pricesToMake.buyIn) {
    var price = new Price({name: "Buy In", index, amount: -game['price_cash'] / 100, color: colors.blue, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.buyIn) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.discOnly) {
    var price = new Price({name: "Disc Only", index, amount: game['price']/ 100 * .85, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.discOnly) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.discPlus) {
    var price = new Price({name: "Disc Plus", index, amount: game['price'] / 100, color: colors.green, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.discPlus) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.instructionManual) {
    var price = new Price({name: "Instruction Manual", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.instructionManual) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.coverArt) {
    var price = new Price({name: "Cover Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.coverArt) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.cartOnly) {
    var price = new Price({name: "Cartridge Only", index, amount: game['price'] / 100, color: colors.green, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.cartOnly) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.cartPlus) {
    var price = new Price({name: "Cartridge Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.cartPlus) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.gameBox) {
    var price = new Price({name: "Game Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.gameBox) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  if (pricesToMake.rearArt) {
    var price = new Price({name: "Rear Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    for (let option in pricesToMake.rearArt) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
      objects.push(priceOptionGroup);
    };
  };
  return objects;
};
