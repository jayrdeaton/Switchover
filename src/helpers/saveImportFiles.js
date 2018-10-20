let { existsSync, mkdirSync, unlinkSync, writeFileSync } = require('fs'),
  { join, resolve } = require('path'),
  { promisify } = require('util'),
  rimraf = promisify(require('rimraf'))
  fractureArray = require('./fractureArray'),
  createDirectories = require('./createDirectories');

module.exports = async (dir, data, limits) => {
  dir = resolve(dir);
  if (existsSync(dir)) await rimraf(dir)
  createDirectories(dir);
  for (let key of Object.keys(data)) {
    if (data[key].length === 0) continue;
    let limit = 1000000;
    if (limits && limits[key]) limit = limits[key];
    let array = fractureArray(data[key], limit);
    for (let [index, data] of array.entries()) {
      let filename = key;
      if (array.length > 1) filename += `_${index}`;
      console.log(data.length, filename);
      let path = join(dir, `${filename}.json`);
      writeFileSync(path, JSON.stringify({ [key]: data }));
    };
  };
};
