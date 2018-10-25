let { command, option } = require('termkit'),
  { customers, games, movies, products } = require('../actions');

let program = command('switchover', '[dir]')
  .version(process.env.npm_package_version)
  .description('A switchover tool for Gameroom and CashierFu')
  // .options([
  // ])
  .action(async (options) => await deplace(options))
  .commands([
    command('customers')
      .description('Switchover swapzapp customers')
      .action(async (options) => await add(options)),
    command('games')
      .description('Extract games from swapzapp')
      .action(async (options) => await games(options)),
    command('products')
      .description('Extract products from swapzapp items (excludes games)')
      .action(async (options) => await products(options)),
    command('movies', '<file>')
      .description('Extract movies from mikes big list csv')
      .action(async (options) => await movies(options)),
    command('timecards')
      .description('Extract timecards and corrections from cashierfu-legacy')
      .action(async (options) => await movies(options))
  ]);

module.exports = program;
