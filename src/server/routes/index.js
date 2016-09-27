const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const request = require('request');
const axios = require('axios');
const knex = require('../db/knex.js');
const request = require('request');

router.get('/', function (req, res, next) {
  res.redirect('landing');
});

router.get('/single-station/:id', function (req, res, next) {
  const id = req.params.id;
  const renderObject = {};
  var latitude;
  var longitude;

  Promise.all([reportUserQuery(), singleStation()])
  .then(payload => {
  getWeather(payload[1][0].lat, payload[1][0].lon)
  .then(weatherPayload => {
      renderObject.reports = payload[0];
      renderObject.station = payload[1][0];
      renderObject.weather = weatherPayload.data;
      res.render('single-station', renderObject);
  });
  }, reason => {
    console.log('error ', reason);
  });

  function reportUserQuery() {
    return knex('users')
    .join('reports', 'user_id', 'users.id')
    .where('station_id', id)
    .select();
  }

  function singleStation() {
    return knex('stations')
    .where('id', id)
    .select();
  }

  function getWeather(lat, lng) {
    return axios.get(`https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/${lat},${lng}`);
    }
});

router.get('/usgs', function (req, res, next) {
  const renderObject = {};
  request('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=07079300,07081200,07083710,07087050,07091200,07094500,07099970,07099973,07109500,07124000,07130500,07133000,07134180&parameterCd=00060', (err, res, body) => {
    if(!err && res.statusCode == 200) {
      const usgsPayload = JSON.parse(body);
      const parsedUSGS = usgsPayload.value.timeSeries;

      for (var i = 0; i < parsedUSGS.length; i++) {
        var stationData = {
          river: 'Arkansas River',
          site_name: parsedUSGS[i].sourceInfo.siteName,
          flow_rate: parsedUSGS[i].values[0].value[0].value,
          lat: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.latitude,
          lon: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.longitude,
          reading_date_time: parsedUSGS[i].values[0].value[0].dateTime
        }
        queries.updateRiverData(stationData, function (req, res, next) {
          if (err) {
            var returnObject = {};
            returnObject.message = err.message || 'Data not added';
            res.render('error', returnObject);
          } else {
            let returnObject = {};
            returnObject.message = 'Data succesfully added!';
            // res.redirect('/index');
          }
        });
      }
    }
  })

});


module.exports = router;
