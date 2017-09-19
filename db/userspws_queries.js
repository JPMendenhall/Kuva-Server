//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('user_pw');
  },
  getOne(id) {
    return knex('user_pw').where('userpw_id', id).first();
  },
  create(user_pw) {
    return knex('user_pw').insert(user_pw, '*');
  },
  update(id, user_pwDetails) {
    return knex('user_pw').where('userpw_id', id).update(user_pwDetails, '*');
  },
  delete(id) {
    return knex('user_pw').where('userpw_id', id).del();
  }
}
