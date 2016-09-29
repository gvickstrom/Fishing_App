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
    for (var i = 0; i < payload[0].length; i++) {
      var distance = queries.distance(payload[1][0].lat, payload[1][0].lon, payload[0][i].lat, payload[0][i].lon);

      if (distance >= 0) {
        reportArr.push(payload[0][i]);
      }
    }
  return [reportArr, payload];

})
.then(reportArr => {
  let reportIdArr = [];
  reportArr[0].forEach(function(report){
    reportIdArr.push(report.id);
  });
  queries.reportsNear(reportIdArr)
  .then(result => {
    weather.getWeather(result[0].lat, result[0].lon)
    .then(weather => {
      renderObject.weather = weather.data;
      renderObject.station = reportArr[1][1][0];
      renderObject.reports = result;
      console.log(renderObject);
      res.render('single-station', renderObject);
    });
  });
});
});


module.exports = router;
