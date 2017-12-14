var Price = require('../models').price,
  convert = require('./convert'),
  colors = require('../colors');

module.exports.getWith = (game, catalog, product) => {
  let pricesToMake = convert.prices[catalog];
  var prices = [];
  var index = 0;
  if (pricesToMake.buyIn) {
    var price = new Price({name: "Buy In", index, amount: -game['price_cash'], color: colors.blue, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.discOnly) {
    var price = new Price({name: "Disc Only", index, amount: game['price'] * .85, color: colors.mutedGreen, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.discPlus) {
    var price = new Price({name: "Disc Plus", index, amount: game['price'], color: colors.green, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.instructionManual) {
    var price = new Price({name: "Instruction Manual", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.coverArt) {
    var price = new Price({name: "Cover Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.cartOnly) {
    var price = new Price({name: "Cartridge Only", index, amount: game['price'], color: colors.green, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.cartPlus) {
    var price = new Price({name: "Cartridge Plus", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.gameBox) {
    var price = new Price({name: "Game Box", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    prices.push(price);
  };
  if (pricesToMake.rearArt) {
    var price = new Price({name: "Rear Artwork", index, color: colors.mutedGreen, product: product.uuid});
    index++;
    prices.push(price);
  };
  for (let i = 0; i < prices.length; i++) {
    price.index = i;
  };
  return prices;
};
