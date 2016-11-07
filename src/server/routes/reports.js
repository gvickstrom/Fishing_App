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
  knex('reports').insert({
    user_id: req.body.id,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    report: req.body.report_text,
    lat: req.body.report_lat,
    lon: req.body.report_lon
  })
  .then((results) => {
    res.redirect('/homepage');
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/report-edit/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  const { renderObject } = req;
  queries.singleItem('reports', id)
  .then((report) => {
    renderObject.report = report[0];
    res.render('report-edit', renderObject);
  })
});

router.put('/report-edit/:id', function (req, res, next) {
  const id = req.params.id;
  console.log('put report-edit hit');
  const updatedReport = req.body;
  console.log(req.body);
  queries.updateReport(id, updatedReport)
  .then((result) => {
    console.log('results from knex: ', result);
  })
});

module.exports = router;
