const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
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

router.get('/usgs', function (req, res, next) {
  const renderObject = {};
  axios.get('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=07079300,07081200,07083710,07087050,07091200,07094500,07099970,07099973,07109500,07124000,07130500,07133000,07134180&parameterCd=00064,00065,00010')
  .then(function (usgsPayload) {
    var basePayload = usgsPayload.data.value.timeSeries[0].sourceInfo;
      for (var stationData in basePayload) {
      console.log(basePayload[stationData].geogLocation);
    }
//push into new array, use .reduce to purge the undefined items

// .geoLocation.geogLocation.latitude
    // var riverData = {
    //   waterTemp:
    //   flowRate:
    //   depth:
    //   latitude: usgsPayload.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude,
    //   longitude:
    //   timeStamp:
    // }

    // renderObject.usgsPayload = usgsPayload.data;
  });
});

module.exports = router;
