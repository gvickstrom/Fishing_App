const knex = require('./knex');

//drop existing stations table and replace with empty stations table

exports.clearStationsTable = function(callback) {
  knex('stations').del()
  .then(results => {
    callback(null, results);
  })
  .catch(err => {
    callback(err);
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

exports.getDataFromTwoTables = function (tableOne, tableTwo, callback) {
  var response = {};
  knex(tableOne)
  .then(results => {
    response.first = results;
    knex(tableTwo)
    .then(data => {
      response.second = data;
      callback(null, response);
    })
  }).catch(err => {
    callback(err);
  });
};

exports.reportLatLon = function () {
  return knex('reports')
  .select('id', 'lat', 'lon');
};

exports.getStations = function () {
  return knex('stations')
}

// working reportsNear
// exports.reportsNear = function (reportIdArr) {
//   return knex.select().from('reports')
//   .whereIn('id', reportIdArr)
// };

exports.reportsNear = function (reportIdArr) {
  return knex
  .from('users')
  .join('reports', 'user_id', 'users.id')
  .select()
  .whereIn('reports.id', reportIdArr);
};


exports.distance = function (lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit === "K") { dist = dist * 1.609344; }
	if (unit === "N") { dist = dist * 0.8684 ;}
	return dist;
};

exports.singleStation = function (id) {
  return knex('stations')
  .where('id', id)
  .select();
};
