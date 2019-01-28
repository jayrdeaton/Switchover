module.exports = class Transition {
  constructor(c) {
    this.created_at = c['created_at'].getTime() / 1000;
    this.updated_at = c['updated_at'].getTime() / 1000;
    let identifier = null;
    if (c['_id']) identifier = c['_id'];
    this.identifier = identifier;
    let info = null;
    let phone = null;
    if (c.phones && c.phones[0]) {
      if (c.phones[0].number !== '555-555-5555' && c.phones[0].number !== 'New Phone') {
        phone = c.phones[0].number;
      };
      if (c.phones.length > 1) {
        if (info) {
          info = info + " other phone: " + c.phones[1].name + " " + c.phones[1].number;
        } else {
          info = "Other phone: " + c.phones[1].name + " " + c.phones[1].number;
        }
      };
    };
    if (c['date_of_birth']) {
      let bday = new Date(c['date_of_birth']);
      this.date_of_birth = bday.getTime() / 1000;
    };
    if (c.notes) {
      if (info) {
        info = info + " " + c.notes;
      } else {
        info = c.notes;
      };
    };
    if (info) this.info = info;
    this.index = 0;
    this.first_name = c['first_name'];
    this.last_name = c['last_name'];
  };
};
