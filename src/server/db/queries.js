const knex = require('./knex');

exports.getRivers = function(callback) {
  knex('stations')
  .distinct('river')
  .then(rivers => {
    callback(null, rivers);
  })
  .catch(err => {
    callback(err);
  });
};

exports.getRiverSites = function(riverName, callback) {
  knex('stations')
  .select('id', 'site_name')
  .where('stations.river', riverName)
  .then(results => {
    callback(null, results);
  })
  .catch(err => {
    callback(err);
  });
};

exports.updateRiverData = function(object, callback) {
  knex('stations')
  .insert(object)
  .then(function () {
    callback(null, object.name);
  })
  .catch(err => {
    callback(err);
  });
};

exports.reportUserQuery = function (id) {
  return knex('users')
  .join('reports', 'user_id', 'users.id')
  .where('station_id', id)
  .select();
};

exports.singleStation = function (id) {
  return knex('stations')
  .where('id', id)
  .select();
};
