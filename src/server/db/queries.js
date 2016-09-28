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
  .select()
  .then(results => {
    for (var i = 0; i < results.length-1; i++) {
      var lat1 = results[i].lat;
      var lon1 = results[i].lon;
      var lat2 = results[i+1].lat;
      var lon2 = results[i+1].lon;

      var distanceReviewStation = distance(lat1, lon1, lat2, lon2);

      if (distanceReviewStation <= 5) {
        return results
      }
    }
  });
};

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

exports.singleStation = function (id) {
  return knex('stations')
  .where('id', id)
  .select();
};
