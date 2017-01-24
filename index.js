#!/usr/bin/env node
var program = require('commander');
var customers = require('./customers');
var inventories = require('./inventories');

program
  // .arguments('[location]')
  // .option('-u, --username <username>', 'The user to authenticate as')
  // .option('-p, --password <password>', 'The user\'s password')
  .option('-c, --customers', 'Switchover swapzapp customers')
  .option('-i, --inventories', 'Switchover swapzapp inventories')
  .option('-s, --save', 'Save to files')
  .option('-f, --folder <folder>', "Specify folder to save files in")
 //  .action(function(collections) {
 //      // console.log(program);
 //      if (program.inventories) {
 //        console.log('inventories')
 //      }
 //    //  if (collection) {
 //    //    console.log(collection);
 //    //  } else {
 //    //    console.log("no file");
 //    //  }
 //    //  if (otherCollections) {
 //    //    otherCollections.forEach(function (oCol) {
 //    //      console.log(oCol)
 //    //     });
 //    //  }
 // })
 .parse(process.argv);
// if (program.location) {
//   console.log('true')
//   console.log(program.location)
// };
if (program.customers) {
  customers.switchover(program.save, program.folder);
};
if (program.inventories) {
  inventories.switchover(program.save, program.folder);
};
// if (program.save) {
//   console.log('save')
// }
//  console.log('you ordered a pizza with:');
// console.log('  - %s save', program.save);
