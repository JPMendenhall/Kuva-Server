const photostrips = require('../seed_data/photo_trip_seed')

exports.seed = function(knex, Promise) {
  return knex('photo_trip').del()
    .then(function () {
      return knex('photo_trip').insert(photostrips);
    });
};
