const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const weather = require('./weather.js');

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const renderObject = {};
  const reportArr = [];
  Promise.all([queries.reportLatLon(), queries.singleStation(id)])
  .then(payload => {
    // console.log(payload);
    // queries.distance(payload[1][0].lat, payload[1][0].lon, )
    console.log('payload: ', payload[0]);
    for (var i = 0; i < payload[0].length; i++) {
      var distance = queries.distance(payload[1][0].lat, payload[1][0].lon, payload[0][i].lat, payload[0][i].lon);

      if (distance >= 0) {
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
  // console.log('reportArr: ', reportArr);
  return [reportArr, payload];

})
.then(reportArr => {
  // console.log('reportArr: ', reportArr);
  // console.log('0 ', reportArr[0], '1 ', reportArr[1])
  // console.log('1.1 ', reportArr[1][1]);
  // console.log('reportArr @ 2nd .then: ', reportArr[0]);
  // console.log('payLoad: ', reportArr[1]);
  let reportIdArr = [];
  reportArr[0].forEach(function(report){
    reportIdArr.push(report.id);
  });

  // var results = queries.reportsNear(reportIdArr);
  // console.log('results: ', results);

  queries.reportsNear(reportIdArr)
  .then(result => {
    // console.log(result);
    // console.log('single_station: ', reportArr);
    // console.log('payload',reportArr[1]);
    // console.log('result', result[0]);
    // weather.getWeather(result[0].lat)
    weather.getWeather(result[0].lat, result[0].lon)
    .then(weather => {
      renderObject.weather = weather.data;
      renderObject.station = reportArr[1][1][0];
      renderObject.reports = result;
      console.log(result);
      res.render('single-station', renderObject);
    });
  });
});
});

module.exports = router;
