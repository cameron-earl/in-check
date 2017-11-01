exports.up = (knex, Promise) => {
 return knex.schema.createTable('users', table => {
   table.increments();
   table.string('username').notNullable().unique();
   table.string('password').notNullable();
   table.string('first_name').notNullable();
   table.boolean('is_parent').notNullable().defaultTo(false);
   table.string('image_url');
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
 return knex.schema.dropTable('users');
};
