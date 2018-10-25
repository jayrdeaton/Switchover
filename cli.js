#!/usr/bin/env node
let dotenv = require('dotenv'),
  { program, helpers } = require('./src'),
  { printError } = helpers;

dotenv.config({path: `${__dirname}/.env`});
dotenv.load();

let run = async(args) => {
  if (args.length === 2) args.push('help');
  try {
    await program.parse(args);
  } catch(err) {
    printError(err);
  };
};

run(process.argv);
