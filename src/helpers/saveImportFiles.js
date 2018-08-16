let { existsSync, mkdirSync, unlinkSync, writeFileSync } = require('fs'),
  { join, resolve } = require('path'),
  { promisify } = require('util'),
  rimraf = promisify(require('rimraf'))
  fractureArray = require('./fractureArray');

module.exports = async (folderName, data) => {
  let dir = resolve('./switchover');
  if (!existsSync(dir)) mkdirSync(dir);
  dir = join(dir, folderName);
  if (existsSync(dir)) await rimraf(dir)
  mkdirSync(dir);
  for (let key of Object.keys(data)) {
    if (data[key].length === 0) continue;
    let array = fractureArray(data[key], 1000000);
    for (let [index, data] of array.entries()) {
      let filename = key;
      if (array.length > 1) filename += `_${index}`;
      console.log(data.length, filename);
      let path = join(dir, `${filename}.json`);
      writeFileSync(path, JSON.stringify({ [key]: data }));
    };
  };
};
