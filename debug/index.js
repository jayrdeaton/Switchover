let models = require('../models'),
  Catalog = models.catalog,
  Wrapper = models.wrapper

module.exports = () => {
  let catalog = new Catalog({ name: 'Base', index: 0 });
  let result = [ new Wrapper({ type: 'Catalog', object: catalog}) ];
  for (let i = 0; i <= 10000; i++) {
    let newCatalog = new Catalog({ name: `Catalog ${i}`, index: i, catalog: catalog.uuid });
    result.push(new Wrapper({ type: 'Catalog', object: newCatalog }));
  };
  return result;
};
