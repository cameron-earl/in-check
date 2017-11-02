
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('chores').insert([
        {title: 'Mow the Lawn', description: 'The front yard is looking rough.', start_date: 'Mon Nov 3 2017', end_date: 'Mon Nov 5 2017', recur_weekly: 'false', value: 6.00, child_id: 1},
        {title: 'Hang Clothes', description: 'Clothes are in Laundry basket.', start_date: 'Mon Nov 3 2017', end_date: 'Mon Nov 4 2017',recur_weekly: 'false', value: 2.00, child_id: 1},
        {title: 'Wash Dishes', description: 'Do not wash the big pans. I will take care of that. ', start_date: 'Mon Nov 3 2017', end_date: 'Mon Nov 4 2017', recur_weekly: 'false', value: 2.00, child_id: 2},
        {title: 'Put Things in Place', description: 'Your toys are all over the place.', start_date: 'Mon Nov 3 2017' , end_date: 'Mon Nov 4 2017', recur_weekly: 'false', value: 2.00, child_id: 2},
      ]);
    });
};
