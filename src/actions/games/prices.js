var { Price, Price_Option_Group } = require('@infinitetoken/cashierfu-api-kit').models,
  consoles = require('./consoles'),
  colors = require('../../colors');

module.exports.getWith = (game, catalog, product, optionGroups) => {
  let pricesToMake = consoles[catalog].prices;
  var objects = {
    prices: [],
    priceOptionGroups: []
  };
  var index = 0;
  if (pricesToMake.buyIn) {
    var price = new Price({name: "Buy In", index, amount: new String(-game['price_cash'] / 100), color: colors.blue, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.buyIn) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.discOnly) {
    var price = new Price({name: "Disc Only", index, amount: new String(game['price']/ 100 * .85), color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.discOnly) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.discPlus) {
    var price = new Price({name: "Disc Plus", index, amount: new String(game['price'] / 100), color: colors.green, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.discPlus) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.instructionManual) {
    var price = new Price({name: "Instruction Manual", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.instructionManual) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.coverArt) {
    var price = new Price({name: "Cover Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.coverArt) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.cartOnly) {
    var price = new Price({name: "Cartridge Only", index, amount: new String(game['price'] / 100), color: colors.green, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.cartOnly) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.cartPlus) {
    var price = new Price({name: "Cartridge Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.cartPlus) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.gameBox) {
    var price = new Price({name: "Game Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.gameBox) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.rearArt) {
    var price = new Price({name: "Rear Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.rearArt) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.jewel) {
    var price = new Price({name: "CD-I Jewel", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.jewel) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.longbox) {
    var price = new Price({name: "Longbox", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.longbox) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.retailBox) {
    var price = new Price({name: "Retail Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.retailBox) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.huCardOnly) {
    var price = new Price({name: "HUCard Only", index, amount: new String(game['price'] / 100), color: colors.green, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.huCardOnly) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.huCardPlus) {
    var price = new Price({name: "HUCard Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.huCardPlus) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.rearInsert) {
    var price = new Price({name: "Rear Insert", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.rearInsert) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  if (pricesToMake.gameOverlay) {
    var price = new Price({name: "Game Overlay", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.prices.push(price);
    for (let option of pricesToMake.gameOverlay) {
      let priceOptionGroup = new Price_Option_Group({name: optionGroups[option + 1].name, price: price.uuid, optionGroup: optionGroups[option + 1].uuid, color: colors.blue});
      objects.priceOptionGroups.push(priceOptionGroup);
    };
  };
  return objects;
};
