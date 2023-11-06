exports.up = knex => knex.schema.createTable('requests', table => {
  table.increments('id');
  table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
  table.integer('total_price').notNullable();
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable('requests');
