let { existsSync, mkdirSync, unlinkSync, writeFileSync } = require('fs'),
  { join, resolve } = require('path');

module.exports = (fileName, data) => {
  let dir = resolve('./switchover');
  if (!existsSync(dir)) mkdirSync(dir);
  dir = join(dir, `${fileName}.json`);
  writeFileSync(dir, JSON.stringify(data));
};
