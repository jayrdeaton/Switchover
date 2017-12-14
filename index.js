#!/usr/bin/env node
let program = require('commander'),
  customers = require('./customers'),
  games = require('./games'),
  products = require('./products'),
  movies = require('./movies'),
  fs = require('fs'),
  chalk = require('chalk'),
  JSONStream = require('JSONStream'),
  rimraf = require('rimraf');

program
  .option('-c, --customers', 'Switchover swapzapp customers')
  .option('-g, --games', 'Switchover swapzapp games')
  .option('-p, --products', 'Extract products from items (excludes games)')
  .option('-m, --movies <file>', 'Extract movies from mikes big list csv')
  .option('-s, --save [save]', 'Save to file')
  .option('-v, --verbose', 'Display more info')
  .parse(process.argv);

  let runImport = () => {
    getImports().then((imports) => {
      if (program.save) saveFiles(imports);
    });
  };
  let getImports = async (updates, req) => {
    let imports = [];
    if (program.customers) imports.push(await customers.switchover());
    if (program.products) imports.push(await products.v2.switchover());
    if (program.games) imports.push(...await games.v2.switchover());
    // if (program.movies) imports.push(await movies.switchover());
    return imports;
  };
  let saveFiles = (imports) => {
    var dir;
      if (program.save && program.save !== true) {
        dir = program.save;
      } else {
        dir = "./switchover";
      };
    rimraf(dir, () => {
      fs.mkdirSync(dir);
      let padding = imports.length.toString().length;
      imports.forEach((chunk, index) => {
        let file = dir + '/' + pad(index, padding) + '.json';
        fs.writeFile(file, JSON.stringify(chunk), function(err) {
          if(err) return console.log(err);
        });
      });
      console.log(chalk.green(dir, "was saved with", imports.length, "files"));
    });
  };
  let pad = (num, padding) => {
    num = num.toString();
    while (num.length < padding) {
      num = `0${num}`;
    };
    return num
  }
  runImport();

// var s = 0;
// var c = 0;
// if (program.customers) {
//   s++;
//   s++;
//   customers.switchover().then((data) => {
//     updateFile('customers', data.customers);
//     updateFile('adjustments', data.adjustments);
//   });
// };
// if (program.products) {
//   s++;
//   products.switchover().then((products) => {
//     updateFile('catalogs', products);
//   });
// };
// if (program.games) {
//   s++;
//   games.switchover().then((games) => {
//     updateFile('catalogs', games);
//     // updateFile('products', data.other);
//   });
// };
// if (program.movies) {
//   s++;
//   movies.switchover(program.movies).then((data) => {
//     updateFile('catalogs', data);
//   });
// };

// var contents = {};
//
// var updateFile = (key, content) => {
//   if (contents[key]) {
//     contents[key] = contents[key].concat(content);
//   } else {
//     contents[key] = content;
//   };
//   c++;
//   if (c === s && program.save) saveFile();
// };
//
// var saveFile = () => {
//   var dir;
//   if (program.save && program.save !== true) {
//     dir = program.save;
//   } else {
//     dir = "./switchover";
//   };
//   dir += ".json"
//   fs.writeFile(dir, JSON.stringify(contents), function(err) {
//     if(err) {
//         return console.log(err);
//     };
//     console.log(chalk.green(dir + " was saved!"));
//   });
  // var transformStream = JSONStream.stringify();
  // var outputStream = fs.createWriteStream(dir);
  // transformStream.pipe(outputStream);
  // contents.forEach(transformStream.write);
  // transformStream.end();
  //
  // outputStream.on(
  //     "finish",
  //     function handleFinish() {
  //         console.log("Done");
  //     }
  // );
// };
