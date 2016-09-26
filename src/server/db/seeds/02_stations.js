var faker = require('faker');

exports.seed = function(knex, Promise) {
  let numberOfArrays = new Array(10);
  let arrayOfStations = Array.from(numberOfArrays).map(() => {
    return generateStations(knex);
  });
  return Promise.all(arrayOfStations);
};

function generateStations (knex) {
  return knex('stations')
  .insert({
    river: 'Arkansas River',
    site_name: faker.company.companyName(),
    water_temp: faker.random.number({
      min: 1,
      max: 20
    }),
    flow_rate: faker.random.number({
      min: 60,
      max: 200
    }),
    depth: faker.random.number({
      min: 1,
      max: 20
    }),
    reading_date_time: faker.date.past(1),
    lat: faker.address.latitude(),
    lon: faker.address.longitude()
  });
}
