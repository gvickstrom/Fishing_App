const express = require('express');
const router = express.Router();
const axios = require('axios');

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

router.get('/weather', function (req, res, next) {
  const renderObject = {};

  axios.get('https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/37.8267,-122.4233')
  .then(function (weatherPayload) {
    renderObject.weatherPayload = weatherPayload.data;
    res.render('weather', renderObject);
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
