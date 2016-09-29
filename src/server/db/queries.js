const knex = require('./knex');

//drop existing stations table and replace with empty stations table

exports.clearStationsTable = function(callback) {
  knex('stations').del()
  .then(results => {
    callback(null, results)
  })
  .catch(err => {
    callback(err)
  });
};

exports.getRivers = function(callback) {
  knex('rivers')
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
