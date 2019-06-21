module.exports = (object, product) => {
  properties = {};

  // properties.original_title = object.dvd_title;
  // properties.type = object.type;

  properties.studio = object.studio;
  // properties.status = object.status;
  properties.sound = object.sound;
  properties.versions = object.versions;
  // properties.price = object.price;
  properties.rating = object.rating;
  properties.year = object.year;
  properties.genre = object.genre;
  properties.aspect = object.aspect;
  properties.release_date = object.dvd_releasedate;
  // properties.id = object.id;

  if (object.discs > 1) properties.discs = object.discs;
  if (object.format) properties.format = object.format;

  let version;
  if (object.collection) version = object.collection
  if (object.cut) if (version) { version += ` ${object.cut}` } else { version = object.cut };
  if (object.edition) if (version) { version += ` ${object.edition}` } else { version = object.edition };
  if (object.release) if (version) { version += ` ${object.release}` } else { version = object.release };
  if (object.exclusive) if (version) { version += ` ${object.exclusive}` } else { version = object.exclusive };
  if (object.anniversary) if (version) { version += ` ${object.anniversary}` } else { version = object.anniversary };
  if (object.version) if (version) { version += ` ${object.version}` } else { version = object.version };
  if (object.steelbook) if (version) { version += ' Steelbook' } else { version = 'Steelbook' };
  if (object.tin) if (version) { version += ` ${object.tin}` } else { version = object.tin };
  if (version) properties.version = version;

  let money;
  if (object.movieMoney) money = object.movieMoney;
  if (object.movieCash) if (money) { money += ` ${object.movieCash}` } else { money = object.movieCash };
  if (money) object.movie_money = money;

  if (object.options) properties.misc = object.options;

  return properties;
};
