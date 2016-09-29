
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rivers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('rivers').insert({
          river: 'Arkansas'
        }),
        knex('rivers').insert({
          river: 'Upper South Platte'
        }),
        knex('rivers').insert({
          river: 'Blue'
        })
      ]);
    });
};
