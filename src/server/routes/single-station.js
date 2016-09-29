const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const weather = require('./weather.js');

router.get('/', function (req, res, next) {
  res.redirect('landing');
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const renderObject = {};
  const reportArr = [];
  Promise.all([queries.reportLatLon(), queries.singleStation(id)])
  .then(payload => {
    // queries.distance(payload[1][0].lat, payload[1][0].lon, )
    for (var i = 0; i < payload[0].length; i++) {
      var distance = queries.distance(payload[1][0].lat, payload[1][0].lon, payload[0][i].lat, payload[0][i].lon);

      if (distance <= 5) {
        reportArr.push(payload[0][i]);
      }
    }
  // .then(weatherPayload => {
  //   console.log(weatherPayload);
  //     renderObject.reports = payload[0];
  //     renderObject.station = payload[1][0];
  //     renderObject.weather = weatherPayload.data;
  //     res.render('single-station', renderObject);
  // });
  // renderObject.reports = payload[0];
  return reportArr;

})
.then(reportArr => {
  // console.log('hello');
  let reportIdArr = [];
  reportArr.forEach(function(report){
    reportIdArr.push(report.id);
  });
  return queries.reportsNear(reportIdArr)
})
.then((reason) => {
    console.log('all the reports', reason);
  });
});

module.exports = router;
