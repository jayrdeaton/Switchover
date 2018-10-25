let { Option_Group } = require('@gameroom/gameroom-kit').models,
  colors = require('../../colors'),
  types = require('./types'),
  optionGroups = {};

module.exports = (object, product, prices) => {
  let optionGroups = [], priceOptionGroups = [];
  if (object.type.includes('Blu-ray')) {
    for (let name of types['Blu-Ray'].optionGroups) {
      optionGroups.push(new Option_Group({name, index: optionGroups.length, color: colors.blue, catalog: catalogs.blurays.uuid }))
    };
  } else if (object.type.includes('UMD')) {
    for (let name of types['UMD'].optionGroups) {
      optionGroups.push(new Option_Group({name, index: optionGroups.length, color: colors.blue, catalog: catalogs.umds.uuid }))
    };
  } else {
    for (let name of types['DVD'].optionGroups) {
      optionGroups.push(new Option_Group({name, index: optionGroups.length, color: colors.blue, catalog: catalogs.dvds.uuid }))
    };
  };
  return { optionGroups, priceOptionGroups };
};
