#!/usr/bin/env node
let json = require('big-json'),
  program = require('commander'),
  { Import } = require('@infinitetoken/cashierfu-api-kit').models,
  customers = require('./customers'),
  games = require('./games'),
  products = require('./products'),
  movies = require('./movies'),
  fs = require('fs'),
  chalk = require('chalk'),
  JSONStream = require('JSONStream'),
  util = require('util'),
  rimraf = require('rimraf'),
  { fractureArray, pad } = require('./helpers'),
  debug = require('./debug');

rimraf = util.promisify(rimraf);

program
  .option('-c, --customers', 'Switchover swapzapp customers')
  .option('-g, --games', 'Switchover swapzapp games')
  .option('-p, --products', 'Extract products from items (excludes games)')
  .option('-m, --movies <file>', 'Extract movies from mikes big list csv')
  .option('-s, --save [save]', 'Save to file')
  .option('-v, --verbose', 'Display more info')
  .option('-d, --debug', 'Debug mode')
  .parse(process.argv);

  let runImport = async () => {
    let imports;
    try {
      imports = await getImports()
    } catch(err) {
      console.log(err);
    };
    if (imports && program.save) saveFiles(imports);
  };

  let getImports = async (updates, req) => {
    let importData = new Import();
    // if (program.customers) imports.push(await customers.switchover());
    if (program.products) await products(importData);
    if (program.games) await games(importData);
    if (program.movies) await movies(importData, program.movies);
    // if (program.debug) imports.push(await debug());
    return importData;
  };

  let saveFiles = async (data) => {
    var dir = './switchover';
    if (program.save && program.save !== true) dir = program.save;
    await rimraf(dir);
    fs.mkdirSync(dir);
    let count = 0;
    for (let key of Object.keys(data)) {
      if (data[key].length === 0) continue;
      let arrays = fractureArray(data[key], 10000);
      let padding = arrays.length.toString().length;
      arrays.forEach((chunk, index) => {
        count++;
        let fileData = {};
        fileData[key] = chunk;
        let path = `${dir}/${key}_${pad(index, padding)}.json`;
        fs.writeFileSync(path, JSON.stringify(fileData, null, 2));
      });
    };

    let plural = '';
    if (count == 0 || count > 1) plural = 's';
    console.log(chalk.green(`${dir} was saved with ${count} file${plural}`));
  };

  runImport();
