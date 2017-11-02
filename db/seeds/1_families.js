
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('families').del()
    .then(function () {
      // Inserts seed entries
      return knex('families').insert([
        {name: 'Smith'},
        {name: 'Mills'}
      ]);
    });
};
