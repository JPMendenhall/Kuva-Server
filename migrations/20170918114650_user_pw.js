
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_pw', (table => {
    table.integer("user_id")
      .references("patron.user_id")
      .onDelete("CASCADE")
    table.text("password")
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_pw')
};
