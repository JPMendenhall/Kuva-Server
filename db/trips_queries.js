//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('trip');
  },
  getOne(id) {
    return knex('trip').where('trip_id', id).first();
  },
  create(trip) {
    return knex('trip').insert(trip, '*');
  },
  update(id, tripDetails) {
    return knex('trip').where('trip_id', id).update(tripDetails, '*');
  },
  delete(id) {
    return knex('trip').where('trip_id', id).del();
  }
}
