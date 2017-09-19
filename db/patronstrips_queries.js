//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('patron_trip');
  },
  getOne(id) {
    return knex('patron_trip').where('usertrip_id', id).first();
  },
  create(patrontrip) {
    return knex('patron_trip').insert(patrontrip, '*');
  },
  update(id, patrontripDetails) {
    return knex('patron_trip').where('usertrip_id', id).update(patrontripDetails, '*');
  },
  delete(id) {
    return knex('patron_trip').where('usertrip_id', id).del();
  }
}
