//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('patron')
    .select('patron.user_id', 'patron.username', 'patron.password');
  },
  getOne(id) {
    return knex('patron')
    .select('patron.username', 'patron.password')
    .where('user_id', id).first();
  },
}
