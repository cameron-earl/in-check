
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'nicolesmith', password: 'smithfamily', first_name: '', is_parent: true, image_url:'', family_id: 1},
        {username: 'maggiesmith', password: 'smithfamily', first_name: 'Maggie', is_parent: false, image_url: 'https://herviewfromhome.com/wp-content/uploads/2017/08/janko-ferlic-303881-810x608.jpg', family_id: 1},
        {username: 'ryansmith', password: 'smithfamily', first_name: 'Ryan', is_parent: false, image_url: 'https://thereviewmonk.com/assets/posters/person/e/emjay-anthony_26014.jpg', family_id: 1},
        {username: 'alexmills', password: 'alexfamily', first_name: '', is_parent: true, image_url:'', family_id: 2},
        {username: 'allisonmills', password: 'alexfamily', first_name: 'Allison', is_parent: false, image_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ4MTk0MjI1NF5BMl5BanBnXkFtZTgwMjM2MjQ0ODE@._V1_UY1200_CR85,0,630,1200_AL_.jpg', family_id: 2},
        {username: 'jakemills', password: 'alexfamily', first_name: 'Jake', is_parent: false, image_url: 'http://www.copmi.net.au/images/Kids-Teens/teen-boy.jpg', family_id: 2}
      ]);
    });
};
