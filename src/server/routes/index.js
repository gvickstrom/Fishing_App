const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const request = require('request');

router.get('/', function (req, res, next) {
  res.redirect('landing');
});

router.get('/single-river', function (req, res, next) {

  const renderObject = {};
  var latitude;
  var longitude;

  knex('users')
  .join('reports', 'user_id', 'users.id')
  .join('stations', 'station_id', 'stations.id')
  .where('station_id', 1)
  .select()
  .then((reports) => {
    renderObject.reports = reports;
    latitude = reports[0].lat;
    longitude = reports[0].lon;
    console.log(reports[0].lat,reports[0].lon);
    axios.get(`https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/${reports[0].lat},${reports[0].lon}`)
    .then(function (weatherPayload) {
      renderObject.weatherPayload = weatherPayload.data;
      res.render('single-river', renderObject);
    })
    .catch(function (error) {
      console.log(error);
    });
  })
});

// router.get('/arkansas', function (req, res, next) {
//   const renderObject = {};
//   request('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=07079300,07081200,07083710,07087050,07091200,07094500,07099970,07099973,07109500,07124000,07130500,07133000,07134180&parameterCd=00060', (err, res, body) => {
//     if(!err && res.statusCode == 200) {
//       const usgsPayload = JSON.parse(body);
//       const parsedUSGS = usgsPayload.value.timeSeries;
//
//       for (var i = 0; i < parsedUSGS.length; i++) {
//         var stationData = {
//           river: 'Arkansas River',
//           site_name: parsedUSGS[i].sourceInfo.siteName,
//           flow_rate: parsedUSGS[i].values[0].value[0].value,
//           lat: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.latitude,
//           lon: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.longitude,
//           reading_date_time: parsedUSGS[i].values[0].value[0].dateTime
//         }
//         queries.updateRiverData(stationData, function (req, res, next) {
//           if (err) {
//             var returnObject = {};
//             returnObject.message = err.message || 'Data not added';
//             res.render('error', returnObject);
//           } else {
//             let returnObject = {};
//             returnObject.message = 'Data succesfully added!';
//             res.redirect('/homepage');
//           }
//         });
//       }
//     }
//   })
//
// });

module.exports = router;
