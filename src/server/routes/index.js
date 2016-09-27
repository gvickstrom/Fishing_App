const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const request = require('request');

// router.get('/', function (req, res, next) {
//   queries.getRivers(function(err, results) {
//     var renderObject = {};
//     if (err) {
//       renderObject.message = err.message || 'Something terrible happened.';
//       res.render('error', renderObject);
//     } else {
//       renderObject.rivers = results;
//       res.render('index', renderObject);
//     }
const axios = require('axios');
const knex = require('../db/knex.js');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  res.redirect('landing');
});

router.get('/landing', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Anglers';
  res.render('landing', renderObject);
});

router.get('/sign-up', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Anglers: Sign Up'
  res.render('sign-up', renderObject);
});

router.get('/single-station/:id', function (req, res, next) {
  const id = req.params.id;
  const renderObject = {};
  var latitude;
  var longitude;

  Promise.all([reportUserQuery(), singleStation()])
  .then(payload => {
  // console.log('reportUserQuery ', payload[0]);
  // console.log('station ', payload[1]);
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
