const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const weather = require('./weather.js');

var globalPayload;
var fishingReportArr;
var test;
var reportsExport;

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const { renderObject } = req;
  const reportArr = [];
  Promise.all([queries.reportLatLon(), queries.singleItem('stations', id)])
  .then(payload => {
    for (var i = 0; i < payload[0].length; i++) {
      var distance = queries.distance(payload[1][0].lat, payload[1][0].lon, payload[0][i].lat, payload[0][i].lon);

      if (distance <=50) {
        reportArr.push(payload[0][i]);
      }
    }
    return [reportArr, payload];
  })
  .then(reportArr => {
    globalPayload = reportArr[1];
    const reportIdArr = reportArr[0].map(function(report) {
      return report.id;
    });
    test = reportIdArr;
  })
  .then(() => {
    return queries.reportsNear(test);
  })
  .then(result => {
    fishingReportArr = result;
    return weather.getWeather(globalPayload[1][0].lat, globalPayload[1][0].lon);
  })
  .then(weather => {
    renderObject.weather = weather.data;
    renderObject.station = globalPayload[1][0];
    renderObject.reports = fishingReportArr;
    renderObject.reportsExport = JSON.stringify(fishingReportArr);
    res.render('single-station', renderObject);
  })
  .catch((err) => {
    console.log(err);
  });
});


module.exports = router;
