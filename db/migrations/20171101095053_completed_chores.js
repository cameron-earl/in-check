exports.up = (knex, Promise) => {
 return knex.schema.createTable('completed_chores', table => {
   table.increments();
   table.boolean('approved').defaultTo('false');
   table.boolean('distributed').defaultTo('false');
   table.integer('chore_id')
    .notNullable()
    .references('id')
    .inTable('chores')
    .onDelete('CASCADE')
    .index();
   table.timestamps(true, true);
 });
};

exports.down = (knex, Promise) => {
 return knex.schema.dropTable('completed_chores');
};
