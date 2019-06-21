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

      if (object.tags) object.tags = `"{${object.tags.join()}}"`;
      if (object.properties) {
        let properties = '';
        const keys = Object.keys(object.properties);
        for (const [index, key] of keys.entries()) {
          properties += `""${key}""=>""${object.properties[key]}""`;
          if (index !== keys.length - 1) properties += ', ';
        };
        object.properties = `"${properties}"`;
      };
      if (object.name) object.name = `"${object.name}"`;
      if (object.subname) object.subname = `"${object.subname}"`;
    };
  };
};
