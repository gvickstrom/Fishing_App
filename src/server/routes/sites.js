const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const knex = require('../db/knex.js');
const request = require('request');

router.get('/clear', (req, res, next) => {
  queries.clearStationsTable((results) => {
    console.log(results);
  });
  res.redirect('/homepage');
});

router.get('/', function(req,res,next) {
  var riverName = req.query.river;
  queries.getRiverSites(riverName, function(err, results) {
    var returnObject = {};
    if (err) {
      returnObject.message = err.message || 'Could not find sites';
      res.status(400).render('error', returnObject);
    } else {
      returnObject.sites = results;
      res.send(returnObject);
    }
  });
});

router.get('/Arkansas', function (req, res, next) {
  const { renderObject } = req;
  request('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=07079300,07081200,07083710,07087050,07091200,07094500,07099970,07099973,07109500,07124000,07130500,07133000,07134180&parameterCd=00060', (err, res, body) => {
    if(!err && res.statusCode === 200) {
      const usgsPayload = JSON.parse(body);
      const parsedUSGS = usgsPayload.value.timeSeries;

      for (var i = 0; i < parsedUSGS.length; i++) {
        var stationData = {
          river: 'Arkansas',
          site_name: parsedUSGS[i].sourceInfo.siteName,
          flow_rate: parsedUSGS[i].values[0].value[0].value,
          lat: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.latitude,
          lon: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.longitude,
          reading_date_time: parsedUSGS[i].values[0].value[0].dateTime
        };
        queries.updateRiverData(stationData, function (req, res, next) {
          if (err) {
            var returnObject = {};
            returnObject.message = err.message || 'Data not added';
            res.render('error', returnObject);
          } else {
            let returnObject = {};
            returnObject.message = 'Data succesfully added!';
          }
        });
      }
    }
  });
  res.redirect('/homepage');

});

router.get('/Upper%20South%20Platte', function (req, res, next) {
  const { renderObject } = req;
  request('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=06700000,06701620,06701700,06701900,06708600,06708690,06708800,06709000,06709530,06709740,06709910,06710150,06710247,06710385,06710605,06711515,06711555,06711565,06711570,06711575,06711618,06711770,06711780&parameterCd=00060', (err, res, body) => {
    if(!err && res.statusCode === 200) {
      const usgsPayload = JSON.parse(body);
      const parsedUSGS = usgsPayload.value.timeSeries;

      for (var i = 0; i < parsedUSGS.length; i++) {
        var stationData = {
          river: 'Upper South Platte',
          site_name: parsedUSGS[i].sourceInfo.siteName,
          flow_rate: parsedUSGS[i].values[0].value[0].value,
          lat: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.latitude,
          lon: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.longitude,
          reading_date_time: parsedUSGS[i].values[0].value[0].dateTime
        };
        queries.updateRiverData(stationData, function (req, res, next) {
          if (err) {
            var returnObject = {};
            returnObject.message = err.message || 'Data not added';
            res.render('error', returnObject);
          } else {
            let returnObject = {};
            returnObject.message = 'Data succesfully added!';
          }
        });
      }
    }
  });
  res.redirect('/homepage');

});

router.get('/Blue', function (req, res, next) {
  const { renderObject } = req;
  request('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=09041900,09044300,09044800,09046490,09046600,09047500,09047700,09050100,09050700,09051050,09056500,09057500&parameterCd=00060', (err, res, body) => {
    if(!err && res.statusCode === 200) {
      const usgsPayload = JSON.parse(body);
      const parsedUSGS = usgsPayload.value.timeSeries;

      for (var i = 0; i < parsedUSGS.length; i++) {
        var stationData = {
          river: 'Blue',
          site_name: parsedUSGS[i].sourceInfo.siteName,
          flow_rate: parsedUSGS[i].values[0].value[0].value,
          lat: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.latitude,
          lon: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.longitude,
          reading_date_time: parsedUSGS[i].values[0].value[0].dateTime
        };
        queries.updateRiverData(stationData, function (req, res, next) {
          if (err) {
            var returnObject = {};
            returnObject.message = err.message || 'Data not added';
            res.render('error', returnObject);
          } else {
            let returnObject = {};
            returnObject.message = 'Data succesfully added!';
          }
        });
      }
    }
  });
  res.redirect('/homepage');

});

router.get('/Roaring%20Fork', function (req, res, next) {
  const { renderObject } = req;
  request('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=09072550,09073005,09073300,09073400,09074000,09074500,09075400,09078141,09078475,09079450,09080400,09081000,09081600,09085000&parameterCd=00060', (err, res, body) => {
    if(!err && res.statusCode === 200) {
      const usgsPayload = JSON.parse(body);
      const parsedUSGS = usgsPayload.value.timeSeries;

      for (var i = 0; i < parsedUSGS.length; i++) {
        var stationData = {
          river: 'Roaring Fork',
          site_name: parsedUSGS[i].sourceInfo.siteName,
          flow_rate: parsedUSGS[i].values[0].value[0].value,
          lat: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.latitude,
          lon: parsedUSGS[i].sourceInfo.geoLocation.geogLocation.longitude,
          reading_date_time: parsedUSGS[i].values[0].value[0].dateTime
        };
        queries.updateRiverData(stationData, function (req, res, next) {
          if (err) {
            var returnObject = {};
            returnObject.message = err.message || 'Data not added';
            res.render('error', returnObject);
          } else {
            let returnObject = {};
            returnObject.message = 'Data succesfully added!';
          }
        });
      }
    }
  });
  res.redirect('/homepage');

});


module.exports = router;
