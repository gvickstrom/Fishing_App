const express = require('express');
const router = express.Router();
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

router.get('/single-river', function (req, res, next) {

  const renderObject = {};

  axios.get('https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/39.2541,-105.2276')
  .then(function (weatherPayload) {
    renderObject.weatherPayload = weatherPayload.data;
    knex('reports')
    .where('station_id', 1)
    .select()
    .then((reports) => {
      renderObject.reports = reports;
      console.log(renderObject.reports);
      res.render('single-river', renderObject);
    })
  })
  .catch(function (error) {
    console.log(error);
  });

});

module.exports = router;
