const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');

router.get('/', function (req, res, next) {
  const renderObject = {};
  axios.get('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=07079300,07081200,07083710,07087050,07091200,07094500,07099970,07099973,07109500,07124000,07130500,07133000,07134180&parameterCd=00064,00065,00010')
  .then(function (usgsPayload) {
    // renderObject.usgsPayload = usgsPayload.data;
    console.log(usgsPayload);
  });
});
