
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('chores').insert([
        {title: 'Mow the Lawn', description: 'The front yard is looking rough.', start_date: 'Mon Nov 3 2017', end_date: 'Mon Nov 5 2017', recur_weekly: 'false', value: 6.00, child_id: 3},
        {title: 'Mop', description: 'The bathroom floors.', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 5 2017', recur_weekly: 'false', value: 3.00, child_id: 3},
        {title: 'Homework', description: 'Get it done!', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 5 2017', recur_weekly: 'false', value: 0, child_id: 3},
        {title: 'Feed Pet', description: 'Running low.', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 5 2017', recur_weekly: 'false', value: 0, child_id: 3},
        {title: 'Hang Clothes', description: 'Clothes are in Laundry basket.', start_date: 'Mon Nov 3 2017', end_date: 'Mon Nov 4 2017',recur_weekly: 'false', value: 2.00, child_id: 2},
        {title: 'Clean Bedroom', description: 'It is a mess.', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 5 2017',recur_weekly: 'false', value: 1.00, child_id: 2},
        {title: 'Homework', description: 'Study.', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 5 2017',recur_weekly: 'false', value: 0, child_id: 2},
        {title: 'Clean Windows', description: 'Front door has fingerprints.', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 6 2017',recur_weekly: 'false', value: 2.00, child_id: 2},
        {title: 'Wash Dishes', description: 'Do not wash the big pans. I will take care of that. ', start_date: 'Mon Nov 3 2017', end_date: 'Mon Nov 4 2017', recur_weekly: 'false', value: 2.00, child_id: 5},
        {title: 'Clean Mirrors', description: 'The bathroom mirrors have hand prints.', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 5 2017', recur_weekly: 'false', value: 2.00, child_id: 5},
        {title: 'Homework', description: 'Do not forget about your upcoming finals!', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 11 2017', recur_weekly: 'false', value: 0, child_id: 5},
        {title: 'Shower pet', description: 'The dog ran out lastnight and played in the mud!', start_date: 'Mon Nov 4 2017', end_date: 'Mon Nov 4 2017', recur_weekly: 'false', value: 3.00, child_id: 5},
        {title: 'Put Things in Place', description: 'Your toys are all over the place.', start_date: 'Mon Nov 3 2017' , end_date: 'Mon Nov 4 2017', recur_weekly: 'false', value: 1.00, child_id: 6},
        {title: 'Homework', description: 'Study for vocab test tomorrow!', start_date: 'Mon Nov 3 2017' , end_date: 'Mon Nov 3 2017', recur_weekly: 'false', value: 0, child_id: 6},
        {title: 'Organize Closet', description: 'Put your shoes back in their boxes.', start_date: 'Mon Nov 3 2017' , end_date: 'Mon Nov 7 2017', recur_weekly: 'false', value: 1.00, child_id: 6},
        {title: 'Take Trash Out', description: 'Both the kitchen and bathroom trashcan are full.', start_date: 'Mon Nov 3 2017' , end_date: 'Mon Nov 4 2017', recur_weekly: 'false', value: 1.00, child_id: 6},
      ]);
    });
};
