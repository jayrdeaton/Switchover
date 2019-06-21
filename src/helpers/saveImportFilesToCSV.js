const { createWriteStream, existsSync, mkdirSync, unlinkSync, writeFileSync } = require('fs'),
  { join, resolve } = require('path'),
  { promisify } = require('util'),
  rimraf = promisify(require('rimraf')),
  fastcsv = require('fast-csv'),
  fractureArray = require('./fractureArray'),
  createDirectories = require('./createDirectories'),
  prepairForCsv = require('./prepairForCsv');

module.exports = async (dir, data) => {
  prepairForCsv(data);
  dir = resolve(dir);
  if (existsSync(dir)) await rimraf(dir);
  createDirectories(dir);
  for (let key of Object.keys(data)) {
    if (data[key].length === 0) continue;
    // const array = fractureArray(data[key], limit);
    // for (let [index, data] of array.entries()) {
      let filename = key;
      // if (array.length > 1) filename += `_${index}`;
      // console.log(data.length, filename);
      const path = join(dir, `${filename}.csv`);
      const ws = createWriteStream(path);
      // console.log(data)
      fastcsv.write(data, { headers: true }).pipe(ws);
    // };
  };
};
