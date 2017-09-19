//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('photo_trip');
  },
  getOne(id) {
    return knex('photo_trip').where('phototrip_id', id).first();
  },
  create(photo) {
    return knex('photo_trip').insert(photo, '*');
  },
  update(id, phototripDetails) {
    return knex('photo_trip').where('phototrip_id', id).update(phototripDetails, '*');
  },
  delete(id) {
    return knex('photo_trip').where('phototrip_id', id).del();
  }
}
