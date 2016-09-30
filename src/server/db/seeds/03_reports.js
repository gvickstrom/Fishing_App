var faker = require('faker');

exports.seed = function(knex, Promise) {
  let numberOfArrays = new Array(60);
  let arrayOfReports = Array.from(numberOfArrays).map(() => {
    return generateReports(knex);
  });
  return Promise.all(arrayOfReports);
};

function generateReports (knex) {
  return knex('reports')
  .insert({
    user_id: faker.random.number({
      'min': 1,
      'max': 10
    }),
    report: faker.lorem.paragraph(4),
    start_time: faker.date.past(1, "2015-01-01"),
    end_time: faker.date.past(1, "2016-01-01"),
    lat: faker.random.number({min:37, max:40}) + '.' + faker.random.number({min:2816, max:8076}),
    lon: '-' + faker.random.number({min:104, max:108}) + '.' + faker.random.number({min:1659, max:9963})
  });
}

// SE: 37.8076, -104.9963
// SW: 37.6990, -108.1659
// NW: 40.2816, -108.1934
// NE: 40.3256, -105.2161

// lat: faker.commerce.price(37.6990, 40.3256, 4, ""),
// lon: "-" + faker.commerce.price(104.9963, 108.1934, 4, "")
