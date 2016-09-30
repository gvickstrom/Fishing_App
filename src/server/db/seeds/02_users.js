var faker = require('faker');

exports.seed = function(knex, Promise) {
  let numberOfArrays = new Array(10);
  let arrayOfUsers = Array.from(numberOfArrays).map(() => {
    return generateUsers(knex);
  });
  return Promise.all(arrayOfUsers);
};

function generateUsers (knex) {
  return knex('users')
  .insert({
    username: faker.internet.userName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  });
}
