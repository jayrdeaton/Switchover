let { Option_Group, Price, Price_Option_Group } = require('@gameroom/emporium').models,
  colors = require('../../colors'),
  types = require('./types'),
  master = { bluray: {}, umd: {}, dvd: {} };

module.exports = (object, product) => {
  const optionGroups = [], priceOptionGroups = [], prices = [];
  if (object.type.includes('Blu-ray')) {
    for (const name of types['Blu-Ray'].prices) {
      const price = new Price({ name, product_id: product.id });
      if (name === 'Buy In') price.amount = -100;
      prices.push(price);
      const option_group_name = `Blu-Ray Template ${name.toUpperCase()}`;
      if (!master.bluray[option_group_name]) {
        const option_group = new Option_Group({ name: option_group_name });
        master.bluray[option_group_name] = option_group;
        optionGroups.push(option_group);
      };
      const price_option_group = new Price_Option_Group({ price_id: price.id, option_group_id: master.bluray[option_group_name].id });
      priceOptionGroups.push(price_option_group);
    };
  } else if (object.type.includes('UMD')) {
    for (const name of types['UMD'].prices) {
      const price = new Price({ name, product_id: product.id });
      if (name === 'Buy In') price.amount = -25;
      prices.push(price);
      const option_group_name = `UMD Template ${name.toUpperCase()}`;
      if (!master.umd[option_group_name]) {
        const option_group = new Option_Group({ name: option_group_name });
        master.umd[option_group_name] = option_group;
        optionGroups.push(option_group);
      };
      const price_option_group = new Price_Option_Group({ price_id: price.id, option_group_id: master.umd[option_group_name].id });
      priceOptionGroups.push(price_option_group);
    };
  } else {
    for (const name of types['DVD'].prices) {
      const price = new Price({ name, product_id: product.id });
      if (name === 'DVD') price.amount = -100;
      prices.push(price);
      const option_group_name = `DVD Template ${name.toUpperCase()}`;
      if (!master.dvd[option_group_name]) {
        const option_group = new Option_Group({ name: option_group_name });
        master.dvd[option_group_name] = option_group;
        optionGroups.push(option_group);
      };
      const price_option_group = new Price_Option_Group({ price_id: price.id, option_group_id: master.dvd[option_group_name].id });
      priceOptionGroups.push(price_option_group);
    };
  };
  return { optionGroups, priceOptionGroups, prices };
};
