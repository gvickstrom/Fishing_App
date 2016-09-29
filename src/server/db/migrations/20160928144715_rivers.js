exports.up = function(knex, Promise) {
  return knex.schema.createTable('rivers', (table) => {
    table.increments();
    table.string('river').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rivers');
};
