const environment = process.env.NODE_ENV || 'developement';
const config = require('../../../knexfile.js')[environment];
module.exports = require('knex')(config);
