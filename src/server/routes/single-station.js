const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const weather = require('./weather.js');

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const { renderObject } = req;
  var latitude;
  var longitude;

  Promise.all([queries.reportUserQuery(id), queries.singleStation(id)])
  .then(payload => {
  weather.getWeather(payload[1][0].lat, payload[1][0].lon)
  .then(weatherPayload => {
      renderObject.reports = payload[0];
      renderObject.station = payload[1][0];
      renderObject.weather = weatherPayload.data;
      res.render('single-station', renderObject);
  });
  }, reason => {
    console.log('error ', reason);
  });
});

module.exports = router;
