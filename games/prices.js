var models = require('../models'),
  Price = models.price,
  PriceOptionGroup = models.priceOptionGroup,
  ObjectWrapper = models.objectWrapper,
  consoles = require('./consoles'),
  colors = require('../colors');

module.exports.getWith = (game, catalog, product, optionGroups) => {
  let pricesToMake = consoles[catalog].prices;
  var objects = [];
  var index = 0;
  if (pricesToMake.buyIn) {
    var price = new Price({name: "Buy In", index, amount: new String(-game['price_cash'] / 100), color: colors.blue, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.buyIn) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.discOnly) {
    var price = new Price({name: "Disc Only", index, amount: new String(game['price']/ 100 * .85), color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.discOnly) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.discPlus) {
    var price = new Price({name: "Disc Plus", index, amount: new String(game['price'] / 100), color: colors.green, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.discPlus) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.instructionManual) {
    var price = new Price({name: "Instruction Manual", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.instructionManual) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.coverArt) {
    var price = new Price({name: "Cover Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.coverArt) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.cartOnly) {
    var price = new Price({name: "Cartridge Only", index, amount: new String(game['price'] / 100), color: colors.green, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.cartOnly) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.cartPlus) {
    var price = new Price({name: "Cartridge Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.cartPlus) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.gameBox) {
    var price = new Price({name: "Game Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.gameBox) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.rearArt) {
    var price = new Price({name: "Rear Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.rearArt) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.jewel) {
    var price = new Price({name: "CD-I Jewel", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.jewel) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.longbox) {
    var price = new Price({name: "Longbox", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.longbox) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.retailBox) {
    var price = new Price({name: "Retail Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.retailBox) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.huCardOnly) {
    var price = new Price({name: "HUCard Only", index, amount: new String(game['price'] / 100), color: colors.green, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.huCardOnly) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.huCardPlus) {
    var price = new Price({name: "HUCard Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.huCardPlus) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.rearInsert) {
    var price = new Price({name: "Rear Insert", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.rearInsert) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  if (pricesToMake.gameOverlay) {
    var price = new Price({name: "Game Overlay", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(new ObjectWrapper({type: 'Price', object: price}));
    for (let option of pricesToMake.gameOverlay) {
      let priceOptionGroup = new PriceOptionGroup({name: optionGroups[option + 1].object.name, price: price.uuid, optionGroup: optionGroups[option + 1].object.uuid, color: colors.blue});
      objects.push(new ObjectWrapper({type: 'PriceOptionGroup', object: priceOptionGroup}));
    };
  };
  return objects;
};
