
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patron_trip', (table => {
    table.increments("usertrip_id").primary()
    table.integer("user_id")
      .references("patron.user_id")
      .onDelete("CASCADE")
    table.integer("trip_id")
      .references("trip.trip_id")
      .onDelete("CASCADE")
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patron_trip')
};
