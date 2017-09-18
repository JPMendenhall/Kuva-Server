const patrons = require('../seed_data/patron_seed')

exports.seed = function(knex, Promise) {
  return knex('patron').del()
    .then(function () {
      return knex('patron').insert(patrons);
    });
};
