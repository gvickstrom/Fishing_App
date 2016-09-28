const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');

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

module.exports = router;
