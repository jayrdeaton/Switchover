var { Tag } = require('@gameroom/gameroom-kit').models,
  tags = [];

module.exports = (names) => {
  let result = [];
  for (let name of names) {
    if (!tags.includes(name)) {
      let tag = new Tag({ name });
      result.push(tag);
      tags.push(name);
    };
  };
  return result;
};
