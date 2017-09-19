//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('patron');
  },
  getOne(id) {
    return knex('patron').where('user_id', id).first();
  },
  create(patron) {
    return knex('patron').insert(patron, '*');
  },
  update(id, patronDetails) {
    return knex('patron').where('user_id', id).update(patronDetails, '*');
  },
  delete(id) {
    return knex('patron').where('user_id', id).del();
  }
}
