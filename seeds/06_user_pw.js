const userpws = require('../seed_data/user_pw_seed')

exports.seed = function(knex, Promise) {
  return knex('user_pw').del()
    .then(function () {
      return knex('user_pw').insert(userpws);
    });
};
