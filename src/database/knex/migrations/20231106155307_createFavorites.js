exports.up = knex => knex.schema.createTable('favorites', table => {
  table.increments('id');
  table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
  table.text('dish_name').notNullable();
  table.string('dish_picture').nullable();
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

});

exports.down = knex => knex.schema.dropTable('favorites');
