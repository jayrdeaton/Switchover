module.exports = (num, padding) => {
  num = num.toString();
  while (num.length < padding) {
    num = `0${num}`;
  };
  return num
};
