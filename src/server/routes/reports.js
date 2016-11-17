const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const request = require('request');
const axios = require('axios');
const knex = require('../db/knex.js');

router.get('/report-new', (req, res, next) => {
  res.render('report-new');
  console.log(req.session);
});

router.post('/report-new', (req, res, next) => {
  var user_id = req.session.id;
  knex('reports').insert({
    user_id: req.session.user.id,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    report: req.body.report_text,
    lat: req.body.report_lat,
    lon: req.body.report_lon
  })
  .then(() => res.redirect('/homepage'))
  .catch(err => console.log(err));
});

router.get('/report-edit/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const { renderObject } = req;
  queries.singleItem('reports', id)
  .then((report) => {
    renderObject.report = report[0];
    res.render('report-edit', renderObject);
  })
  .catch(err => console.log(err));
});

router.put('/report-edit/:id', (req, res, next) => {
  const id = req.params.id;
  const updatedReport = req.body;
  queries.updateReport(id, updatedReport)
  .then((result) => {
    res.redirect(303, '/homepage');
  })
});

module.exports = router;
