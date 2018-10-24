let { Catalog } = require('@gameroom/gameroom-kit').models,
  colors = require('../../colors');

module.exports.create = () => {
  let catalogs = {};

  catalogs.blurays = new Catalog({name: 'Blu-rays', color: colors.grey, index: 0});
  catalogs.num = new Catalog({name: 'DVD #', color: colors.grey, index: 1});
  catalogs.a = new Catalog({name: 'DVD A', color: colors.grey, index: 2});
  catalogs.b = new Catalog({name: 'DVD B', color: colors.grey, index: 3});
  catalogs.c = new Catalog({name: 'DVD C', color: colors.grey, index: 4});
  catalogs.d = new Catalog({name: 'DVD D', color: colors.grey, index: 5});
  catalogs.e = new Catalog({name: 'DVD E', color: colors.grey, index: 6});
  catalogs.f = new Catalog({name: 'DVD F', color: colors.grey, index: 7});
  catalogs.g = new Catalog({name: 'DVD G', color: colors.grey, index: 8});
  catalogs.h = new Catalog({name: 'DVD H', color: colors.grey, index: 9});
  catalogs.i = new Catalog({name: 'DVD I', color: colors.grey, index: 10});
  catalogs.j = new Catalog({name: 'DVD J', color: colors.grey, index: 11});
  catalogs.k = new Catalog({name: 'DVD K', color: colors.grey, index: 12});
  catalogs.l = new Catalog({name: 'DVD L', color: colors.grey, index: 13});
  catalogs.m = new Catalog({name: 'DVD M', color: colors.grey, index: 14});
  catalogs.n = new Catalog({name: 'DVD N', color: colors.grey, index: 15});
  catalogs.o = new Catalog({name: 'DVD O', color: colors.grey, index: 16});
  catalogs.p = new Catalog({name: 'DVD P', color: colors.grey, index: 17});
  catalogs.q = new Catalog({name: 'DVD Q', color: colors.grey, index: 18});
  catalogs.r = new Catalog({name: 'DVD R', color: colors.grey, index: 19});
  catalogs.s = new Catalog({name: 'DVD S', color: colors.grey, index: 20});
  catalogs.t = new Catalog({name: 'DVD T', color: colors.grey, index: 21});
  catalogs.u = new Catalog({name: 'DVD U', color: colors.grey, index: 22});
  catalogs.v = new Catalog({name: 'DVD V', color: colors.grey, index: 23});
  catalogs.w = new Catalog({name: 'DVD W', color: colors.grey, index: 24});
  catalogs.x = new Catalog({name: 'DVD X', color: colors.grey, index: 25});
  catalogs.y = new Catalog({name: 'DVD Y', color: colors.grey, index: 26});
  catalogs.z = new Catalog({name: 'DVD Z', color: colors.grey, index: 27});
  catalogs.umds = new Catalog({name: 'UMDs', color: colors.grey, index: 28});

  return catalogs;
};
