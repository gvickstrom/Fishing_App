const express = require('express');
const router = express.Router();
const axios = require('axios');
const knex = require('../db/knex.js');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  indexController.sum(1, 2, (error, results) => {
    if (error) return next(error);
    if (results) {
      renderObject.sum = results;
      res.render('index', renderObject);
    }
  });
});

router.get('/landing', function (req, res, next) {
  const renderObject = {};
  renderObject.hello = 'Hello World!'
  res.render('landing', renderObject);
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
