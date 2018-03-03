#!/usr/bin/env node
let program = require('commander'),
  customers = require('./customers'),
  games = require('./games'),
  products = require('./products'),
  movies = require('./movies'),
  fs = require('fs'),
  chalk = require('chalk'),
  JSONStream = require('JSONStream'),
  rimraf = require('rimraf'),
  pad = require('./helpers').pad,
  debug = require('./debug');

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
    let imports = [];
    if (program.customers) imports.push(await customers.switchover());
    if (program.products) imports.push(await products.v3.switchover());
    if (program.games) imports.push(...await games.v3.switchover());
    if (program.movies) imports.push(...await movies.v2.switchover(program.movies));
    if (program.debug) imports.push(await debug());
    return imports;
  };

  let saveFiles = (imports) => {
    var dir = './switchover';
    if (program.save && program.save !== true) dir = program.save;
    rimraf(dir, () => {
      fs.mkdirSync(dir);
      let padding = imports.length.toString().length;
      imports.forEach((chunk, index) => {
        let file = dir + '/' + pad(index, padding) + '.json';
        fs.writeFile(file, JSON.stringify(chunk, null, 2), function(err) {
          if(err) return console.log(err);
        });
      });
      let plural = '';
      if (imports.length == 0 || imports.length > 1) plural = 's';
      console.log(chalk.green(`${dir} was saved with ${imports.length} file${plural}`));
    });
  };

  runImport();
