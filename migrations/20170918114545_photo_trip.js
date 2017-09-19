
exports.up = function(knex, Promise) {
  return knex.schema.createTable('photo_trip', (table => {
    table.increments("phototrip_id").primary()
    table.integer("photo_id")
      .references("photo.photo_id")
      .onDelete("CASCADE")
    table.integer("trip_id")
      .references("trip.trip_id")
      .onDelete("CASCADE")
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photo_trip')
};
