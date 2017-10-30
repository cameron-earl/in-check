exports.up = (knex, Promise) => {
 return knex.schema.createTable('parents', table => {
   table.increments();
   table.string('username').notNullable().unique();
   table.string('password').notNullable();
   table.integer('family_id')
    .notNullable()
    .references('id')
    .inTable('families')
    .onDelete('CASCADE')
    .index();
   table.timestamps(true, true);
 });
};

exports.down = (knex, Promise) => {
 return knex.schema.dropTable('parents');
};
