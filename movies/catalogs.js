let Catalog = require('../models').catalog,
  colors = require('../colors');

module.exports.create = () => {
  let catalogs = {};
  catalogs.movies = new Catalog({name: 'Movies', color: colors.grey, index: 0});
  catalogs.dvds = new Catalog({name: 'DVDs', color: colors.grey, catalog: catalogs.movies.uuid, index: 0});
  catalogs.blurays = new Catalog({name: 'Blu-rays', color: colors.grey, catalog: catalogs.movies.uuid, index: 1});
  catalogs.umds = new Catalog({name: 'UMDs', color: colors.grey, catalog: catalogs.movies.uuid, index: 2});
  catalogs.num = new Catalog({name: '#', color: colors.grey, catalog: catalogs.dvds.uuid, index: 0});
  catalogs.a = new Catalog({name: 'A', color: colors.grey, catalog: catalogs.dvds.uuid, index: 1});
  catalogs.b = new Catalog({name: 'B', color: colors.grey, catalog: catalogs.dvds.uuid, index: 2});
  catalogs.c = new Catalog({name: 'C', color: colors.grey, catalog: catalogs.dvds.uuid, index: 3});
  catalogs.d = new Catalog({name: 'D', color: colors.grey, catalog: catalogs.dvds.uuid, index: 4});
  catalogs.e = new Catalog({name: 'E', color: colors.grey, catalog: catalogs.dvds.uuid, index: 5});
  catalogs.f = new Catalog({name: 'F', color: colors.grey, catalog: catalogs.dvds.uuid, index: 6});
  catalogs.g = new Catalog({name: 'G', color: colors.grey, catalog: catalogs.dvds.uuid, index: 7});
  catalogs.h = new Catalog({name: 'H', color: colors.grey, catalog: catalogs.dvds.uuid, index: 8});
  catalogs.i = new Catalog({name: 'I', color: colors.grey, catalog: catalogs.dvds.uuid, index: 9});
  catalogs.j = new Catalog({name: 'J', color: colors.grey, catalog: catalogs.dvds.uuid, index: 10});
  catalogs.k = new Catalog({name: 'K', color: colors.grey, catalog: catalogs.dvds.uuid, index: 11});
  catalogs.l = new Catalog({name: 'L', color: colors.grey, catalog: catalogs.dvds.uuid, index: 12});
  catalogs.m = new Catalog({name: 'M', color: colors.grey, catalog: catalogs.dvds.uuid, index: 13});
  catalogs.n = new Catalog({name: 'N', color: colors.grey, catalog: catalogs.dvds.uuid, index: 14});
  catalogs.o = new Catalog({name: 'O', color: colors.grey, catalog: catalogs.dvds.uuid, index: 15});
  catalogs.p = new Catalog({name: 'P', color: colors.grey, catalog: catalogs.dvds.uuid, index: 16});
  catalogs.q = new Catalog({name: 'Q', color: colors.grey, catalog: catalogs.dvds.uuid, index: 17});
  catalogs.r = new Catalog({name: 'R', color: colors.grey, catalog: catalogs.dvds.uuid, index: 18});
  catalogs.s = new Catalog({name: 'S', color: colors.grey, catalog: catalogs.dvds.uuid, index: 19});
  catalogs.t = new Catalog({name: 'T', color: colors.grey, catalog: catalogs.dvds.uuid, index: 20});
  catalogs.u = new Catalog({name: 'U', color: colors.grey, catalog: catalogs.dvds.uuid, index: 21});
  catalogs.v = new Catalog({name: 'V', color: colors.grey, catalog: catalogs.dvds.uuid, index: 22});
  catalogs.w = new Catalog({name: 'W', color: colors.grey, catalog: catalogs.dvds.uuid, index: 23});
  catalogs.x = new Catalog({name: 'X', color: colors.grey, catalog: catalogs.dvds.uuid, index: 24});
  catalogs.y = new Catalog({name: 'Y', color: colors.grey, catalog: catalogs.dvds.uuid, index: 25});
  catalogs.z = new Catalog({name: 'Z', color: colors.grey, catalog: catalogs.dvds.uuid, index: 26});
  return catalogs;
};
