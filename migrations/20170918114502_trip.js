
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip', (table => {
    table.increments('trip_id').primary()
    table.text("name")
    table.bigInteger("start_date")
    table.bigInteger("end_date")
    }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trip')
};
