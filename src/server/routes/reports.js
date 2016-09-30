const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const request = require('request');
const axios = require('axios');
const knex = require('../db/knex.js');


router.get('/report-new', function (req, res, next) {
  const { renderObject } = req;
  res.render('report-new', renderObject);
});

router.post('/report-new', function (req, res, next) {
  console.log('server side hit');
  knex('reports').insert({
    user_id: 1,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    report: req.body.report_text,
    lat: req.body.report_lat,
    lon: req.body.report_lon
  })
  .then((results) => {
    console.log('results ', results);
    res.redirect('/homepage');
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
