
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stations', (table) => {
    table.increments();
    table.varchar('river');
    table.varchar('site_name');
    table.decimal('water_temp');
    table.decimal('flow_rate');
    table.decimal('depth');
    table.varchar('reading_date_time');
    table.varchar('lat');
    table.varchar('lon');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return
  knex.schema.dropTable('stations');
};
