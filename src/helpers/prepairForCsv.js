const getDatabaseTimestamp = require('./getDatabaseTimestamp');

module.exports = (tables) => {
  for (const table of Object.keys(tables)) {
    for (const object of tables[table]) {
      // base
      object.id = object.uuid;
      delete object.uuid;
      object.created_at = getDatabaseTimestamp(object.created_at);
      object.updated_at = getDatabaseTimestamp(object.updated_at);
      // other dates
      if (object.started_at) object.started_at = getDatabaseTimestamp(object.started_at);
      if (object.ended_at) object.ended_at = getDatabaseTimestamp(object.ended_at);
      if (object.started_correction) object.started_correction = getDatabaseTimestamp(object.started_correction);
      if (object.ended_correction) object.ended_correction = getDatabaseTimestamp(object.ended_correction);
      // relations
      if (Object.keys(object).includes('customer')) {
        object.customer_id = object.customer;
        delete object.customer;
      };
      if (Object.keys(object).includes('gift_certificate')) {
        object.gift_certificate_id = object.gift_certificate;
        delete object.gift_certificate;
      };
    };
  };
};
