#!/usr/bin/env node
var program = require('commander'),
  customers = require('./customers'),
  games = require('./games'),
  products = require('./products'),
  movies = require('./movies'),
  fs = require('fs'),
  chalk = require('chalk');

program
  .option('-c, --customers', 'Switchover swapzapp customers')
  .option('-g, --games', 'Switchover swapzapp games')
  .option('-p, --products', 'Extract products from items (excludes games)')
  .option('-m, --movies <file>', 'Extract movies from mikes big list csv')
  .option('-s, --save [save]', 'Save to file')
  .option('-v, --verbose', 'Display more info')
  .parse(process.argv);

var s = 0;
var c = 0;
if (program.customers) {
  s++;
  s++;
  customers.switchover().then((data) => {
    updateFile('customers', data.customers);
    updateFile('adjustments', data.adjustments);
  });
};
if (program.products) {
  s++;
  products.switchover().then((products) => {
    updateFile('products', products);
  });
};
if (program.games) {
  s++;
  games.switchover().then((games) => {
    updateFile('catalogs', games);
    // updateFile('products', data.other);
  });
};
if (program.movies) {
  s++;
  movies.switchover(program.movies).then((data) => {
    updateFile('catalogs', data);
  });
};
var contents = {};

var updateFile = (key, content) => {
  if (contents[key]) {
    contents[key].concat(content);
  } else {
    contents[key] = content;
  };
  c++;
  if (c === s && program.save) saveFile();
};

var saveFile = () => {
  var dir;
  if (program.save && program.save !== true) {
    dir = program.save;
  } else {
    dir = "./switchover";
  };
  dir += ".json"
  var data = JSON.stringify(contents);
  fs.writeFile(dir, data, function(err) {
    if(err) {
        return console.log(err);
    };
    console.log(chalk.green(dir + " was saved!"));
  });
};
