exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id');
  table.text('name');
  table.text('description');

  table.string('picture').nullable();
  
  table.integer('price');
  table.text('category');

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable('dishes');
