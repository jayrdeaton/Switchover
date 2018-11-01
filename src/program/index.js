let { command, option } = require('termkit'),
  { customers, example, games, movies, products, timecards, users } = require('../actions');

let program = command('switchover', '[dir]')
  .version(process.env.npm_package_version)
  .description('A switchover tool for Gameroom and CashierFu')
  // .options([
  // ])
  .action(async (options) => await deplace(options))
  .commands([
    command('customers')
      .description('Extract customers from swapzapp')
      .action(async (options) => await customers(options)),
    command('example')
      .description('Create an example import')
      .action(async (options) => await example(options)),
    command('games')
      .description('Extract games from swapzapp')
      .action(async (options) => await games(options)),
    command('movies', '<file>')
      .description('Extract movies from mikes big list csv')
      .action(async (options) => await movies(options)),
    command('products')
      .description('Extract products from swapzapp items (excludes games)')
      .action(async (options) => await products(options)),
    command('timecards', '<business_uuid>')
      .description('Extract timecards and corrections from cashierfu-legacy')
      .action(async (options) => await timecards(options)),
    command('users')
      .description('Extract users from swapzapp')
      .action(async (options) => await users(options))
  ]);

module.exports = program;
