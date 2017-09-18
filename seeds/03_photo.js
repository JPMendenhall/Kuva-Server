const photos = require('../seed_data/photo_seed')

exports.seed = function(knex, Promise) {
  return knex('photo').del()
    .then(function () {
      return knex('photo').insert(photos);
    });
};
