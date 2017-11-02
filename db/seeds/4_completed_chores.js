
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('completed_chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('completed_chores').insert([
        {chore_id: '1'},
        {chore_id: '2'}
      ]);
    });
};
