var typos = require('./typos');

let removeFromName = (object) => {
  let start = object.name.lastIndexOf('(');
  let end = object.name.lastIndexOf(')');
  let a = [];
  let b = [];
  for (var c = 0; c < object.name.length; c++) {
    if (object.name[c] === "(") a.push(c);
    if (object.name[c] === ")") b.push(c);
  }
  // if (a.length > 1 && string.indexOf(' / ') == -1) console.log(a, b, string)
  if (start >= 0 && end >= 0) {
    object.options = object.name.substring(start, end + 1);
    let replace = ' ' + object.options;
    object.name = object.name.replace(replace, '');
  };
  return object;
};
let separate = (object) => {
  object = splitOptions(object);
  object = typos.options(object);
  object = removeType(object);
  object = removeDiscs(object);
  object = removeKey(object, 'collection');
  object = removeKey(object, 'edition');
  object = removeKey(object, 'anniversary');
  object = removeKey(object, 'version');
  object = removeKey(object, 'release');
  object = removeKey(object, 'exclusive');
  object = removeKey(object, 'movie money');
  object = removeKey(object, 'movie cash');
  object = removeKey(object, 'tin');

  object = removeKey(object, 'cut');

  object = removeScreenFormat(object);
  object = removeStudio(object);
  object = removeSteelbook(object);

  return(object);
};
splitOptions = (object) => {
  let array = object.options.split('/ ');
  var optionsArray = [];
  var options = '';
  var substringIndex;
  if (array.length > 1) {
    array.forEach((option, index) => {
      if (index === 0) {
        option += ')';
      } else if (index === array.length - 1) {
        option = '(' + option;
      } else {
        option = '(' + option + ')';
      };
      if (option.includes(' )')) option = option.replace(' )', ')');
      optionsArray.push(option);
    });
    optionsArray.forEach((option, index) => {
      if (index === optionsArray.length - 1) {
        options += option;
      } else {
        options += option + ' ';
      }
    });
  } else {
    options = object.options;
  }
  object.options = options
  return object;
};
var removeType = (object) => {
  object.type = [];
  if (object.options.toLowerCase().includes('(blu-ray 3d)')) {
    object.options = removeSubstring(object.options, '(blu-ray 3d)');
    object.type.push('Blu-ray 3D');
  }
  if (object.options.toLowerCase().includes('(blu-ray)')) {
    object.options = removeSubstring(object.options, '(blu-ray)');
    object.type.push('Blu-ray');
  };
  if (object.options.toLowerCase().includes('(umd)')) {
    object.options = removeSubstring(object.options, '(umd)');
    object.type.push('UMD');
  };
  if (object.options.toLowerCase().includes('(dvd)')) {
    object.options = removeSubstring(object.options, '(dvd)');
    object.type.push('DVD');
  };
  if (object.options.toLowerCase().includes('(cd)')) {
    object.options = removeSubstring(object.options, '(cd)');
    object.type.push('CD');
  };
  if (object.type.length == 0) object.type.push('DVD');
  if (object.options.toLowerCase().includes('(digital copy)')) {
    object.options = removeSubstring(object.options, '(digital copy)');
    object.type.push('Digital Copy');
  };
  if (object.options.toLowerCase().includes('(book)')) {
    object.options = removeSubstring(object.options, '(book)');
    object.type.push('Book');
  };
  if (object.options.toLowerCase().includes('(4k)')) {
    object.options = removeSubstring(object.options, '(4k)');
    object.type.push('4k')
  };
  if (object.options.toLowerCase().includes('(booklet)')) {
    object.options = removeSubstring(object.options, '(booklet)');
    object.type.push('Booklet')
  };
  return object;
};
var removeDiscs = (object) => {
  if (object.options.toLowerCase().includes('-disc)')) {
    var end = object.options.toLowerCase().indexOf('-disc');
    var start = end - 1;
    while(object.options.toLowerCase().substring(start, start + 1) !== '(') {
      start--;
    };
    object.discs = object.options.substring(start + 1, end);
    let substring = '(' + object.discs + '-disc)';
    object.options = removeSubstring(object.options, substring);
  };
  return object;
};
var removeKey = (object, string) => {
  key = camelCase(string);
  if (key.includes("'")) key = key.replace("'", '');
  object[key] = getFromSubstring(object.options, string);
  if (object[key]) object.options = removeSubstring(object.options, '(' + object[key] + ')');
  return object;
}
var camelCase = (string) => {
  while(string.includes(' ')) {
    let i = string.indexOf(' ');
    let replacement = string.charAt(i + 1).toUpperCase();
    string = string.replace(' ', '');
    string = string.substring(0, i) + replacement + string.substring(i + 1, string.length);
  };
  return string;
};
var removeScreenFormat = (object) => {
  if (object.options.toLowerCase().includes('widescreen')) {
    object.format = 'Widescreen';
    object.options = removeSubstring(object.options, '(widescreen)');
  };
  return object;
};
var removeStudio = (object) => {
  if (object.options.toLowerCase().includes(object.studio.toLowerCase())) {
    object.options = removeSubstring(object.options, '(' + object.studio + ')');
  };
  return object;
};
var removeSteelbook = (object) => {
  if (object.options.toLowerCase().includes('steelbook')) {
    object.options = removeSubstring(object.options, '(steelbook)');
    object.steelbook = true;
  };
  return object;
};
var removeTin = (object) => {
  object.tin = getFromSubstring(object.options, 'Tin');
  if (object.tin) object.options = removeSubstring(object.options, '(' + object.tin + ')');
};

var getFromSubstring = (string, substring) => {
  var option = '';
  if (string.toLowerCase().includes(substring.toLowerCase())) {
    var start = string.toLowerCase().indexOf(substring.toLowerCase());
    var end = string.toLowerCase().indexOf(substring.toLowerCase()) + substring.length;
    while(string.toLowerCase().substring(start, start + 1) !== '(') {
      start--;
    };
    start++;
    while(string.toLowerCase().substring(end, end + 1) !== ')') {
      end++;
    };
    option = string.substring(start, end);
  };
  return option;
};
var removeSubstring = (string, substring) => {
  var start = string.toLowerCase().indexOf(substring.toLowerCase());
  if (start >= 0) {
    var end = start + substring.length;
    if (string.substring(start, start - 1) === ' ') {
      start--;
    } else if (string.substring(end, end + 1) === ' ') {
      end++;
    };
    string = string.substring(0, start) + string.substring(end, string.length);
  } else {
    console.log('error', string, substring)
  }
  return string;
};

module.exports = { separate, removeFromName };
