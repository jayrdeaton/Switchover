var { Option_Group, Price, Price_Option_Group } = require('@gameroom/gameroom-kit').models,
  consoles = require('./consoles'),
  colors = require('../../colors'),
  option_groups = {};

module.exports = (game, catalog, product, optionGroupNames) => {
  let result = {
    option_groups: [],
    prices: [],
    price_option_groups: []
  };

  for (let name of optionGroupNames) {
    name = `${catalog} ${name}`;
    if (!option_groups[name]) {
      let option_group = new Option_Group({ name });
      result.option_groups.push(option_group);
      option_groups[name] = option_group;
    };
  };

  let pricesToMake = consoles[catalog].prices;
  let priceConversions = consoles[catalog].priceConversions;

  var index = 0;
  if (pricesToMake.buyIn) {
    var price = new Price({name: "Buy In", index, amount: new String(-game['price_cash']), color: colors.blue, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.buyIn) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.discOnly) {
    let amount = 0;
    if (priceConversions.discOnly) amount = Math.round(game['price'] * priceConversions.discOnly);
    amount = new String(amount);
    var price = new Price({name: "Disc Only", index, amount, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.discOnly) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.discPlus) {
    var price = new Price({name: "Disc Plus", index, amount: new String(game['price']), color: colors.green, product: product.uuid, rank: 1000});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.discPlus) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.instructionManual) {
    let amount = 0;
    // if (priceConversions.instructionManual) amount = Math.round(game['price'] * priceConversions.instructionManual);
    amount = new String(amount);
    var price = new Price({name: "Instruction Manual", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.instructionManual) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.coverArt) {
    let amount = 0;
    // if (priceConversions.coverArt) amount = Math.round(game['price'] * priceConversions.coverArt);
    amount = new String(amount);
    var price = new Price({name: "Cover Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.coverArt) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.cartOnly) {
    let amount = 0;
    if (priceConversions.cartOnly) amount = Math.round(game['price'] * priceConversions.cartOnly);
    amount = new String(amount);
    var price = new Price({name: "Cartridge Only", index, amount, color: colors.green, product: product.uuid, rank: 1000});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.cartOnly) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.cartPlus) {
    var price = new Price({name: "Cartridge Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.cartPlus) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.gameBox) {
    let amount = 0;
    // if (priceConversions.gameBox) amount = Math.round(game['price'] * priceConversions.gameBox);
    amount = new String(amount);
    var price = new Price({name: "Game Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.gameBox) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.rearArt) {
    let amount = 0;
    // if (priceConversions.rearArt) amount = Math.round(game['price'] * priceConversions.rearArt);
    amount = new String(amount);
    var price = new Price({name: "Rear Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.rearArt) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.jewel) {
    let amount = 0;
    // if (priceConversions.jewel) amount = Math.round(game['price'] * priceConversions.jewel);
    amount = new String(amount);
    var price = new Price({name: "CD-I Jewel", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.jewel) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.longbox) {
    let amount = 0;
    // if (priceConversions.longbox) amount = Math.round(game['price'] * priceConversions.longbox);
    amount = new String(amount);
    var price = new Price({name: "Longbox", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.longbox) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.retailBox) {
    let amount = 0;
    // if (priceConversions.retailBox) amount = Math.round(game['price'] * priceConversions.retailBox);
    amount = new String(amount);
    var price = new Price({name: "Retail Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.retailBox) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.huCardOnly) {
    let amount = 0;
    if (priceConversions.huCardOnly) amount = Math.round(game['price'] * priceConversions.huCardOnly);
    amount = new String(amount);
    var price = new Price({name: "HUCard Only", index, amount, color: colors.green, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.huCardOnly) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.huCardPlus) {
    var price = new Price({name: "HUCard Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.huCardPlus) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.rearInsert) {
    let amount = 0;
    // if (priceConversions.rearInsert) amount = Math.round(game['price'] * priceConversions.rearInsert);
    amount = new String(amount);
    var price = new Price({name: "Rear Insert", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.rearInsert) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  if (pricesToMake.gameOverlay) {
    let amount = 0;
    // if (priceConversions.gameOverlay) amount = Math.round(game['price'] * priceConversions.gameOverlay);
    var price = new Price({name: "Game Overlay", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    result.prices.push(price);
    for (let option_group of pricesToMake.gameOverlay) {
      let price_option_group = new Price_Option_Group({price: price.uuid, option_group: option_groups[`${catalog} ${consoles[catalog].optionGroups[option_group]}`].uuid});
      result.price_option_groups.push(price_option_group);
    };
  };
  return result;
};
