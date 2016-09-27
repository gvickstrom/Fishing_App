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
  .select('site_name')
  .where('stations.river', riverName)
  .then(sites => {
    callback(null, sites);
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
