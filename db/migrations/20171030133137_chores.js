exports.up = (knex, Promise) => {
 return knex.schema.createTable('chores', table => {
   table.increments();
   table.string('title').notNullable();
   table.date('start_date').notNullable().defaultTo(knex.fn.now());
   table.date('end_date').notNullable();
   table.boolean('recur_weekly').notNullable().defaultTo("false");
   table.decimal('value').notNullable().defaultTo("0");
   table.integer('child_id')
    .notNullable()
    .references('id')
    .inTable('children')
    .onDelete('CASCADE')
    .index();
   table.timestamps(true, true);
 });
};

exports.down = (knex, Promise) => {
 return knex.schema.dropTable('chores');
};
