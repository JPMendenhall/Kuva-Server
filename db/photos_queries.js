//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('photo');
  },
  getOne(id) {
    return knex('photo').where('photo_id', id).first();
  },
  create(photo) {
    return knex('photo').insert(photo, '*');
  },
  update(id, photoDetails) {
    return knex('photo').where('photo_id', id).update(photoDetails, '*');
  },
  delete(id) {
    return knex('photo').where('photo_id', id).del();
  }
}
