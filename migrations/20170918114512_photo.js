
exports.up = function(knex, Promise) {
  return knex.schema.createTable('photo', (table => {
    table.increments('photo_id').primary()
    table.bigInteger("user_id")
      .references("patron.user_id")
      .onDelete("CASCADE")
    table.text("photo_url")
    table.bigInteger("post_date")
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photo')
};
