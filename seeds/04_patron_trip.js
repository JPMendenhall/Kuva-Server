const patronstrips = require('../seed_data/patron_trip_seed')

exports.seed = function(knex, Promise) {
  return knex('patron_trip').del()
    .then(function () {
      return knex('patron_trip').insert(patronstrips);
    });
};
