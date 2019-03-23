const getDatabaseTimestamp = require('./getDatabaseTimestamp');

module.exports = (tables) => {
  for (const table of Object.keys(tables)) {
    for (const object of tables[table]) {
      object.created_at = getDatabaseTimestamp(object.created_at);
      object.updated_at = getDatabaseTimestamp(object.updated_at);

      if (object.started_at) object.started_at = getDatabaseTimestamp(object.started_at);
      if (object.ended_at) object.ended_at = getDatabaseTimestamp(object.ended_at);
      if (object.started_correction) object.started_correction = getDatabaseTimestamp(object.started_correction);
      if (object.ended_correction) object.ended_correction = getDatabaseTimestamp(object.ended_correction);
    };
  };
};
