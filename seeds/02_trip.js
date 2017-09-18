const trips = require('../seed_data/trip_seed')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trip').del()
    .then(function () {
      // Inserts seed entries
      return knex('trip').insert(trips);;
    });
};
