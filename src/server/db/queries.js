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

exports.grabCoordinates = function(callback) {
  knex('stations')
  .select('lat', 'lon')
  .then(coordinates => {
    callback(null, coordinates)
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

exports.singleItem = function (table, id) {
  return knex(table)
  .where('id', id)
  .select();
};

exports.updateReport = function (id, updatedReport) {
  console.log('updated report from queries: ', updatedReport);
  console.log('id from queries: ', id);
  return knex('reports')

  .update({
    start_time: updatedReport.start_time,
    end_time: updatedReport.end_time,
    report: updatedReport.report,
    lat: updatedReport.lat,
    lon: updatedReport.lon
  })
  .where('id', id)
  .returning('*')
}
