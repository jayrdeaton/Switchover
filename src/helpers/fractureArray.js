module.exports = (array, limit) => {
  let arrays = [];
  let fracture = [];
  let done;
  let start = 0;
  let end = limit;
  while (!done) {
    if (array.length > end) {
      arrays.push(array.slice(start, end));
      start = end;
      end = end + limit;
    } else {
      done = true;
      arrays.push(array.slice(start));
    };
  };
  return arrays;
};
