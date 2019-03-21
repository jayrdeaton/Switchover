const pad = require('./pad');

module.exports = (seconds) => {
  const date = seconds ? new Date(seconds * 1000) : new Date;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)} ${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.${date.getMilliseconds()}`;
};
