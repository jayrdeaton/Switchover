let Emporium = require('emporium'),
  { memoryAdapter } = require('../adapters');

let emporium = new Emporium();

emporium.setAdapter(memoryAdapter);
emporium.setIdentifier('uuid');

module.exports = emporium;
