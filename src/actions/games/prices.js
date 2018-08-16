var { Price, Price_Option_Group } = require('@infinitetoken/cashierfu-api-kit').models,
  consoles = require('./consoles'),
  colors = require('../../colors');

module.exports.getWith = (game, catalog, product, optionGroups) => {
  let pricesToMake = consoles[catalog].prices;
  let priceConversions = consoles[catalog].priceConversions;
  let objects = [];
  // var objects = {
  //   prices: [],
  //   priceOptionGroups: []
  // };
  var index = 0;
  if (pricesToMake.buyIn) {
    var price = new Price({name: "Buy In", index, amount: new String(-game['price_cash']), color: colors.blue, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.buyIn) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.discOnly) {
    let amount = 0;
    if (priceConversions.discOnly) amount = Math.round(game['price'] * priceConversions.discOnly);
    amount = new String(amount);
    var price = new Price({name: "Disc Only", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.discOnly) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.discPlus) {
    var price = new Price({name: "Disc Plus", index, amount: new String(game['price']), color: colors.green, product: product.uuid, rank: 1000});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.discPlus) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.instructionManual) {
    let amount = 0;
    if (priceConversions.instructionManual) amount = Math.round(game['price'] * priceConversions.instructionManual);
    amount = new String(amount);
    var price = new Price({name: "Instruction Manual", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.instructionManual) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.coverArt) {
    let amount = 0;
    if (priceConversions.coverArt) amount = Math.round(game['price'] * priceConversions.coverArt);
    amount = new String(amount);
    var price = new Price({name: "Cover Artwork", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.coverArt) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.cartOnly) {
    let amount = 0;
    if (priceConversions.cartOnly) amount = Math.round(game['price'] * priceConversions.cartOnly);
    amount = new String(amount);
    var price = new Price({name: "Cartridge Only", index, amount, color: colors.green, product: product.uuid, rank: 1000});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.cartOnly) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.cartPlus) {
    var price = new Price({name: "Cartridge Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.cartPlus) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.gameBox) {
    let amount = 0;
    if (priceConversions.gameBox) amount = Math.round(game['price'] * priceConversions.gameBox);
    amount = new String(amount);
    var price = new Price({name: "Game Box", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.gameBox) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.rearArt) {
    let amount = 0;
    if (priceConversions.rearArt) amount = Math.round(game['price'] * priceConversions.rearArt);
    amount = new String(amount);
    var price = new Price({name: "Rear Artwork", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.rearArt) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.jewel) {
    let amount = 0;
    if (priceConversions.jewel) amount = Math.round(game['price'] * priceConversions.jewel);
    amount = new String(amount);
    var price = new Price({name: "CD-I Jewel", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.jewel) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.longbox) {
    let amount = 0;
    if (priceConversions.longbox) amount = Math.round(game['price'] * priceConversions.longbox);
    amount = new String(amount);
    var price = new Price({name: "Longbox", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.longbox) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.retailBox) {
    let amount = 0;
    if (priceConversions.retailBox) amount = Math.round(game['price'] * priceConversions.retailBox);
    amount = new String(amount);
    var price = new Price({name: "Retail Box", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.retailBox) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.huCardOnly) {
    let amount = 0;
    if (priceConversions.huCardOnly) amount = Math.round(game['price'] * priceConversions.huCardOnly);
    amount = new String(amount);
    var price = new Price({name: "HUCard Only", index, amount, color: colors.green, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.huCardOnly) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.huCardPlus) {
    var price = new Price({name: "HUCard Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.huCardPlus) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.rearInsert) {
    let amount = 0;
    if (priceConversions.rearInsert) amount = Math.round(game['price'] * priceConversions.rearInsert);
    amount = new String(amount);
    var price = new Price({name: "Rear Insert", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.rearInsert) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  if (pricesToMake.gameOverlay) {
    let amount = 0;
    if (priceConversions.gameOverlay) amount = Math.round(game['price'] * priceConversions.gameOverlay);
    var price = new Price({name: "Game Overlay", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    objects.push(price);
    // for (let option of pricesToMake.gameOverlay) {
    //   let priceOptionGroup = new Price_Option_Group({name: optionGroups[option].name, price: price.uuid, optionGroup: optionGroups[option].uuid, color: colors.blue});
    //   objects.priceOptionGroups.push(priceOptionGroup);
    // };
  };
  return objects;
};
