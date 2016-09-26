var faker = require('faker');

exports.seed = function(knex, Promise) {
  let numberOfArrays = new Array(10);
  let arrayOfReports = Array.from(numberOfArrays).map(() => {
    return generateReports(knex);
  });
  return Promise.all(arrayOfReports);
};

function generateReports (knex) {
  return knex('reports')
  .insert({
    station_id: faker.random.number({
      min: 1,
      max: 10
    }),
    user_id: faker.random.number({
      min: 1,
      max: 10
    }),
    report: faker.lorem.paragraph(4),
    start_time: faker.date.past(1, '2015-01-01'),
    end_time: faker.date.past(1, '2016-01-01')
  });
}
