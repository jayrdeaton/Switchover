let dotenv = require('dotenv').config({path: `${__dirname}/.env`}),
  { program } = require('./src');

// dotenv.config({path: `${__dirname}/.env`});
// dotenv.load();

module.export = program.parse;
