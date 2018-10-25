let dotenv = require('dotenv'),
  { program } = require('./src');

dotenv.config({path: `${__dirname}/.env`});
dotenv.load();

module.export = program.parse;
